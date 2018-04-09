import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { InstitutionService } from '../../../feature-shell/master/institution/institution.service';
import { Institution } from '../../../feature-shell/master/institution/institution';
import { StorageService } from '../../../shared/services/storage.service';
import { forEach } from '@angular/router/src/utils/collection';
import * as swiper from 'swiper';

declare let $;
declare let canvas;
declare let Swiper;
@Component({
    selector: 'app-invoicenextform',
    templateUrl: './invoicenextform.html',

})
export class InvoiceNextFormComponent implements OnInit {





    arr: Institution[] = [];
    arrInvoice = [];
    arrInvoiceDetails = [];
    invoiceNo: any = Math.floor(Math.random() * 90000) + 10000;
    totalAmount: number;
    constructor(private _institutionService: InstitutionService, private _storageService: StorageService) {
        Window["InvoiceFormComponent"] = this;
    }

    ngOnInit() {
        this.GetAllInstitute();
        this.GetBillFrom();
        this.BindInvoice();
    }

    

    BindInvoice() {
        var invoiceDetails = JSON.parse(localStorage.getItem("invoiceDetails"));
        this.totalAmount = 0;
        var totalDescription = "";
        invoiceDetails.forEach(element => {
            totalDescription = "";
            totalDescription = totalDescription + (element.caseId + "   " + element.recourse + "   " + element.stage);
            this.arrInvoiceDetails.push({ description: totalDescription, amount: element.amount, quantity: 1 })
           this.totalAmount+= parseFloat(element.amount);
        });
        setTimeout(() => {
            $('#tblInvoice').DataTable({
                responsive: true,
                pagingType: 'simple',
                searching: false,
                "bLengthChange": false,
                "bInfo": false,
                "pageLength": 10,
                "bSort": false
            });
            $("#NewPaginationContainer").append($(".dataTables_paginate"));
        }, 10);
       
       
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