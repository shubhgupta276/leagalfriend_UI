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
        invoiceNo: '',
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
    editInvoiceId: any;
    oldInvoiceNo: any;
    invoiceNumberAlreadyExists: boolean = false;
    invoiceAlreadyMessage: any;
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
                this.taxPercent = otherDetail.invoice.taxPercent;
                this.taxableAmount = otherDetail.invoice.taxAmount;
                this.editInvoiceId = otherDetail.invoice.id;
                this.invoiceTemplateInfo.billToAddress = otherDetail.invoice.billTo;
                this.invoiceTemplateInfo.CompanyAddress = otherDetail.invoice.billFrom;
                this.invoiceTemplateInfo.termEndCond = otherDetail.invoice.termsCondition;
                this.description = otherDetail.invoice.description;
                this.oldInvoiceNo = otherDetail.invoice.invoiceNumber.toString();
                this.invoiceTemplateInfo.invoiceNo = otherDetail.invoice.invoiceNumber.toString();
                this.institutionId = (otherDetail.invoice.institution) ? otherDetail.invoice.institution.id : 0;
            } else {
                this.institutionId = (this.isInstitutional) ? otherDetail.institutionId : 0;
                this.getInvoiceNumber();
                this.getToBillAddress();
            }
            this.GetBillFrom();
        }
    }

    getInvoiceNumber() {
        this._invoicesService.getInvoiceNumber().subscribe(
            (result) => {
                if (result) {
                    this.invoiceTemplateInfo.invoiceNo = result + '';
                }
            },
            err => console.log(err)
        );

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
            id: invoiceDetails.id
        };
        this.calculateTax();
        this.setInvoiceStorageDetail(invoiceDetails);
    }

    GetBillFrom() {

        this._invoicesService.getInvoiceTemplate().subscribe(
            result => {
                this.invoiceTemplateInfo.photoUrl =
                    this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,' + result.invoiceHeader.logo);
                this.invoiceTemplateInfo.url = result.invoiceHeader.logo;
                if (!this.isEditMode && !this.isViewMode) {
                    const address = result.invoiceFooter.address;
                    this.invoiceTemplateInfo.CompanyAddress = address.address1 + ' ,'
                        + address.city + ' ,' + address.state + ' ,' + address.zipCode;
                    this.invoiceTemplateInfo.termEndCond = result.invoiceFooter.termsCondition;
                }
            });
    }

    getToBillAddress() {
        if (this.isInstitutional) {
            this.GetAllInstitute();
        } else {
            this.getIndividualAddress();
        }
    }

    GetAllInstitute() {

        this._institutionService.getInstitutions().subscribe(
            result => {
                if (result.httpCode === 200) {
                    for (let i = 0; i < result.institutions.length; i++) {
                        const obj = result.institutions[i];
                        if (this.institutionId === obj.id) {
                            this.invoiceTemplateInfo.billToAddress = obj.address;
                        }
                    }
                }
            });
    }

    getIndividualAddress() {
        try {
            this._institutionService.getUserAddress().subscribe(
                result => {
                    if (result) {
                        const address = result.address1 + `, ${result.city}, ${result.state}, ${result.zipCode}`;
                        this.invoiceTemplateInfo.billToAddress = address;
                    }
                });

        } catch (error) {
            console.log(error);
        }
    }

    invoiceNumberChange() {
        try {
            if (!this.isEditMode || (this.isEditMode && (this.oldInvoiceNo !== this.invoiceTemplateInfo.invoiceNo))) {
                this._invoicesService.invoiceNumberAlreadyExists(this.invoiceTemplateInfo.invoiceNo).subscribe(
                    (result) => {
                        if (result.httpCode === 409) {
                            this.invoiceAlreadyMessage = result.failureReason;
                            this.invoiceNumberAlreadyExists = true;
                        } else {
                            this.invoiceNumberAlreadyExists = false;
                        }
                    },
                    err => {
                        console.log(err);
                    });
            } else {
                this.invoiceNumberAlreadyExists = false;
            }

        } catch (error) {
            console.log(error);
        }
    }

    taxChange(value: number) {
        this.taxableAmount = 0;
        this.taxPercent = value;
        if (value) {
            this.calculateTax();
        }
    }

    calculateTax() {
        const totalAmount = Number(this.arrInvoiceDetails.totalAmount);
        if (totalAmount) {
            this.taxableAmount = (totalAmount * this.taxPercent) / 100;
        }
    }

    isValid() {
        if (this.description.trim().length > 0 &&
            this.invoiceTemplateInfo.billToAddress.trim().length > 0 &&
            this.invoiceTemplateInfo.CompanyAddress.trim().length > 0 &&
            this.invoiceTemplateInfo.termEndCond.trim().length > 0) {
            return true;
        } else {
            return false;
        }
    }

    SaveInvoice() {
        if (this.isValid()) {
            let invoiceDetails = this.getInvoiceStorageDetail();
            const arCustom = invoiceDetails.filter(x => x.isCustom && (!x.id || x.id <= 0));
            invoiceDetails = invoiceDetails.filter(x => !x.isCustom || x.id > 0);
            const billingArray = [];
            const $this = this;
            invoiceDetails.forEach(item => {
                billingArray.push(
                    {
                        amount: item.amount,
                        id: item.id,
                        billingDate: new Date(item.billingDate),
                        billingDesc: item.description,
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
                        institution: {
                            id: this.institutionId
                        },
                        userId: $this._storageService.getUserId()
                    });
                });

                if (!this.isInstitutional) {
                    delete arCustomInvoice['institution'];
                }
                this._invoicesService.saveCustomInvoice(arCustomInvoice, this.isInstitutional).subscribe(
                    result => {
                        result = result.body;
                        if (result && result.length > 0) {
                            result.forEach(item => {
                                billingArray.push({
                                    amount: item.amount,
                                    id: item.id,
                                    billingDate: new Date(item.billingDate),
                                    billingDesc: item.billingDesc,
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
        let totalAmount = 0;
        billingArray.forEach(function (item) {
            totalAmount += Number(item.amount);
        });

        const arrSaveInvoice = {
            individualBillings: billingArray,
            institutionalBillings: billingArray,
            invoice: {
                amount: totalAmount, //  + this.taxableAmount,
                amountRecieved: true,
                billFrom: this.invoiceTemplateInfo.CompanyAddress,
                billTo: this.invoiceTemplateInfo.billToAddress,
                createdBy: this._storageService.getUserId(),
                createdDate: new Date(),
                description: this.description,
                id: (this.editInvoiceId) ? this.editInvoiceId : 0,
                institution: { id: this.institutionId },
                invoiceNumber: this.invoiceTemplateInfo.invoiceNo,
                taxPercent: this.taxPercent,
                taxAmount: this.taxableAmount,
                active: 'active',
                termsCondition: this.invoiceTemplateInfo.termEndCond,
                updatedBy: this._storageService.getUserId(),
                userId: this._storageService.getUserId(),
            },
        };

        if (this.isInstitutional) {
            delete arrSaveInvoice['individualBillings'];
        } else {
            delete arrSaveInvoice['institutionalBillings'];
        }
        this._invoicesService.saveInvoice(arrSaveInvoice, this.isInstitutional, this.isEditMode).subscribe(
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
