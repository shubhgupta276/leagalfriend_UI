import { Component, OnInit, Input, ViewChild } from "@angular/core";
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


declare var $;
declare let canvas;
@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",


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
  constructor(private fb: FormBuilder, private invoiceService: InvoicesService) {
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
  }
  onActionBtnClick(event) {
    debugger
    if (event.eventType == 'cancel') {
      this.cancelInvoice(event.data.id);
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
  cancelInvoice(invoiceId)
  {
    this.invoiceService.caneclInvoice(invoiceId).subscribe(
      result => {
        $.toaster({ priority: 'success', title: 'Success', message: 'Invoice has been cancelled successfully' });        
      },
      err => {
        console.log(err);
      });

  }
  getInvoice() {
    this.invoiceService.getInvoiceData().subscribe(
      result => {
        this.tableInputData = result;
        setTimeout(() => {
          this.dataTableComponent.ngOnInit();
        });

      },
      err => {
        console.log(err);
      });

  }


}

