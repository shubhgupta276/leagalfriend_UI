import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operator/retry';
import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { ApiGateway } from '../../shared/services/api-gateway';
import { StorageService } from '../../shared/services/storage.service';
import { Observable } from 'rxjs/Observable';
import { InvoiceTemplate,Invoice } from './invoices.config';
@Injectable()
export class InvoicesService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getInvoiceTemplate(): Observable<any> {
        const apiUrl = InvoiceTemplate + "?userId=" + this._storageService.getUserId();
        return this.apiGateWay.get<any>(apiUrl, null);
    }
    saveInvoice(data:any): Observable<any> {
        return this.apiGateWay.post<any>(Invoice,data);
    }

}
