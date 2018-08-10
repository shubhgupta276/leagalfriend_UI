import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../../feature-shell/master/institution/institution.service';
import { StorageService } from '../../../shared/services/storage.service';
import { InvoicesService } from '../invoices.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DatePipe } from '../../../../../node_modules/@angular/common';
declare let $;
@Component({
    selector: 'app-invoiceform',
    templateUrl: './invoiceform.html',
    styleUrls: ['./invoiceform.css']
})
export class InvoiceFormComponent implements OnInit {
    arrSaveInvoice = [];
    arrInvoiceDetails: any;
    isInstitutional: boolean;
    institutionId: number;
    invoiceTemplateInfo = {
        billToAddress: '',
        CompanyAddress: '',
        termEndCond: '',
        Date: null,
        photoUrl: null,
        invoiceNo: '333333',
        isFromInvoice: false,
        url: null
    };
    description: any = '';
    taxableAmount: number = 0;
    taxPercent: number = 0;
    todayDate: number = Date.now();
    isEditMode: boolean = false;
    isViewMode: boolean = false;
    disableField: boolean = false;
    constructor(private _institutionService: InstitutionService,
        private _storageService: StorageService, private _datePipe: DatePipe,
        private _invoicesService: InvoicesService, public sanitizer: DomSanitizer, private router: Router, ) {
    }

    ngOnInit() {
        this.setInvoiceOtherDetails();
        this.BindInvoice();
    }

    StoreInvoiceTemplateInfo() {
        localStorage.setItem('invoiceTemplateInfo', JSON.stringify(this.invoiceTemplateInfo));
    }

    getInvoiceStorageDetail() {
        return JSON.parse(localStorage.getItem('invoiceDetails'));
    }

    setInvoiceStorageDetail(data) {
        localStorage.setItem('invoiceDetails', JSON.stringify(data));
    }

    setInvoiceOtherDetails() {
        const otherDetail = JSON.parse(localStorage.getItem('invoiceOtherDetails'));
        if (otherDetail) {
            this.isEditMode = otherDetail.mode === 'edit';
            this.isViewMode = otherDetail.mode === 'view';
            this.disableField = this.isViewMode;
            this.isInstitutional = otherDetail.isInstitutional;
            if (this.isEditMode || this.isViewMode) {
                this.invoiceTemplateInfo.billToAddress = otherDetail.invoice.billTo;
                this.invoiceTemplateInfo.CompanyAddress = otherDetail.invoice.billFrom;
                this.invoiceTemplateInfo.termEndCond = otherDetail.invoice.termsCondition;
                this.description = otherDetail.invoice.description;
                this.institutionId = otherDetail.invoice.institution.id;
            } else {
                this.institutionId = otherDetail.institutionId;
                this.GetBillFrom();
                this.GetAllInstitute();
            }
        }
    }

    BindInvoice() {
        let invoiceDetails = this.getInvoiceStorageDetail();
        const arEditInvoiceDetails = [];
        let totalAmount = 0;
        invoiceDetails.forEach(element => {

            if (this.isEditMode || this.isViewMode) {
                arEditInvoiceDetails.push({
                    caseId: element.caseId,
                    description: (element.description) ? element.description : element.billingDesc,
                    billingDate: this._datePipe.transform(new Date(element.billingDate), 'dd MMM yyyy'),
                    amount: parseFloat(element.amount),
                    id: element.id,
                    isCustom: (element.caseId) ? false : true
                });
                totalAmount = totalAmount + parseFloat(element.amount);
            } else {
                let description = '';
                totalAmount = totalAmount + parseFloat(element.amount);
                if (element.isCustom) {
                    //  description = element.description.replace('\n', '') + '\n';
                } else {
                    if (!element.description) {
                        description = ('CaseId : ' + element.caseId + ',  Recourse : ' + element.recourseName
                            + ', Stage : ' + element.stageName + '\n');
                        element.description = description;
                    }
                    this.description += ('CaseId : ' + element.caseId + ', ');
                }
            }
        });
        if (this.isEditMode || this.isViewMode) {
            invoiceDetails = arEditInvoiceDetails;
        }

        this.invoiceTemplateInfo.isFromInvoice = (invoiceDetails && invoiceDetails.length > 0)
            ? invoiceDetails[0].isFromInvoice : false;
        this.arrInvoiceDetails = {
            totalAmount: totalAmount,
            totalQuantity: invoiceDetails.length,
            invoiceNo: Math.floor(Math.random() * 90000),
            id: invoiceDetails.id
        };
        this.setInvoiceStorageDetail(invoiceDetails);
    }

    GetBillFrom() {

        this._invoicesService.getInvoiceTemplate().subscribe(
            result => {
                const address = result.invoiceFooter.address;
                this.invoiceTemplateInfo.billToAddress = address.address1 + ' ,'
                    + address.city + ' ,' + address.state + ' ,' + address.zipCode;
                this.invoiceTemplateInfo.photoUrl =
                    this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,' + result.invoiceHeader.logo);
                this.invoiceTemplateInfo.termEndCond = result.invoiceFooter.termsCondition;
                this.invoiceTemplateInfo.url = result.invoiceHeader.logo;
            });
    }

    GetAllInstitute() {

        this._institutionService.getInstitutions().subscribe(
            result => {
                if (result.httpCode === 200) {
                    for (let i = 0; i < result.institutions.length; i++) {
                        const obj = result.institutions[i];
                        if (this.institutionId === this.institutionId) {
                            this.invoiceTemplateInfo.CompanyAddress = obj.address;
                        }
                    }
                }
            });
    }

    taxChange(value: number) {
        this.taxableAmount = 0;
        this.taxPercent = value;
        if (value) {
            const totalAmount = Number(this.arrInvoiceDetails.totalAmount);
            if (totalAmount) {
                this.taxableAmount = (totalAmount * this.taxPercent) / 100;
            }
        }
    }

    isValid() {
        if (this.description.trim().length > 0 && this.invoiceTemplateInfo.billToAddress.trim().length > 0
            && this.invoiceTemplateInfo.CompanyAddress.trim().length > 0 &&
            this.invoiceTemplateInfo.termEndCond.trim().length > 0) {
            return true;
        } else {
            return false;
        }
    }

    SaveInvoice() {
        if (this.isValid()) {
            let invoiceDetails = this.getInvoiceStorageDetail();
            const arCustom = invoiceDetails.filter(x => x.isCustom);
            invoiceDetails = invoiceDetails.filter(x => !x.isCustom);
            const billingArray = [];
            const $this = this;
            invoiceDetails.forEach(item => {
                billingArray.push(
                    {
                        amount: item.amount,
                        id: item.id,
                        description: item.description,
                        userId: $this._storageService.getUserId()
                    }
                );
            });

            if (arCustom.length > 0) {
                const arCustomInvoice = [];
                arCustom.forEach(data => {
                    arCustomInvoice.push({
                        amount: Number(data.amount),
                        billingDate: new Date(data.billingDate),
                        billingDesc: data.description,
                        custom: true,
                    });
                });
                this._invoicesService.saveCustomInvoice(arCustomInvoice, this.isInstitutional).subscribe(
                    result => {
                        result = result.body;
                        if (result && result.length > 0) {
                            result.forEach(item => {
                                billingArray.push({
                                    amount: item.amount,
                                    id: item.id,
                                    description: item.billingDesc,
                                    userId: $this._storageService.getUserId()
                                });
                            });
                            this.saveCompleteInvoice(billingArray);
                        }
                    },
                    err => console.log(err));
            } else if (invoiceDetails.length > 0) {
                this.saveCompleteInvoice(billingArray);
            }
        }
    }

    saveCompleteInvoice(billingArray) {
        const $this = this;
        let totalAmount = 0;
        billingArray.forEach(function (item) {
            item.fkInstitutionId = $this.institutionId;
            totalAmount += Number(item.amount);
        });

        const arrSaveInvoice = {
            amount: totalAmount,
            amountRecieved: true,
            billFrom: this.invoiceTemplateInfo.CompanyAddress,
            billTo: this.invoiceTemplateInfo.billToAddress,
            createdBy: this._storageService.getUserId(),
            description: this.description,
            id: 0,
            institution: { id: this.institutionId },
            status: 'active',
            termsCondition: this.invoiceTemplateInfo.termEndCond,
            userId: this._storageService.getUserId()
        };

        if (this.isInstitutional) {
            arrSaveInvoice['institutionalBillings'] = billingArray;
        } else {
            delete arrSaveInvoice['institution'];
            arrSaveInvoice['individualBillings'] = billingArray;
        }
        if (this.isEditMode) {
            this._invoicesService.updateInvoice(arrSaveInvoice, this.isInstitutional).subscribe(
                result => {
                    if (result.body.httpCode === 200) {
                        this._storageService.clearInvoiceData();
                        $.toaster({ priority: 'success', title: 'Success', message: result.body.successMessage });
                        this.router.navigate(['/admin/invoices']);
                    } else {
                        $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
                    }
                },
                err => {
                    console.log(err);
                });
        } else {
            this._invoicesService.saveInvoice(arrSaveInvoice, this.isInstitutional).subscribe(
                result => {
                    if (result.body.httpCode === 200) {
                        this._storageService.clearInvoiceData();
                        $.toaster({ priority: 'success', title: 'Success', message: result.body.successMessage });
                        this.router.navigate(['/admin/invoices']);
                    } else {
                        $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
                    }
                },
                err => {
                    console.log(err);
                });
        }
    }
}
