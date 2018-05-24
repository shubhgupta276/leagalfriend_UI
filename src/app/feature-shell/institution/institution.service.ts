import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Institution } from './institution'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../shared/services/api-gateway';
import { addForInstitutionUrl, getAllForInstitutionsUrl, getForInstitutionUrl, updateForInstitutionUrl } from '../institution/institution.config';
import { StorageService } from '../../shared/services/storage.service';
import { getInstitutionsUrl } from '../master/master.config';
import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class InstitutionService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService, private _httpClient: HttpClient) {

    }

    getInstitutionList(): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getInstitutionsUrl + "?email=" + this._storageService.getUserEmail()
        );
    }

    getAllForInstitutions(institutionId, branchId): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getAllForInstitutionsUrl + "?institutionId=" + institutionId + "&branchId=" + branchId + "&userId=" + this._storageService.getUserId()
        );
    }

    getForInstitution(institutionId, institutionalCaseId): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getForInstitutionUrl + "?institutionId=" + institutionId + "&institutionalCaseId=" + institutionalCaseId
        );
    }

    addForInstitution(formData: any): Observable<any> {

        return this.apiGateWay.post<Institution>(
            addForInstitutionUrl, formData
        );
    }

    updateForInstitution(FormData: any): Observable<any> {
        return this.apiGateWay.put<Institution>(
            updateForInstitutionUrl,
            FormData
        );
    }
}