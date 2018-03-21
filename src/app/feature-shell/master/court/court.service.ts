import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Court } from './Court'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addCourtUrl, updateCourtUrl, getCourtsUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';
@Injectable()
export class CourtService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getCourts(): Observable<any> {

        return this.apiGateWay.get<Court>(
            getCourtsUrl + "?email=" + this._storageService.getUserEmail()
        );
    }

    addCourt(reqData: any): Observable<any> {

        return this.apiGateWay.post<Court>(
            addCourtUrl,
            JSON.stringify(reqData)
        );
    }

    updateCourt(reqData: any): Observable<any> {
        return this.apiGateWay.post<Court>(
            updateCourtUrl,
            JSON.stringify(reqData)
        );
    }
}