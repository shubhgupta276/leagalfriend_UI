import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operator/filter';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HtmlParser } from '@angular/compiler';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { InvoicesService } from './invoices.service';
import { invoiceTableConfig } from './invoices.config';
import { ActionColumnModel } from '../../shared/models/data-table/action-column.model';
import { SharedService } from '../../shared/services/shared.service';
import { debuglog } from 'util';
import { StorageService } from '../../shared/services/storage.service';


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
  constructor(private fb: FormBuilder, private invoiceService: InvoicesService, private _storageService: StorageService,
    private router: Router, private _sharedService: SharedService) {
    this.createForm(null);
    Window['InvoiceFormComponent'] = this;
  }
  ngOnInit() {
    Window['InvoiceComponent'] = this;
    this.isPageLoad = true;
    this.clickInstitutional();
    this.setActionConfig();
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
    this.actionColumnConfig.actionList.push({
      eventType: 'payment',
      title: 'Payment Received',
      isImage: false,
      icon: '<i class="fa fa-credit-card"></i>'
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
      } else if (event.eventType === 'edit') {

        this.invoiceService.getInvoiceDetail(data.id, this.isInstitutionalTab).subscribe(
          (result) => {
            if (result) {
              this._storageService.clearInvoiceData();
              const invoice = result.invoice;
              const billingArray = result.institutionalBillings;
              const invoicedetails = [{
                isEditMode: event.eventType === 'edit',
                isViewMode: event.eventType === 'view',
                invoice: invoice,
                billingArray: billingArray

              }];
              localStorage.setItem('invoiceDetails', JSON.stringify(invoicedetails));
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
  }

  paymentReceived() {
    const date = new Date(this.paymentReceiveDate);
    // this.invoiceService.updatePaymentStatus(this.invoiceId).subscribe(
    //   (result) => {
    //     result = result.body;
    //     if (result.httpCode === 200) {
    //       if (this.isInstitutionalTab) {
    //         this.clickInstitutional();
    //       } else {
    //         this.clickIndividual();
    //       }
    // $('#paymentReceivedPopup').modal('hide');
    //       $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
    //     } else {
    //       $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   });
  }

  searchFilter(value) {
    this.dataTableComponent.applyFilter(value);
  }

  clearFilters() {
    this.searchTextbox = '';
    this.dataTableComponent.resetFilters();
  }

  generatepdf() {
    var hiddenDiv = document.getElementById('pdfdownload')
    hiddenDiv.style.display = 'block';
    var pdf;
    pdf = new jsPDF();
    pdf.addHTML(document.getElementById('pdfdownload'), function () {

      pdf.save('stacking-plan.pdf');
      hiddenDiv.style.display = 'none';
    });

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
      this.invoiceService.caneclInvoice(invoiceId).subscribe(
        result => {
          $.toaster({ priority: 'success', title: 'Success', message: 'Invoice has been cancelled successfully' });
          this.bindInvoiceAfterCancelled(invoiceId);
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
    this.invoiceService.getInvoiceData(this.isInstitutionalTab).subscribe(
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

