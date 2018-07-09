import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { filter } from "rxjs/operator/filter";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HtmlParser } from "@angular/compiler";
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { InvoicesService } from "./invoices.service";


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
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  constructor(private fb: FormBuilder, private invoiceService: InvoicesService) {
    this.createForm(null);
    Window["InvoiceFormComponent"] = this;
  }
  arrFilter = [];
  ngOnInit() {
    this.getInvoice();

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
  getInvoice() {
    this.invoiceService.getInvoiceData().subscribe(
      result => {
        debugger
        if (result.length > 0) {
          result.forEach(element => {
            this.tableInputData.push(element);
          });
        }
        this.dataTableComponent.ngOnInit();
      },
      err => {
        console.log(err);
      });
    this.dataTableComponent.ngOnInit();
  }


}

