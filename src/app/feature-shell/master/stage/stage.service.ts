import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Stage } from './stage'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { statusUrl, addStageUrl, updateStageUrl, getStagesUrl, getRecourseStagesUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';
@Injectable()
export class StageService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {
    }
    getStages(): Observable<any> {

        return this.apiGateWay.get<Stage>(
            getStagesUrl + "?userId=" + this._storageService.getUserId()

        );
    }

    getRecourseStages(recourseId: any): Observable<any> {

        return this.apiGateWay.get<Stage>(
            getRecourseStagesUrl + "?userId=" + this._storageService.getUserId() + "&recourseId=" + recourseId

        );
    }

    addStage(reqData: any): Observable<any> {

        return this.apiGateWay.post<Stage>(
            addStageUrl,
            JSON.stringify(reqData)
        );
    }

    updateStage(reqData: any): Observable<any> {
        return this.apiGateWay.post<Stage>(
            updateStageUrl,
            JSON.stringify(reqData)
        );
    }

    getStatus(): Observable<any> {
        return this.apiGateWay.get<Stage>(
            statusUrl
        );
    }
}