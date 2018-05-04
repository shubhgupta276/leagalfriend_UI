import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Billing } from './billing'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../shared/services/api-gateway';
import { addBillingUrl, updateBillingUrl, getBillingUrl,deleteBillingUrl } from './billing.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../shared/services/storage.service';

@Injectable()
export class BillingService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getBilling(): Observable<any> {
        return this.apiGateWay.get<Billing>(
            getBillingUrl + "?userId=" + this._storageService.getUserId()
        );
    }

    addBilling(reqData: any): Observable<any> {
        return this.apiGateWay.post<Billing>(
            addBillingUrl,
            JSON.stringify(reqData)
        );
    }

    updateBilling(reqData: any): Observable<any> {
        return this.apiGateWay.put<Billing>(
            updateBillingUrl,
            JSON.stringify(reqData)
        );
    }
    deleteBilling(reqData: any): Observable<any> {
        return this.apiGateWay.delete<Billing>(
            deleteBillingUrl,
            JSON.stringify(reqData)
        );
    }
}