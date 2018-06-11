import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Branch } from './branch'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addBranchUrl, updateBranchUrl, getBranchesUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';
@Injectable()
export class BranchService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getBranches(): Observable<any> {
        return this.apiGateWay.get<Branch>(
            getBranchesUrl + "?userId=" + this._storageService.getUserId()
        );
    }

    addBranch(reqData: any): Observable<any> {

        return this.apiGateWay.post<Branch>(
            addBranchUrl,
            JSON.stringify(reqData)
        );
    }

    updateBranch(reqData: any): Observable<any> {
        return this.apiGateWay.post<Branch>(
            updateBranchUrl,
            JSON.stringify(reqData)
        );
    }
}