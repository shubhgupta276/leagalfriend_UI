import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { State } from './state'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addStateUrl, updateStateUrl, getStatesUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class StateService {
    
    constructor(private apiGateWay: ApiGateway) {

    }

    getStates(reqData: any): Observable<any> {

        return this.apiGateWay.post<State>(
            getStatesUrl,
            JSON.stringify(reqData)
        );
    }

    addState(reqData: any): Observable<any> {

        return this.apiGateWay.post<State>(
            addStateUrl,
            JSON.stringify(reqData)
        );
    }

    updateState(reqData: any): Observable<any> {
        return this.apiGateWay.post<State>(
            updateStateUrl,
            JSON.stringify(reqData)
        );
    }
}