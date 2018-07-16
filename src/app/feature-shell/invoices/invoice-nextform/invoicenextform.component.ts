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
        Window["InvoiceFormComponent"] = this;
        this.JSON = JSON;
    }

    ngOnInit() {
        this.BindInvoice();
        this.StoreInvoiceTemplateInfo();

    }
    StoreInvoiceTemplateInfo() {
        this.invoiceTemplateInfo = JSON.parse(localStorage.getItem('invoiceTemplateInfo'));
        this.invoiceTemplateInfo.isLoadFirstTime = false;
        this.invoiceTemplateInfo.photoUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,' + this.invoiceTemplateInfo.url);
        localStorage.setItem("invoiceTemplateInfo", JSON.stringify(this.invoiceTemplateInfo));
    }
    PreviousCheck() {
        if (this.p2 == 0) {
            this.router.navigate(['/admin/invoices/invoiceform']);
        }
        else
            this.CalculateFinalAmount(null);
    }
    BindInvoice() {
        this.arrLocalInvoiceDetails = JSON.parse(localStorage.getItem("invoiceDetails"));
        this.totalAmount = 0;
        var totalDescription = "";
        this.arrLocalInvoiceDetails.forEach((element, index) => {
            element.isInvoiceFirstLoad = false;
            totalDescription = "";
            totalDescription = totalDescription + ("CaseId : " + element.caseId + ",  Recourse : " + element.recourseName + ", Stage : " + element.stageName);
            this.arrInvoiceDetails.push(
                {
                    id: element.id, description: totalDescription,
                    amount: element.amount, quantity: 1, billingDate: element.billingDate, institutionId: element.institutionId

                })
            if (index < 5)
                this.totalAmount += parseFloat(element.amount);
        });
        localStorage.setItem('invoiceDetails', JSON.stringify(this.arrLocalInvoiceDetails));
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
        this.CalculateFinalAmount(null);
    }

    CalculateFinalAmount(currentRow) {
        var totalAmount = 0;
        $('.invoiceRow').each(function () {
            var $row = $(this);
            //var quantity = $row.find('.quantity').val();
            var amount = parseFloat($row.find('.amount').val());
            // if (quantity > 0) {
            //     amount = amount;
            // }
            //$row.find('.amount').html(amount);
            if (amount > 0)
                totalAmount = totalAmount + amount;

        })

        if (currentRow != null) {
            currentRow = $(currentRow).closest('tr');

            this.arrLocalInvoiceDetails.filter(
                invoiceDetails => {
                    if (invoiceDetails.id == $(currentRow).find('.hfBillingId').val()) {
                        invoiceDetails.amount = $(currentRow).find('.amount').val();
                        invoiceDetails.description = $(currentRow).find('.description').val();
                    }
                });
            localStorage.setItem("invoiceDetails", JSON.stringify(this.arrLocalInvoiceDetails));
        }
        $('#totalAmount').html(totalAmount);
    }

    SaveInvoice() {
        var self = this;
        var totalAmount = 0;
        var dd = this.arrLocalInvoiceDetails;
        var d = this.invoiceTemplateInfo;
        self.arrSaveInvoice = [];
        $('.invoiceRow').each(function () {
            var $row = $(this);
            var amount = $row.find('.amount').val();
            var description = $row.find('.description').val();
            var billingId = $row.find('.hfBillingId').val();
            var insitituionId = $row.find('.hfinsitituionId').val();
            self.arrSaveInvoice.push(
                {
                    amount: amount,
                    amountRecieved: true,
                    billFrom: self.invoiceTemplateInfo.CompanyAddress,
                    billTo: self.invoiceTemplateInfo.billToAddress,
                    billingIds: [
                        { id: billingId }
                    ],
                    description: description,
                    fkInstitutionId: insitituionId,
                    id: 0,
                    status: "active",
                    termsCondition: self.invoiceTemplateInfo.termEndCond,
                    userId: self._storageService.getUserId()
                }
            )

        });
        this.invoiceService.saveInvoice(self.arrSaveInvoice).subscribe(
            result => {
                if (result.body.httpCode === 200) {
                    $.toaster({ priority: 'success', title: 'Success', message: 'Invoice updated successfully' });
                    this.router.navigate(['/admin/invoices']);
                } else {
                    console.log(result.body.failureReason);
                    $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
                }
            },
            err => {
                console.log(err);
            });


    }
}