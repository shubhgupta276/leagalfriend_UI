import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Institution } from './institution'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../shared/services/api-gateway';
import {
    updateHearingDate, updateToCompliance, compliances, institutionHistory, institutionHistoryAddRemarks,
    addForInstitutionUrl, getAllForInstitutionsUrl, getForInstitutionUrl, updateForInstitutionUrl, deleteFile, downloadFile, exportForInstitutionsUrl
} from '../institution/institution.config';
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
            getInstitutionsUrl + "?userId=" + this._storageService.getUserId()
        );
    }

    getAllForInstitutions(institutionId, branchId): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getAllForInstitutionsUrl + "?institutionId=" + institutionId + "&branchId=" + branchId + "&userId=" + this._storageService.getUserId()
        );
    }

    getForInstitution(institutionId, branchId, institutionalCaseId): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getForInstitutionUrl + "?institutionId=" + institutionId + "&branchId=" + branchId + "&institutionalCaseId=" + institutionalCaseId
        );
    }

    addForInstitution(formData: any): Observable<any> {

        return this.apiGateWay.post<Institution>(
            addForInstitutionUrl, formData
        );
    }

    updateForInstitution(FormData: any): Observable<any> {
        return this.apiGateWay.post<Institution>(
            updateForInstitutionUrl,
            FormData
        );
    }

    updateHearingDate(data: any): Observable<any> {
        return this.apiGateWay.put<any>(
            updateHearingDate, data
        );
    }

    updateToCompliance(data: any): Observable<any> {
        return this.apiGateWay.post<any>(
            updateToCompliance, JSON.stringify(data)
        );
    }

    GetCompliances(caseId: any): Observable<any> {
        return this.apiGateWay.get<any>(
            compliances + '?caseId=' + caseId
        );
    }

    closeCompliances(caseId: any): Observable<any> {
        return this.apiGateWay.put<any>(
            compliances + '?caseComplianceId=' + caseId, null
        );
    }

    deleteFile(fileId: any): Observable<any> {
        return this.apiGateWay.delete<any>(
            deleteFile + "?fileId=" + fileId
        );
    }

    downloadFile(fileId: any): Observable<File> {
        return this.apiGateWay.getFile(
            downloadFile + "?fileId=" + fileId
        );
    }

    exportCase(data: any): Observable<any> {
        return this.apiGateWay.postFile(
            exportForInstitutionsUrl,
            data
        );
    }

    addRemarkHistory(data: any): Observable<any> {
        return this.apiGateWay.post<any>(
            institutionHistoryAddRemarks, data
        );
    }

    getInsittutionCaseHistory(caseId: any): Observable<any> {
        return this.apiGateWay.get<any>(
            institutionHistory + '?caseId=' + caseId
        );
    }
}