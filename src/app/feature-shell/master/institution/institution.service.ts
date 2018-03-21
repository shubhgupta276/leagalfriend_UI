import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Institution } from './institution'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addInstitutionUrl,getInstitutionsUrl,updateInstitutionUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class InstitutionService {

    constructor(private apiGateWay: ApiGateway) {

    }

    getInstitutions(reqData: any): Observable<any> {

        return this.apiGateWay.post<Institution>(
            getInstitutionsUrl,
            JSON.stringify(reqData)
        );
    }

    addInstitution(reqData: any): Observable<any> {

        return this.apiGateWay.post<Institution>(
            addInstitutionUrl,
            JSON.stringify(reqData)
        );
    }

    updateInstitution(reqData: any): Observable<any> {
        return this.apiGateWay.post<Institution>(
            updateInstitutionUrl,
            JSON.stringify(reqData)
        );
    }
}