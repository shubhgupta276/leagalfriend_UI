import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { InstitutionService } from '../../../feature-shell/master/institution/institution.service';
import { Institution } from '../../../feature-shell/master/institution/institution';
import { StorageService } from '../../../shared/services/storage.service';
import { forEach } from '@angular/router/src/utils/collection';

declare let $;
declare let canvas;
@Component({
    selector: 'app-invoiceform',
    templateUrl: './invoiceform.html',
})
export class InvoiceFormComponent implements OnInit {
    arr: Institution[] = [];
    arrInvoice = [];
    arrInvoiceDetails = {};
    invoiceNo: string = '333333';
    template: string = `<div class="invoice-inner" id="pdfdownloaddiv">
  <table border="0" cellpadding="0" cellspacing="0" class="is_logo" width="100%">
      <tbody>
          <tr>
              <td align="center" valign="top">
                  <div>
                      <div id="logoDiv">
                          <img height="102" id="logo" src="/assets/dist/img/logo.png"
                              width="122" style="width: 122px; height: 102px;" data-original-title="" title="">
                      </div>
                  </div>
              </td>
          </tr>
      </tbody>
  </table>

  <div class="invoice-address">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
              <tr>
                  <td align="left" valign="top" width="50%">
                      <table border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                              <tr>
                                  <td valign="top">
                                      <strong>
                                          <label>Bill To</label>
                                      </strong>
                                  </td>
                                  <td align="left" valign="top">
                                      <div>
                                          <table border="0" cellpadding="0" cellspacing="0">
                                              <tbody>
                                                  <tr>
                                                      <td align="left" style="padding-left:25px;">
                                                          <div class="reset_editor invoice-input mce-content-body"
                                                              id="client_info_editor" 
                                                              style="width: 200px; min-height: 80px; position: relative;">
                                                              <p>Global Logic
                                                                  <br> Tower A, Oxygen Park, Plot No.7, Sector-144
                                                                  <br> Noida, 201304</p>
                                                          </div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
                  <td align="right" valign="top" width="50%">
                      <table align="right" border="0" cellpadding="0" cellspacing="0" width="260">
                          <tbody>
                              <tr>
                                  <td align="right">
                                      <table border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                              <tr>
                                                  <td align="right">
                                                      <div class="reset_editor invoice-input mce-content-body"
                                                          id="business_info_editor" style="width: 255px; min-height: 80px; position: relative;">                                                                          
                                                          <p style="font-size: 14pt;" data-mce-style="font-size: 14pt;">Global Logic</p>
                                                          <p>Global Logic
                                                              <br> Noida, 110096
                                                              <br> 408-273-8900
                                                              <br> sales@globallogic.com</p>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>

                      <div style="clear:both">&nbsp;</div>
                      &nbsp;&nbsp;

                      <table border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                              <tr>
                                  <td align="right">
                                      <strong>
                                          <label style="text-align: right; font-weight: bold;">Invoice NO</label>
                                      </strong>
                                  </td>
                                  <td align="left" style="padding-left:20px">
                                      <input type="text" id="no" value="2001321" class="invoice-input" style="text-align: right;">
                                  </td>
                              </tr>
                              <tr>
                                  <td align="right">
                                      <strong>
                                          <label style="text-align: right; font-weight: bold;">Date</label>
                                      </strong>
                                  </td>
                                  <td align="left" style="padding-left:20px">
                                      <input type="text" id="date" value="3/28/2018" class="invoice-input"
                                          style="text-align: right;">
                                  </td>
                              </tr>
                             
                              <!-- /Field10-->
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>

  <div>
      <table id="tblInvoice" class="table table-condensed table-bordered table-striped items-table">
          <thead>
              <tr>
                  <th>
                     Description
                  </th>
                  <th class="mount-header">
                      Quantity
                  </th>
                  <th class="mount-header">
                      Unit price
                  </th>
                 
                  <th class="subtotal-header">
                      Amount
                  </th>
                  <th width="20">&nbsp;</th>
              </tr>
          </thead>
         
          <tbody id="itemsInvoice">
              <tr description="Product name" qty="1" unit_price="0" discount="0" subtotal="0" total="0" class="invoiceRow">
                  <td>
                      <textarea  OnlyString="true" class="form-control productName" type="text" placeholder="Product Name"></textarea>
                  </td>
                  <td>
                      <input  class="form-control quantity" onchange="Window.InvoiceFormComponent.CalculateFinalAmount()" style="width:100px" placeholder="Quantity">
                  </td>
                  <td>
                      <input class="form-control unitPrice" onchange="Window.InvoiceFormComponent.CalculateFinalAmount()" style="width:100px" placeholder="Unit Price">
                  </td>
                 
                  <td>$ <label class="amount">0</label></td>
                  <td>
                      <a onclick="Window.InvoiceFormComponent.RemoveInvoice(this)" class="btn btn-danger btn-sm remove-item">
                          <i class="fa fa-fw fa-trash"></i>
                      </a>
                  </td>
              </tr>
          </tbody>
          <tfoot id="TotalsSection">
             
              <tr class="totals-row" id="TotalRow">
                  <td class="wide-cell" colspan="2">
                      <button type="button" (click)="AddMoreInvoice()" id="AddProduct" class="btn btn-small btn-primary">
                          <i class="fa fa-plus"></i> Add Line</button>
                  </td>
                  <td>
                      <strong>
                          <!-- <input type="text" id="label_total" value="Total" class="invoice-input" style="font-weight: bold;"> -->
                          <label style="font-weight:bold">Total</label>
                      </strong>
                  </td>
                  <td colspan="2">
                     $ <label id="totalAmount">0</label>
                  </td>
              </tr>
              <tr class="totals-row shaped" id="PaidRow" style="display:none">
                  <td class="wide-cell" colspan="2">
                      <a href="#" class="show-row" id="toggle_paid"></a>
                  </td>
                  <td>
                      <strong>
                          <input type="text" id="label_paid" value="Paid Amount" class="invoice-input" style="font-weight: bold;">
                      </strong>
                  </td>
                  <td colspan="2">
                      <input type="text" id="paid" value="" class="invoice-input">
                  </td>
              </tr>
              <tr class="totals-row shaped" id="UnpaidRow" style="display:none">
                  <td class="wide-cell" colspan="2"></td>
                  <td>
                      <strong>
                          <input type="text" id="label_unpaid" value="Balance Due" class="invoice-input" style="font-weight: bold;">
                      </strong>
                  </td>
                  <td colspan="2">
                      <span id="unpaid">Rs.&nbsp;0</span>
                  </td>
              </tr>
          </tfoot>
      </table>
  </div>

  <div class="notes-block">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
              <tr>
                  <td>
                      <textarea id="remarksInvoice" rows="2" class="form-control" placeholder="Type your notes here"></textarea>
                      
                  </td>
              </tr>
              <tr>
                  <td>
                      <button class="btn btn bg-navy margin pull-right" (click)="SaveInvoice()" style="margin-right:0px" type="submit" >Submit</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  <br>
  <br>
  <br>
  <br> &nbsp;
</div>`;
    constructor(private _institutionService: InstitutionService, private _storageService: StorageService) {
        Window["InvoiceFormComponent"] = this;
    }

    ngOnInit() {
        this.GetAllInstitute();
        this.GetBillFrom();
        this.BindInvoice();
        // this.arrInvoiceDetails = JSON.parse(localStorage.getItem("invoiceDetails"));
    }
    BindInvoice() {
        var invoiceDetails = JSON.parse(localStorage.getItem("invoiceDetails"));
        var totalAmount = 0;
        var totalDescription = "";
        invoiceDetails.forEach(element => {
            totalAmount = totalAmount + parseFloat(element.amount);
            totalDescription = totalDescription + (element.caseId + "   " + element.recourse + "   " + element.stage);
        });
        this.arrInvoiceDetails = {
            totalAmount: totalAmount,
            totalDescription: totalDescription,
            totalQuantity: invoiceDetails.length,
            invoiceNo: Math.floor(Math.random() * 90000) + 10000
        };
        debugger
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
    GetBillFrom() {

        this._institutionService.getBilFrom().subscribe(
            result => {

                if (result.httpCode == 200) {
                    $("#companyNameBillFrom").val(result.branches[0].branchName + ", " + result.branches[0].branchAddress + ", " + result.branches[0].branchContact, );


                }
                else {
                    console.log(result);
                }
            },
            err => {
                console.log(err);
                this.arr = [];

            });
    }
    GetAllInstitute() {

        this._institutionService.getInstitutions().subscribe(
            result => {

                if (result.httpCode == 200) {
                    $("#companyName").val(result.institutions[2].institutionName);
                    //   for (var i = 0; i < result.institutions.length; i++) {
                    //     const obj = result.institutions[i];

                    //     // this.arr.push({
                    //     //   institutionName: obj.institutionName,
                    //     //   id: obj.id
                    //     // });
                    //   }
                    //   setTimeout(() => {
                    //     //this.bindDatatable();
                    //   }, 1);

                }
                else {
                    console.log(result);
                }
            },
            err => {
                console.log(err);
                this.arr = [];

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
            debugger
            //var quantity = $row.find('.quantity').val();
            var amount = parseFloat($row.find('.amount').val());
            // if (quantity > 0) {
            //     amount = amount;
            // }
            //$row.find('.amount').html(amount);
            if (amount > 0)
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