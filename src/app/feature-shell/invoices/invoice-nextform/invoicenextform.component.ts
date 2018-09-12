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
    styleUrls: ['./invoicenextform.css']

})
export class InvoiceNextFormComponent implements OnInit {

    arr: Institution[] = [];
    arrSaveInvoice = [];
    arrLocalInvoiceDetails = [];
    arrInvoiceDetails = [];
    totalAmount: number;
    todayDate: number = Date.now();
    p: any = 1;
    p2: number = 1;
    perPageItem: number = 10;
    @Input() id: string;
    @Input() maxSize: number;
    @Output() pageChange: EventEmitter<number>;
    JSON: any;
    invoiceTemplateInfo: any;
    isCustomCaseEntry: boolean;
    isCustomSaveClick: boolean = false;
    disableField: boolean = false;
    isInstitutional: boolean = false;
    constructor(private router: Router, public sanitizer: DomSanitizer, private _invoiceService: InvoicesService) {
        Window['InvoiceFormComponent'] = this;
        this.JSON = JSON;
    }

    ngOnInit() {
        this.isCustomCaseEntry = false;
        this.BindInvoice();
        this.StoreInvoiceTemplateInfo();
        this.setInvoiceOtherDetails();
    }

    setInvoiceOtherDetails() {
        const otherDetail = JSON.parse(localStorage.getItem('invoiceOtherDetails'));
        this.isInstitutional = otherDetail.isInstitutional;
        this.disableField = otherDetail.mode === 'view';
    }

    StoreInvoiceTemplateInfo() {
        this.invoiceTemplateInfo = JSON.parse(localStorage.getItem('invoiceTemplateInfo'));
        this.invoiceTemplateInfo.isLoadFirstTime = false;
        this.invoiceTemplateInfo.photoUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,'
            + this.invoiceTemplateInfo.url);
        localStorage.setItem('invoiceTemplateInfo', JSON.stringify(this.invoiceTemplateInfo));
    }

    PreviousCheck() {
        if (this.p2 === 0) {
            this.router.navigate(['/admin/invoices/invoiceform']);
        } else {
            this.CalculateFinalAmount(null);
            this.BindInvoice();
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
        this.arrLocalInvoiceDetails.forEach((element, index) => {
            element.isInvoiceFirstLoad = false;
            this.generateInvoiceViewDetail(element);
        });
        this.sumTotal();
        this.setInvoiceStorageDetail();
    }

    generateInvoiceViewDetail(element) {
        if (element.isCustom) {
            this.isCustomCaseEntry = true;
        }
        this.arrInvoiceDetails.push(
            {
                isCustom: (element.isCustom) ? element.isCustom : false,
                id: (element.id) ? element.id : 0,
                description: element.description,
                amount: element.amount,
                quantity: 1,
                billingDate: element.billingDate
            });
    }

    sumTotal() {
        const $this = this;
        this.totalAmount = 0;
        this.arrLocalInvoiceDetails.forEach(function (data) {
            if (data.amount && !isNaN(data.amount)) {
                $this.totalAmount += parseFloat(data.amount);
            }
        });
    }

    RemoveInvoice(currentRow) {
        if (confirm('Are you sure you want to delete?')) {
            const deleteIndex = this.getIndex($(currentRow).closest('tr').index());
            if (this.arrInvoiceDetails.length > 0) {
                const deleteObj = this.arrLocalInvoiceDetails[deleteIndex];

                if (deleteObj.id && deleteObj.id > 0) {
                    this._invoiceService.deleteBilling(deleteObj.id, this.isInstitutional).subscribe(
                        (result) => {
                            if (result === null) {
                                $.toaster({ priority: 'success', title: 'Success', message: 'Delete Successfully.' });
                                this.arrInvoiceDetails.splice(deleteIndex, 1);
                                this.arrLocalInvoiceDetails.splice(deleteIndex, 1);
                                this.CalculateFinalAmount(null);
                                this.checkCustomCaseExist();
                                if (this.arrLocalInvoiceDetails.length === 0) {
                                    this.addCustomRow();
                                }
                                this.setInvoiceStorageDetail();
                                document.getElementById('tblInvoice').click();
                            } else {
                                $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
                            }
                        },
                        err => {
                            console.log(err);
                        });
                } else {
                    this.arrInvoiceDetails.splice(deleteIndex, 1);
                    this.arrLocalInvoiceDetails.splice(deleteIndex, 1);
                }
            }
            this.CalculateFinalAmount(null);
            this.checkCustomCaseExist();
            if (this.arrLocalInvoiceDetails.length === 0) {
                this.addCustomRow();
            }
        }
    }

    getIndex(index) {
        return ((this.p2 - 1) * this.perPageItem) + index;
    }

    CalculateFinalAmount(currentRow) {
        let isCustom;
        if (currentRow != null) {
            currentRow = $(currentRow).closest('tr');
            isCustom = JSON.parse($(currentRow).find('.hfIsCustom').val());
            let index = $(currentRow).index();
            if (this.p2 > 1) {
                index = this.getIndex(index);
            }
            this.arrLocalInvoiceDetails[index].amount = $(currentRow).find('.amount').val();
            this.arrLocalInvoiceDetails[index].description = $(currentRow).find('.description').val();
            this.arrLocalInvoiceDetails[index].billingDate = $(currentRow).find('.billingDate').val();
        }
        this.sumTotal();
        if (!isCustom) {
            this.setInvoiceStorageDetail();
        }
    }

    checkCustomCaseExist() {
        const data = this.arrLocalInvoiceDetails.find(x => x.isCustom === true);
        if (data) {
            this.isCustomCaseEntry = true;
        } else {
            this.isCustomCaseEntry = false;
        }
    }

    saveCustomCase() {
        this.isCustomSaveClick = true;
        let isValid = true;
        this.arrLocalInvoiceDetails.forEach(function (data) {
            if (data.amount === '' || (!data.description || data.description.trim().length <= 0)
                || (!data.billingDate || data.billingDate.trim().length <= 0)) {
                isValid = false;
            }
        });
        if (isValid) {
            $.toaster({ priority: 'success', title: 'Success', message: 'Add Successfully.' });
            this.setInvoiceStorageDetail();
        } else {
            alert('Please enter all fields');
        }
    }

    addCustomRow() {
        if (this.arrLocalInvoiceDetails.length % 10 === 0) {
            document.getElementById('btnNext').click();
        }
        const obj = {
            isCustom: true,
            description: '',
            billingDate: '',
            amount: ''
        };
        this.arrLocalInvoiceDetails.push(obj);
        this.generateInvoiceViewDetail(obj);
    }
}
