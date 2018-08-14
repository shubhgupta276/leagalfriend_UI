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

    getInvoiceData(isInstitutional): Observable<any> {
        let url = getInstitutionalInvoice;
        if (!isInstitutional) {
            url = getIndividualInvoice;
        }
        const apiUrl = url + '?userId=' + this._storageService.getUserId();
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
        let url = invoiceCancel + '?invoiceId=' + invoiceId;
        if (!isInstitutional) {
            url = 'invoice/individual/cancel';
        }
        return this.apiGateWay.put<any>(url, null);
    }

    updatePaymentStatus(invoiceId: any, date): Observable<any> {
        const apiUrl = updatePaymentStatus + '?invoiceId=' + invoiceId + '&date=' + date;
        return this.apiGateWay.put<any>(apiUrl, null);
    }

}