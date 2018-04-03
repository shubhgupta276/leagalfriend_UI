import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

declare let $;
declare let canvas;
@Component({
  selector: 'app-invoiceform',
  templateUrl: './invoiceform.html',
})
export class InvoiceFormComponent implements OnInit {
  arrInvoice = [];
  invoiceNo: string = '333333';
  constructor() {
    Window["InvoiceFormComponent"] = this;
  }

  ngOnInit() {
  }
  anyForm: any;
  generatepdf() {
    var pdf;
    pdf = new jsPDF();
    pdf.addHTML(document.getElementById('pdfdownload'), function () {
      pdf.save('stacking-plan.pdf');
    });
  }
  AddMoreInvoice() {
    var $row = $('.invoiceRow:eq(0)')[0].outerHTML;
    $('#itemsInvoice').append($row);
    var lastRow = $('.invoiceRow:last');
    $(lastRow).find('.amount').html('0');
  }

  RemoveInvoice(row) {
    if ($('.invoiceRow').length > 1)
      $(row).closest('tr').remove();
    this.CalculateFinalAmount();
  }

  CalculateFinalAmount() {
    var totalAmount = 0;
    $('.invoiceRow').each(function () {
      var $row = $(this);
      var amount = 0;
      var quantity = $row.find('.quantity').val();
      var unitPrice = $row.find('.unitPrice').val();
      if (quantity > 0 && unitPrice > 0) {
        amount = quantity * unitPrice;
      }
      $row.find('.amount').html(amount);
      totalAmount = totalAmount + amount;
    })
    $('#totalAmount').html(totalAmount);
  }
  SaveInvoice() {
    var self = this;
    var totalAmount = 0;
    $('.invoiceRow').each(function () {
      var $row = $(this);
      var amount = 0;
      var productName = $row.find('.productName').val();
      var quantity = $row.find('.quantity').val();
      var unitPrice = $row.find('.unitPrice').val();
      if (quantity > 0 && unitPrice > 0) {
        amount = quantity * unitPrice;
      }
      var remarks = $('#remarksInvoice').val();
      self.arrInvoice.push({ InvoiceNo: self.invoiceNo, ProductName: productName, quantity: quantity, unitPrice: unitPrice, remarks: remarks })
      debugger
    })
    $.toaster({ priority: 'success', title: 'Success', message: 'Invoice submit successfully' });
  }
}