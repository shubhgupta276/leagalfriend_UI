import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { InstitutionService } from '../../../feature-shell/master/institution/institution.service';
import { Institution } from '../../../feature-shell/master/institution/institution';
import { StorageService } from '../../../shared/services/storage.service';
import { forEach } from '@angular/router/src/utils/collection';
import { NgxPaginationModule } from 'ngx-pagination';
import { Routes, RouterModule, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { InvoicesService } from '../invoices.service';
declare let $;
declare let canvas;
declare let Swiper;
@Component({
    selector: 'app-invoicenextform',
    templateUrl: './invoicenextform.html',

})
export class InvoiceNextFormComponent implements OnInit {

    arr: Institution[] = [];
    arrSaveInvoice = [];
    arrLocalInvoiceDetails = [];
    arrInvoiceDetails = [];
    totalAmount: number;
    todayDate: number = Date.now();
    p: number = 1;
    p2: number = 1;
    @Input() id: string;
    @Input() maxSize: number;
    @Output() pageChange: EventEmitter<number>;
    JSON: any;
    invoiceTemplateInfo: any;
    constructor(private _institutionService: InstitutionService, private _storageService: StorageService,
        private router: Router, public sanitizer: DomSanitizer, private invoiceService: InvoicesService) {
        Window['InvoiceFormComponent'] = this;
        this.JSON = JSON;
    }

    ngOnInit() {
        this.BindInvoice();
        this.StoreInvoiceTemplateInfo();

    }

    StoreInvoiceTemplateInfo() {
        this.invoiceTemplateInfo = JSON.parse(localStorage.getItem('invoiceTemplateInfo'));
        this.invoiceTemplateInfo.isLoadFirstTime = false;
        this.invoiceTemplateInfo.photoUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,'
            + this.invoiceTemplateInfo.url);
        localStorage.setItem('invoiceTemplateInfo', JSON.stringify(this.invoiceTemplateInfo));
    }

    PreviousCheck() {
        if (this.p2 == 0) {
            this.router.navigate(['/admin/invoices/invoiceform']);
        } else {
            this.CalculateFinalAmount(null);
        }
    }

    getInvoiceStorageDetail() {
        return JSON.parse(localStorage.getItem('invoiceDetails'));
    }

    setInvoiceStorageDetail() {
        localStorage.setItem('invoiceDetails', JSON.stringify(this.arrLocalInvoiceDetails));
    }

    BindInvoice() {
        this.arrLocalInvoiceDetails = this.getInvoiceStorageDetail();
        this.arrInvoiceDetails = [];
        let totalDescription = '';
        this.arrLocalInvoiceDetails.forEach((element, index) => {
            element.isInvoiceFirstLoad = false;
            totalDescription = '';
            totalDescription = totalDescription + ('CaseId : ' + element.caseId
                + ',  Recourse : ' + element.recourseName + ', Stage : ' + element.stageName);
            this.arrInvoiceDetails.push(
                {
                    id: element.id,
                    description: totalDescription,
                    amount: element.amount,
                    quantity: 1,
                    billingDate: element.billingDate,
                    institutionId: element.institutionId
                });
        });
        this.sumTotal();
        this.setInvoiceStorageDetail();
    }

    sumTotal() {
        const $this = this;
        this.totalAmount = 0;
        this.arrLocalInvoiceDetails.forEach(function (data) {
            $this.totalAmount += parseFloat(data.amount);
        });
    }

    RemoveInvoice(data) {
        if (confirm('Are you sure you want to delete?')) {
            const ar = this.arrInvoiceDetails;
            if (this.arrInvoiceDetails.length > 0) {
                const deleteIndex = this.arrInvoiceDetails.findIndex(x => x.id === data.id);
                this.arrInvoiceDetails.splice(deleteIndex, 1);
                this.arrLocalInvoiceDetails.splice(deleteIndex, 1);
            }
            this.CalculateFinalAmount(null);
        }
    }

    CalculateFinalAmount(currentRow) {
        if (currentRow != null) {
            currentRow = $(currentRow).closest('tr');
            this.arrLocalInvoiceDetails.filter(
                invoiceDetails => {
                    if (invoiceDetails.id == $(currentRow).find('.hfBillingId').val()) {
                        invoiceDetails.amount = $(currentRow).find('.amount').val();
                        invoiceDetails.description = $(currentRow).find('.description').val();
                    }
                });
        }
        this.sumTotal();
        this.setInvoiceStorageDetail();
    }
}
