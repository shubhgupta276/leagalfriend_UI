import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operator/retry';
import { Billing } from './billing';
import { Observable } from 'rxjs/Observable';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addBillingUrl, updateBillingUrl, getBillingUrl, deleteBillingUrl } from '../master.config';

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable()
export class BillingService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getBilling(): Observable<any> {
        return this.apiGateWay.get<Billing>(
            getBillingUrl + '?userId=' + this._storageService.getUserId()
        );
    }
    getBillingIndividual(): Observable<any> {
        return this.apiGateWay.get<Billing>(
            'master/billings/individual' + '?userId=' + this._storageService.getUserId()
        );
    }

    addBilling(reqData: any, isInstitutional): Observable<any> {
        let url = addBillingUrl;
        if (!isInstitutional) {
            url = 'master/add/billing/individual';
        }
        return this.apiGateWay.post<Billing>(
            url,
            JSON.stringify(reqData)
        );
    }

    updateBilling(reqData: any,isInstitutional): Observable<any> {
        let url = updateBillingUrl;
        if (!isInstitutional) {
            url = 'master/update/billing/individual';
        }
        return this.apiGateWay.post<Billing>(
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
