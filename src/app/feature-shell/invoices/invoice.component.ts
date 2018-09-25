import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as jsPDF from 'jspdf';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { InvoicesService } from './invoices.service';
import { invoiceTableConfig } from './invoices.config';
import { ActionColumnModel } from '../../shared/models/data-table/action-column.model';
import { SharedService } from '../../shared/services/shared.service';
import { StorageService } from '../../shared/services/storage.service';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';
import { Subscription } from '../../../../node_modules/rxjs';


declare var $;
declare let canvas;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./invoice.component.css'],

})
export class InvoiceComponent implements OnInit {
  showSearchFilter = false;
  rowSelect = false;
  hoverTableRow = true;
  tableInputData = [];
  editCaseForm1: FormGroup;
  invoice: any[] = [];
  isInstitutionalTab: boolean = true;
  searchTextbox = '';
  columns = invoiceTableConfig;
  actionColumnConfig: ActionColumnModel;
  moduleName = 'Invoice';
  anyForm: any;
  isPageLoad: boolean;
  invoiceId: number;
  paymentReceiveDate: any;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  branchSubscription: Subscription;
  branchData: any;
  constructor(private fb: FormBuilder, private invoiceService: InvoicesService,
    private _storageService: StorageService, public sanitizer: DomSanitizer,
    private router: Router, private _sharedService: SharedService) {
    this.createForm(null);
    Window['InvoiceFormComponent'] = this;
  }
  ngOnInit() {
    Window['InvoiceComponent'] = this;
    this.isPageLoad = true;
    this.clickInstitutional();
    this.setActionConfig();
    this.branchSubscription = this._sharedService.getHeaderBranch().subscribe(data => {
      if (this.branchData) {
        this.getInvoice();
      }
    });
    $('#txtDateFilter').daterangepicker({
      autoUpdateInput: false,
      locale: {
        format: 'DD MMM YYYY'
      }
    }, function (start_date, end_date) {
      $('#txtDateFilter').val(start_date.format('DD MMM YYYY') + ' To ' + end_date.format('DD MMM YYYY'));
    });
  }

  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showCancel = true;
    this.actionColumnConfig.showEdit = true;
    this.actionColumnConfig.moduleName = 'Invoice';
    this.actionColumnConfig.actionList.push(
      {
        eventType: 'payment',
        title: 'Payment Received',
        isImage: false,
        icon: '<i class="fa fa-credit-card" style="font-size: 20px"></i>'
      },
      {
        eventType: 'view',
        title: 'View',
        isImage: false,
        icon: '<i class="fa fa-eye" style="font-size: 20px !important"></i>'
      },
      {
        eventType: 'download',
        title: 'Download',
        isImage: false,
        icon: '<i class="fa fa-download" style="font-size: 20px !important"></i>'
      }
    );
  }

  filterTableData() {
    const fromToDate = $('#txtDateFilter').val().split(' To ');
    if (fromToDate && fromToDate.length > 0) {
      this.dataTableComponent.dateRangeFilter(this._sharedService.convertStrToDate(fromToDate[0]),
        this._sharedService.convertStrToDate(fromToDate[1]), 'invoiceDate');
    } else {
      this.dataTableComponent.resetDateFilter();
    }

    $('#filterCaseModal').modal('hide');

  }

  onActionBtnClick(event) {
    try {
      const data = event.data;
      if (event.eventType === 'cancel') {
        this.cancelInvoice(data.id);
      } else if (event.eventType === 'download') {
        window.open('/admin/invoices/invoicedownload/' + data.id + ';institutional=' + this.isInstitutionalTab, '_blank');
      } else if (event.eventType === 'edit' || event.eventType === 'view') {

        this.invoiceService.getInvoiceDetail(data.id, this.isInstitutionalTab).subscribe(
          (result) => {
            if (result) {
              this._storageService.clearInvoiceData();
              const invoice = result.invoice;
              const billingArray = (this.isInstitutionalTab) ? result.institutionalBillings : result.individualBillings;
              const otherDetails = {
                mode: event.eventType,
                invoice: invoice,
                isInstitutional: this.isInstitutionalTab
              };

              localStorage.setItem('invoiceOtherDetails', JSON.stringify(otherDetails));
              localStorage.setItem('invoiceDetails', JSON.stringify(billingArray));
              this.router.navigateByUrl('/admin/invoices/invoiceform');
            }
          },
          err => console.log(err)
        );
      } else if (event.eventType === 'payment') {
        this.paymentReceiveDate = '';
        this.invoiceId = data.id;
        $('#paymentReceivedPopup').modal('show');
      }

    } catch (err) {
      console.log(err);
    }
  }

  payemntReceiveDateChange(value) {
    this.paymentReceiveDate = value;
    document.getElementById('divPayment').click();
  }

  paymentReceived() {
    if (this.paymentReceiveDate && this.paymentReceiveDate.trim().length > 0) {
      this.invoiceService.updatePaymentStatus(this.invoiceId, this.paymentReceiveDate).subscribe(
        (result) => {
          result = result.body;
          if (result.httpCode === 200) {
            $('#paymentReceivedPopup').modal('hide');
            $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
            if (this.isInstitutionalTab) {
              this.clickInstitutional();
            } else {
              this.clickIndividual();
            }
          } else {
            $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
          }
        },
        err => {
          console.log(err);
        });
    } else {
      alert('Please select date');
    }
  }

  searchFilter(value) {
    this.dataTableComponent.applyFilter(value);
  }

  clearFilters() {
    this.searchTextbox = '';
    this.dataTableComponent.resetFilters();
  }

  createForm(c) {
    this.editCaseForm1 = this.fb.group({
      Bank: [c == null ? null : c.Bank],
      Amount: [c == null ? null : c.Amount],
      CaseID: [c == null ? null : c.CaseID]
    });
  }

  showModal(invoice) {
    this.createForm(invoice);
    $('#filterCaseModal').modal('show');
  }

  cancelInvoice(invoiceId) {
    if (confirm('Are you sure you want to cancel this invoice?')) {
      this.invoiceService.caneclInvoice(invoiceId, this.isInstitutionalTab).subscribe(
        result => {
          result = result.body;
          if (result.httpCode === 200) {
            $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
            this.bindInvoiceAfterCancelled(invoiceId);
          }
        },
        err => {
          console.log(err);
        });
    }
  }

  bindInvoiceAfterCancelled(invoiceId) {
    this.tableInputData.filter((item: any, index: number) => {
      if (item.id == invoiceId) {
        this.tableInputData.splice(index, 1);
        this.getInvoice();
      }
    });
  }

  getInvoice() {
    this.tableInputData = [];
    this.branchData = this._storageService.getBranchData();
    this.invoiceService.getInvoiceData(this.branchData.id, this.isInstitutionalTab).subscribe(
      result => {
        result.forEach(item => {
          this.tableInputData.push({
            id: item.id,
            institutionName: (item.institution) ? item.institution.institutionName : '',
            description: item.description,
            invoiceDate: this._sharedService.convertDateToStr(new Date()),
            amount: item.amount,
            status: item.status,
            // billingIds: item.billingIds
          });
        });
        setTimeout(() => {
          this.dataTableComponent.ngOnInit();
          const pendingData = this.tableInputData.find(x => x.status === 'PENDING');
          if (pendingData) {
            this.dataTableComponent.sortTable('PENDING', 'status');
          }
        }, 500);

      },
      err => {
        this.dataTableComponent.ngOnInit();
        console.log(err);
      });

  }

  clickInstitutional() {
    this.showTableColumns(true);
    this.isInstitutionalTab = true;
    this.getInvoice();
  }

  clickIndividual() {
    this.showTableColumns(false);
    this.isInstitutionalTab = false;
    this.getInvoice();
  }

  showTableColumns(show) {
    this.columns.forEach(function (data) {
      if (data.uniqueId === 'institutionName') {
        data.display = show;
      }
    });
  }

  onRowClick() {

  }

  onRowDoubleClick() {

  }
}
