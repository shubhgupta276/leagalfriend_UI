import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { InstitutionService } from '../../../feature-shell/master/institution/institution.service';
import { Institution } from '../../../feature-shell/master/institution/institution';
import { StorageService } from '../../../shared/services/storage.service';
import { forEach } from '@angular/router/src/utils/collection';
import { NgxPaginationModule } from 'ngx-pagination';
import { InvoicesService } from '../invoices.service';
import { DomSanitizer } from '@angular/platform-browser';
declare let $;
declare let canvas;
@Component({
    selector: 'app-invoiceform',
    templateUrl: './invoiceform.html',
})
export class InvoiceFormComponent implements OnInit {
    arrSaveInvoice = [];
    arrInvoiceDetails: any;
    invoiceTemplateInfo = {
        billToAddress: "",
        CompanyAddress: "",
        termEndCond: "",
        Date: null,
        photoUrl: null,
        invoiceNo: '333333',
        isLoadFirstTime:true,
        url:null
    }
    todayDate: number = Date.now();
    constructor(private _institutionService: InstitutionService, private _storageService: StorageService,
        private _invoicesService: InvoicesService, public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.GetAllInstitute();
        this.GetBillFrom();
        this.BindInvoice();
        // this.arrInvoiceDetails = JSON.parse(localStorage.getItem("invoiceDetails"));
    }
    StoreInvoiceTemplateInfo() {
        localStorage.setItem("invoiceTemplateInfo", JSON.stringify(this.invoiceTemplateInfo));
    }
    BindInvoice() {
        var invoiceDetails = JSON.parse(localStorage.getItem("invoiceDetails"));
        var totalAmount = 0;
        var totalDescription = "";
        invoiceDetails.forEach(element => {
            totalAmount = totalAmount + parseFloat(element.amount);
            totalDescription = totalDescription + ("CaseId : " + element.caseId + ",  Recourse : " + element.recourseName + ", Stage : " + element.stageName + "\n");
        });
        this.arrInvoiceDetails = {
            totalAmount: totalAmount,
            totalDescription: totalDescription,
            totalQuantity: invoiceDetails.length,
            invoiceNo: Math.floor(Math.random() * 90000),
            id: invoiceDetails.id,
            institutionId: invoiceDetails.institutionId
        };

    }

    GetBillFrom() {

        this._invoicesService.getInvoiceTemplate().subscribe(
            result => {
                var address = result.invoiceFooter.address;
                this.invoiceTemplateInfo.billToAddress = address.address1 + ' ,' + address.city + ' ,' + address.state + ' ,' + address.zipCode;
                this.invoiceTemplateInfo.photoUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,' + result.invoiceHeader.logo);
                this.invoiceTemplateInfo.termEndCond = result.invoiceFooter.termsCondition;
                this.invoiceTemplateInfo.url = result.invoiceHeader.logo;
            })
    }
    GetAllInstitute() {

        this._institutionService.getInstitutions().subscribe(
            result => {
                if (result.httpCode == 200) {
                    for (var i = 0; i < result.institutions.length; i++) {
                        const obj = result.institutions[i];
                        if (this.arrInvoiceDetails.institutionId == obj.institutionId) {
                            this.invoiceTemplateInfo.CompanyAddress = obj.address;
                        }
                    }
                }
            })
    }

    SaveInvoice() {
        var self = this;
        var totalAmount = 0;
        $('.invoiceRow').each(function () {
            var $row = $(this);
            var amount = 0;
            var description = $row.find('.description').val();
            var quantity = $row.find('.quantity').val();
            var unitPrice = $row.find('.unitPrice').val();
            if (quantity > 0 && unitPrice > 0) {
                amount = quantity * unitPrice;
            }
            var remarks = $('#remarksInvoice').val();
            self.arrSaveInvoice.push({ InvoiceNo: self.invoiceTemplateInfo.invoiceNo, description: description, quantity: quantity, unitPrice: unitPrice, remarks: remarks })

        })
        $.toaster({ priority: 'success', title: 'Success', message: 'Invoice submit successfully' });
    }

}