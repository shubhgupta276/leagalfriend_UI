import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Institution } from './institution'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addInstitutionUrl,getInstitutionsUrl,updateInstitutionUrl,updateDefaultInstitutionUrl ,getBillFrom} from '../master.config';
import { StorageService } from '../../../shared/services/storage.service';

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class InstitutionService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getInstitutions(): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getInstitutionsUrl + "?userId=" +this._storageService.getUserId()
        );
    }
    getBilFrom(): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getBillFrom + "?userId=" +this._storageService.getUserId()
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
    updateDefaultInstitution(reqData: any): Observable<any> {
        return this.apiGateWay.post<Institution>(
            updateDefaultInstitutionUrl,
            JSON.stringify(reqData)
        );
    }
}