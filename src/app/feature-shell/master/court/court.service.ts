import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Court } from './Court'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addCourtUrl, updateCourtUrl, getCourtsUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class CourtService {

    constructor(private apiGateWay: ApiGateway) {

    }

    getCourts(reqData: any): Observable<any> {

        return this.apiGateWay.post<Court>(
            getCourtsUrl,
            JSON.stringify(reqData)
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