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
})
export class InvoiceFormComponent implements OnInit {
    arrSaveInvoice = [];
    arrInvoiceDetails: any;
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
        this.GetAllInstitute();
        this.GetBillFrom();
        this.BindInvoice();
    }
    StoreInvoiceTemplateInfo() {
        localStorage.setItem('invoiceTemplateInfo', JSON.stringify(this.invoiceTemplateInfo));
    }
    BindInvoice() {
        const invoiceDetails = JSON.parse(localStorage.getItem('invoiceDetails'));
        let totalAmount = 0;
        let totalDescription = '';
        let description = '';
        invoiceDetails.forEach(element => {
            totalAmount = totalAmount + parseFloat(element.amount);
            description = ('CaseId : ' + element.caseId + ',  Recourse : ' + element.recourseName
                + ', Stage : ' + element.stageName + '\n');
            totalDescription = totalDescription + description;
            element.description = description;
        });
        this.invoiceTemplateInfo.isFromInvoice = invoiceDetails[0].isFromInvoice;
        this.arrInvoiceDetails = {
            totalAmount: totalAmount,
            totalDescription: totalDescription,
            totalQuantity: invoiceDetails.length,
            invoiceNo: Math.floor(Math.random() * 90000),
            id: invoiceDetails.id,
            institutionId: invoiceDetails.institutionId
        };
        localStorage.setItem('invoiceDetails', JSON.stringify(invoiceDetails));

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
                        if (this.arrInvoiceDetails.institutionId == obj.institutionId) {
                            this.invoiceTemplateInfo.CompanyAddress = obj.address;
                        }
                    }
                }
            });
    }

    SaveInvoice() {
        const invoiceDetails = JSON.parse(localStorage.getItem('invoiceDetails'));
        const self = this;
        let totalAmount = 0;
        let arrSaveInvoice = {};
        const billingArray = [];
        let isInstitutional;
        invoiceDetails.forEach(item => {
            totalAmount += parseFloat(item.amount);
            isInstitutional = item.isInstitutional;
            billingArray.push(
                {
                    amount: item.amount,
                    id: item.id,
                    description: item.description,
                    fkInstitutionId: item.institutionId,
                    userId: self._storageService.getUserId()
                }
            );
        });
        arrSaveInvoice = {
            amount: totalAmount,
            amountRecieved: true,
            billFrom: self.invoiceTemplateInfo.CompanyAddress,
            billTo: self.invoiceTemplateInfo.billToAddress,
            createdBy: self._storageService.getUserId(),
            description: $('.description').val(),
            id: 0,
            institution: { id: billingArray[0].fkInstitutionId },
            status: 'active',
            termsCondition: self.invoiceTemplateInfo.termEndCond,
            userId: self._storageService.getUserId()
        };

        if (isInstitutional) {
            arrSaveInvoice['institutionalBillings'] = billingArray;
        } else {
            delete arrSaveInvoice['institution'];
            arrSaveInvoice['individualBillings'] = billingArray;
        }
      //  debugger
        this._invoicesService.saveInvoice(arrSaveInvoice, isInstitutional).subscribe(
            result => {

                if (result.body.httpCode === 200) {
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