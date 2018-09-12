import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Institution } from './institution'
import { Observable } from 'rxjs/Observable';
import { ApiGateway } from '../../shared/services/api-gateway';
import {
    updateForHearingDate, updateAgainstHearingDate, updateForToCompliance, getForInstitutionCompliances,
    forInstitutionHistory, againstInstitutionHistory, getAllAgainstInstitutionsUrl,
    addForInstitutionUrl, getAllForInstitutionsUrl, getForInstitutionUrl, getAgainstInstitutionUrl,
    updateAgainstInstitutionUrl, exportAgainstInstitutionsUrl, getAgainstInstitutionCompliances,
    updateForInstitutionUrl, deleteFile, downloadFile, exportForInstitutionsUrl, updateAgainstToCompliance,
    institutionHistoryAddRemarks
} from '../institution/institution.config';
import { StorageService } from '../../shared/services/storage.service';
import { getInstitutionsUrl } from '../master/master.config';
import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class InstitutionService {

    public isAgainstInstitution: boolean = false;
    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService,
        private _httpClient: HttpClient) {
    }

    getInstitutionList(): Observable<any> {
        return this.apiGateWay.get<Institution>(
            getInstitutionsUrl + '?userId=' + this._storageService.getUserId()
        );
    }

    getAllForInstitutions(institutionId, branchId): Observable<any> {
        let url = getAllForInstitutionsUrl;
        if (this.isAgainstInstitution) {
            url = getAllAgainstInstitutionsUrl;
        }
        return this.apiGateWay.get<Institution>(
            url + '?institutionId=' + institutionId
            + '&branchId=' + branchId + '&userId=' + this._storageService.getUserId()
        );
    }

    getForInstitution(institutionId, branchId, institutionalCaseId): Observable<any> {
        let url = getForInstitutionUrl;
        if (this.isAgainstInstitution) {
            url = getAgainstInstitutionUrl;
        }
        return this.apiGateWay.get<Institution>(
            url + '?institutionId=' + institutionId
            + '&branchId=' + branchId + '&institutionalCaseId=' + institutionalCaseId
        );
    }

    addForInstitution(formData: FormData): Observable<any> {
        if (this.isAgainstInstitution) {
            formData.set('isForInstitution', 'N');
        }
        return this.apiGateWay.post<Institution>(
            addForInstitutionUrl, formData
        );
    }

    updateForInstitution(formData: FormData): Observable<any> {
        let url = updateForInstitutionUrl;
        if (this.isAgainstInstitution) {
            url = updateAgainstInstitutionUrl;
            const tempData = formData.get('forInstitutionalCase');
            formData.set('againstInstitutionalCase ', tempData);
            formData.delete('forInstitutionalCase');
        }
        return this.apiGateWay.post<Institution>(
            url, formData
        );
    }

    updateHearingDate(data: any): Observable<any> {
        let url = updateForHearingDate;
        if (this.isAgainstInstitution) {
            url = updateAgainstHearingDate;
        }
        return this.apiGateWay.put<any>(
            url, data
        );
    }

    updateToCompliance(data: any): Observable<any> {
        let url = updateForToCompliance;
        if (this.isAgainstInstitution) {
            url = updateAgainstToCompliance;
        }
        return this.apiGateWay.post<any>(
            url, JSON.stringify(data)
        );
    }

    GetCompliances(caseId: any): Observable<any> {
        let url = getForInstitutionCompliances;
        if (this.isAgainstInstitution) {
            url = getAgainstInstitutionCompliances;
        }
        return this.apiGateWay.get<any>(
            url + '?caseId=' + caseId
        );
    }

    closeCompliances(caseId: any): Observable<any> {
        let url = getForInstitutionCompliances;
        if (this.isAgainstInstitution) {
            url = getAgainstInstitutionCompliances;
        }
        return this.apiGateWay.put<any>(
            url + '?caseComplianceId=' + caseId, null
        );
    }

    deleteFile(fileId: any): Observable<any> {
        return this.apiGateWay.delete<any>(
            deleteFile + '?fileId=' + fileId
        );
    }

    downloadFile(fileId: any): Observable<File> {
        return this.apiGateWay.getFile(
            downloadFile + '?fileId=' + fileId
        );
    }

    exportCase(data: any): Observable<any> {
        let url = exportForInstitutionsUrl;
        if (this.isAgainstInstitution) {
            url = exportAgainstInstitutionsUrl;
        }

        return this.apiGateWay.postFile(
            url,
            data
        );
    }

    exportCaseFiles(data: any): Observable<any> {

        return this.apiGateWay.postFile('institution/export/files',
            data
        );
    }

    addRemarkHistory(data: any): Observable<any> {
        return this.apiGateWay.post<any>(
            institutionHistoryAddRemarks, data
        );
    }

    getInsittutionCaseHistory(caseId: any): Observable<any> {
        let url = forInstitutionHistory;
        if (this.isAgainstInstitution) {
            url = againstInstitutionHistory;
        }
        return this.apiGateWay.get<any>(
            url + '?caseId=' + caseId
        );
    }
}
