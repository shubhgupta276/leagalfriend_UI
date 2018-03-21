import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Institution } from './institution'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../shared/services/api-gateway';
import {addForInstitutionUrl,getForInstitutionsUrl,updateForInstitutionUrl} from '../institution/institution.config';
import { StorageService } from '../../shared/services/storage.service';

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class InstitutionService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getForInstitutions(): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getForInstitutionsUrl + "?email=" +this._storageService.getUserEmail()
        );
    }

    addForInstitution(reqData: any): Observable<any> {

        return this.apiGateWay.post<Institution>(
            addForInstitutionUrl,
            JSON.stringify(reqData)
        );
    }

    updateForInstitution(reqData: any): Observable<any> {
        return this.apiGateWay.post<Institution>(
            updateForInstitutionUrl,
            JSON.stringify(reqData)
        );
    }
}