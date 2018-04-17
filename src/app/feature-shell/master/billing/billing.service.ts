import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Billing } from './billing'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addBillingUrl, updateBillingUrl, getBillingUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable()
export class BillingService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getBilling(): Observable<any> {
        return this.apiGateWay.get<Billing>(
            getBillingUrl + "?email=" + this._storageService.getUserEmail()
        );
    }

    addBilling(reqData: any): Observable<any> {
        return this.apiGateWay.post<Billing>(
            addBillingUrl,
            JSON.stringify(reqData)
        );
    }

    updateBilling(reqData: any): Observable<any> {
        return this.apiGateWay.post<Billing>(
            updateBillingUrl,
            JSON.stringify(reqData)
        );
    }
}