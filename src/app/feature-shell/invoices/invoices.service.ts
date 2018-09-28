import { isUndefined } from 'util';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operator/retry';
import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { ApiGateway } from '../../shared/services/api-gateway';
import { StorageService } from '../../shared/services/storage.service';
import { Observable } from 'rxjs/Observable';
import {
    InvoiceTemplate, addInstitutionalInvoice, addIndividualInvoice,
    getIndividualInvoice, getInstitutionalInvoice, invoiceCancel, updatePaymentStatus
} from './invoices.config';
@Injectable()
export class InvoicesService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getInvoiceTemplate(): Observable<any> {
        const apiUrl = InvoiceTemplate + '?userId=' + this._storageService.getUserId();
        return this.apiGateWay.get<any>(apiUrl, null);
    }
    saveInvoice(data: any, isInstitutional, isEditMode): Observable<any> {
        if (!isEditMode) {
            let url = addInstitutionalInvoice;
            if (!isInstitutional) {
                url = addIndividualInvoice;
            }
            return this.apiGateWay.post<any>(url, data);
        } else {
            return this.updateInvoice(data, isInstitutional);
        }
    }

    private updateInvoice(data: any, isInstitutional): Observable<any> {
        let url = 'invoice/institutional';
        if (!isInstitutional) {
            url = 'invoice/individual';
        }
        return this.apiGateWay.put<any>(url, data);
    }

    saveCustomInvoice(data: any, isInstitutional): Observable<any> {
        let url = 'billing';
        if (!isInstitutional) {
            url = 'billing/individual';
        }
        return this.apiGateWay.post<any>(url, data);
    }

    getInvoiceData(branchId, isInstitutional): Observable<any> {
        let url = getInstitutionalInvoice;
        if (!isInstitutional) {
            url = getIndividualInvoice;
        }
        const apiUrl = url + '?branchId=' + branchId + '&userId=' + this._storageService.getUserId();
        return this.apiGateWay.get<any>(apiUrl, null);
    }

    invoiceNumberAlreadyExists(invoiceNumber: any): Observable<any> {
        const url = 'invoice/validate';
        const apiUrl = url + '?invoiceNumber=' + invoiceNumber + '&userId=' + this._storageService.getUserId();
        return this.apiGateWay.get<any>(apiUrl, null);
    }

    getInvoiceNumber() {
        const apiUrl = 'invoice/number' + '?userId=' + this._storageService.getUserId();
        return this.apiGateWay.get<any>(apiUrl, null);
    }

    getInvoiceDetail(invoiceId, isInstitutional): Observable<any> {
        let url = 'invoice/institutional/single';
        if (!isInstitutional) {
            url = 'invoice/individual/single';
        }
        url = url + '?invoiceId=' + invoiceId;
        return this.apiGateWay.get<any>(url, null);
    }

    caneclInvoice(invoiceId: any, isInstitutional): Observable<any> {
        let url = invoiceCancel;
        if (!isInstitutional) {
            url = 'invoice/individual/cancel';
        }
        url += '?invoiceId=' + invoiceId;
        return this.apiGateWay.put<any>(url, null);
    }

    deleteBilling(billingId: any, isInstitutional: boolean): Observable<any> {
        let url = '/billing';
        if (!isInstitutional) {
            url = 'billing/individual';
        }
        url += '?billingId=' + billingId;
        return this.apiGateWay.delete<any>(url, null);
    }

    updatePaymentStatus(invoiceId: any, date): Observable<any> {
        const apiUrl = updatePaymentStatus + '?invoiceId=' + invoiceId + '&date=' + date;
        return this.apiGateWay.put<any>(apiUrl, null);
    }

    getInvoicesAmount(year): Observable<any> {
        return this.apiGateWay.get('/invoice/amount?userId=' + this._storageService.getUserId()
            + '&year=' + year);
    }

    getInvoicesInstAmount(year, month): Observable<any> {
        if (month == null) {
            return this.apiGateWay.get('/invoice/inst/amount?userId=' + this._storageService.getUserId()
                + '&year=' + year);
        }
        else {
            return this.apiGateWay.get('/invoice/inst/amount/month?userId=' + this._storageService.getUserId()
                + '&year=' + year + '&month=' + month);
        }
    }

    getInvoicesAmountByDate(start, end): Observable<any> {
        return this.apiGateWay.get('/invoice/date/amount?userId=' + this._storageService.getUserId()
            + '&start=' + start + '&end=' + end);
    }

    getInvoicesInstAmountByDate(start, end, month): Observable<any> {
        if (month == null) {
            return this.apiGateWay.get('/invoice/date/inst/amount?userId=' + this._storageService.getUserId()
                + '&start=' + start + '&end=' + end);
        }
        else {
            return this.apiGateWay.get('/invoice/date/inst/amount/month?userId=' + this._storageService.getUserId()
                + '&start=' + start + '&end=' + end + '&month=' + month);
        }
    }

    getInvoicesAmountByBranch(branch,start, end): Observable<any>{
        return this.apiGateWay.get('invoice/selectedbranch/amount/?userId='+this._storageService.getUserId()+'&branch='+branch
        +'&start='+start+'&end='+end);
    }

    getInvoicesInstAmountByBranch(branch,start, end): Observable<any>{
        return this.apiGateWay.get('invoice/selectedbranch/inst/amount/?userId='+this._storageService.getUserId()+'&branch='+branch
        +'&start='+start+'&end='+end);
    }

    getInvoicesInstMonthByBranch(branch,start, end,month): Observable<any>{
        return this.apiGateWay.get('invoice/selectedbranch/inst/month/amount/?userId='+this._storageService.getUserId()+'&branch='+branch
        +'&start='+start+'&end='+end+'&month='+month);
    }
}
