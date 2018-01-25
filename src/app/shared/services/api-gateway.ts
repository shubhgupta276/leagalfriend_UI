import { Injectable, Injector, } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod, RequestOptionsArgs, Request, Response } from '@angular/http';
import { Router } from '@angular/router';
import {
    HttpClient,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
    HttpErrorResponse,
    HttpParams
} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';
// import { Config } from './environment-config';
// import { LoaderService } from '../spinner/loader/loader.service';
const featureConfig = require('../../feature-shell/administration/user-management/user-management-config');
// import { Storage } from '../../shared/services/storage-provider';
// import { CommonService } from "./common.service";

@Injectable()
export class ApiGateway{
    constructor(private _httpClient:HttpClient){};

    public post<T>(apiPath: string, body): Observable<any>{
        const _url: string = apiPath;
        return this._httpClient.post<T>(_url, body, { observe: 'response' });
    }
}