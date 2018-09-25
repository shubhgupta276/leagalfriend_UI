import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Billing } from './billing'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../shared/services/api-gateway';
import { addBillingUrl, updateBillingUrl, getBillingUrl, deleteBillingUrl } from './billing.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../shared/services/storage.service';

@Injectable()
export class BillingService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getBilling(branchId, isInstitutional): Observable<any> {
        let url = getBillingUrl;
        if (isInstitutional) {
            url = 'billing/inst';
        }
        return this.apiGateWay.get<Billing>(
            url + '?branchId=' + branchId + '&userId=' + this._storageService.getUserId()
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
    deleteBilling(billingId: any, isInstitutional): Observable<any> {
        let url = deleteBillingUrl;
        if (!isInstitutional) {
            url = 'billing/individual';
        }
        return this.apiGateWay.delete<Billing>(
            url + '?billingId=' + billingId,
            null
        );
    }

    getBillingAmount(clientId, type): Observable<any> {
        if (type == 'institutional') {
            return this.apiGateWay.get('billing/institutions' + clientId);
        }
        else if (type == 'individual') {
            return this.apiGateWay.get('billing/individual' + clientId);
        }
    }


    getInstitutionBilling(clientId, institutionName): Observable<any> {
        return this.apiGateWay.get('billing/institution' + clientId + '&name=' + institutionName);
    }

    getBranchBilling(clientId, start, end): Observable<any> {
        return this.apiGateWay.get('master/branch/billing' + clientId + '&start=' + start + '&end=' + end);
    }

    getSelectedBranchBilling(clientId, branches, start, end): Observable<any> {
        return this.apiGateWay.get('master/selectedbranch/billing' + clientId + '&branches=' + branches
            + '&start=' + start + '&end=' + end);
    }

    getBranchInstBilling(clientId, month, start, end): Observable<any> {
        return this.apiGateWay.get('master/branch/institutions/billing' + clientId + '&month=' + month +
            '&start=' + start + '&end=' + end);
    }

    getSelectedBranchInstBilling(clientId, branches, start, end): Observable<any> {
        return this.apiGateWay.get('master/branch/institution/billing' + clientId + '&branches=' +
            branches + '&start=' + start + '&end=' + end);
    }

    getBranchInstMonthBilling(clientId, branches, month, start, end): Observable<any> {
        return this.apiGateWay.get('master/branch/institution/monthbilling' + clientId +
            '&branches=' + branches + '&month=' + month + '&start=' + start + '&end=' + end);
    }
}
