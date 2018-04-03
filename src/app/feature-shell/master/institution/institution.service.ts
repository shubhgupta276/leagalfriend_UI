import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Institution } from './institution'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addInstitutionUrl,getInstitutionsUrl,updateInstitutionUrl ,getBillFrom} from '../master.config';
import { StorageService } from '../../../shared/services/storage.service';

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class InstitutionService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getInstitutions(): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getInstitutionsUrl + "?email=" +this._storageService.getUserEmail()
        );
    }
    getBilFrom(): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getBillFrom + "?email=" +this._storageService.getUserEmail()
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