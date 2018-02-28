import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Compliance } from './compliance'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { statusUrl, addComplianceUrl, updateComplianceUrl, getCompliancesUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';
@Injectable()
export class ComplianceService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getCompliances(): Observable<any> {

        return this.apiGateWay.get<Compliance>(
            getCompliancesUrl + "?email=" + this._storageService.getUserEmail()
        );
    }

    addCompliance(reqData: any): Observable<any> {

        return this.apiGateWay.post<Compliance>(
            addComplianceUrl,
            JSON.stringify(reqData)
        );
    }

    updateCompliance(reqData: any): Observable<any> {
        return this.apiGateWay.post<Compliance>(
            updateComplianceUrl,
            JSON.stringify(reqData)
        );
    }

    getStatus(): Observable<any> {
        return this.apiGateWay.get<Compliance>(
            statusUrl
        );
    }
}