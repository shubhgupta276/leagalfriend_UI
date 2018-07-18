import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';
import { filter } from "rxjs/operator/filter";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HtmlParser } from "@angular/compiler";
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { InvoicesService } from "./invoices.service";
import { invoiceTableConfig } from "./invoices.config";
import { ActionColumnModel } from "../../shared/models/data-table/action-column.model";
import { SharedService } from "../../shared/services/shared.service";


declare var $;
declare let canvas;
@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./invoice.component.css'],

})
export class InvoiceComponent implements OnInit {
  rowSelect = false;
  hoverTableRow = true;
  tableInputData = [];
  editCaseForm1: FormGroup;
  invoice: any[] = [];
  arListBanks: any[] = [{ BankName: "HDFC BANK LTD." }];
  columns = invoiceTableConfig;
  actionColumnConfig: ActionColumnModel;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  constructor(private fb: FormBuilder, private invoiceService: InvoicesService, private router: Router,private _sharedService:SharedService) {
    this.createForm(null);
    Window["InvoiceFormComponent"] = this;
  }
  ngOnInit() {
    this.setActionConfig();
    this.getInvoice();

  }

  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showCancel = true;
    this.actionColumnConfig.moduleName = 'Invoice';
  }
  onActionBtnClick(event) {
    if (event.eventType == 'cancel') {
      this.cancelInvoice(event.data.id);
    }
    else if (event.eventType == 'history') {
      var data = event.data;
      var invoicedetails = [{
        amount: data.amount,
        billingDate: data.billingDate,
        caseId: data.billingIds[0].caseId,
        description: data.description,
        id: data.id,
        institutionId: data.billingIds[0].institution.id,
        institutionName: data.billingIds[0].institution.institutionName,
        isInvoiceFirstLoad: true,
        recourseId: data.billingIds[0].recourse.id,
        recourseName: data.billingIds[0].recourse.recourseName,
        stageId: data.billingIds[0].stage.id,
        stageName: data.billingIds[0].stage.stageName,
        userId: 0,
        isFromInvoice: true
      }];
      localStorage.setItem('invoiceDetails', JSON.stringify(invoicedetails));
      this.router.navigateByUrl('/admin/invoices/invoiceform');
    }
  }
  anyForm: any;
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
      CaseID: [c == null ? null : c.CaseID],


    });
  }



  showModal(invoice) {
    this.createForm(invoice);
    $("#filterCaseModal").modal("show");
  }
  cancelInvoice(invoiceId) {
    this.invoiceService.caneclInvoice(invoiceId).subscribe(
      result => {
        $.toaster({ priority: 'success', title: 'Success', message: 'Invoice has been cancelled successfully' });
        this.bindInvoiceAfterCancelled(invoiceId);
      },
      err => {
        console.log(err);
      });
  }
  bindInvoiceAfterCancelled(invoiceId) {
    this.tableInputData.filter((item: any, index: number) => {
      if (item.id == invoiceId) {
        this.tableInputData.splice(index, 1);
        this.dataTableComponent.ngOnInit();

      }
    })
  }
  getInvoice() {
    this.invoiceService.getInvoiceData().subscribe(
      result => {
        result.forEach(item => {
          this.tableInputData.push({
            id: item.id,
            institutionName: item.billingIds[0].institution.institutionName,
            description: item.description,
            billingDate: this._sharedService.convertDateToStr(item.billingIds[0].billingDate),
            amount: item.amount,
            status: item.status,
            billingIds: item.billingIds
          });
        });
        setTimeout(() => {
          this.dataTableComponent.ngOnInit();
        });

      },
      err => {
        console.log(err);
      });

  }


}

