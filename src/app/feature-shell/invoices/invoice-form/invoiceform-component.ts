import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../../feature-shell/master/institution/institution.service';
import { StorageService } from '../../../shared/services/storage.service';
import { InvoicesService } from '../invoices.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
    todayDate: number = Date.now();
    constructor(private _institutionService: InstitutionService, private _storageService: StorageService,
        private _invoicesService: InvoicesService, public sanitizer: DomSanitizer, private router: Router, ) {
    }

    ngOnInit() {
        this.setInvoiceOtherDetails();
        this.GetBillFrom();
        this.GetAllInstitute();
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
        this.isInstitutional = otherDetail.isInstitutional;
        this.institutionId = otherDetail.institutionId;
    }

    BindInvoice() {
        const invoiceDetails = this.getInvoiceStorageDetail();
        let totalAmount = 0;
        let totalDescription = '';
        let description = '';

        invoiceDetails.forEach(element => {
            totalAmount = totalAmount + parseFloat(element.amount);
            if (element.isCustom) {
                description = element.description.replace('\n', '') + '\n';
            } else {
                description = ('CaseId : ' + element.caseId + ',  Recourse : ' + element.recourseName
                    + ', Stage : ' + element.stageName + '\n');
            }
            totalDescription = totalDescription + description;
            element.description = description;
        });
        this.invoiceTemplateInfo.isFromInvoice = (invoiceDetails && invoiceDetails.length > 0)
            ? invoiceDetails[0].isFromInvoice : false;
        this.arrInvoiceDetails = {
            totalAmount: totalAmount,
            totalDescription: totalDescription,
            totalQuantity: invoiceDetails.length,
            invoiceNo: Math.floor(Math.random() * 90000),
            id: invoiceDetails.id,
            institutionId: invoiceDetails.institutionId
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
                        if (this.institutionId == obj.institutionId) {
                            this.invoiceTemplateInfo.CompanyAddress = obj.address;
                        }
                    }
                }
            });
    }

    isValid() {
        if (this.invoiceTemplateInfo.billToAddress.trim().length > 0
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
        let description = '';
        billingArray.forEach(function (item) {
            item.fkInstitutionId = $this.institutionId;
            totalAmount += Number(item.amount);
            description += item.description;
        });

        const arrSaveInvoice = {
            amount: totalAmount,
            amountRecieved: true,
            billFrom: this.invoiceTemplateInfo.CompanyAddress,
            billTo: this.invoiceTemplateInfo.billToAddress,
            createdBy: this._storageService.getUserId(),
            description: description,
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
