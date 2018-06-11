import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Recourse } from './Recourse'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addRecourseUrl, updateRecourseUrl, getRecoursesUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';
@Injectable()
export class RecourseService {
    
    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getResources(): Observable<any> {
       
        return this.apiGateWay.get<Recourse>(
            getRecoursesUrl+ "?userId=" + this._storageService.getUserId()
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