import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Recourse } from './Recourse'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addRecourseUrl, updateRecourseUrl, getRecoursesUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class RecourseService {
    
    constructor(private apiGateWay: ApiGateway) {

    }

    getResources(reqData: any): Observable<any> {

        return this.apiGateWay.post<Recourse>(
            getRecoursesUrl,
            JSON.stringify(reqData)
        );
    }

    addResource(reqData: any): Observable<any> {

        return this.apiGateWay.post<Recourse>(
            addRecourseUrl,
            JSON.stringify(reqData)
        );
    }

    updateResource(reqData: any): Observable<any> {
        return this.apiGateWay.post<Recourse>(
            updateRecourseUrl,
            JSON.stringify(reqData)
        );
    }
}