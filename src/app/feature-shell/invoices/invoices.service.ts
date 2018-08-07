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
    saveInvoice(data: any, isInstitutional): Observable<any> {
        let url = addInstitutionalInvoice;
        if (!isInstitutional) {
            url = addIndividualInvoice;
        }
        return this.apiGateWay.post<any>(url, data);
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
  
    caneclInvoice(invoiceId: any): Observable<any> {
        const apiUrl = invoiceCancel + '?invoiceId=' + invoiceId;
        return this.apiGateWay.put<any>(apiUrl, null);
    }

    updatePaymentStatus(invoiceId: any): Observable<any> {
        const apiUrl = updatePaymentStatus + '?invoiceId=' + invoiceId;
        return this.apiGateWay.put<any>(apiUrl, null);
    }

}
