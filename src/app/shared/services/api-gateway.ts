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
import { endpoint_url } from '../shared-config';

@Injectable()
export class ApiGateway {
    _endPointUrl: string;

    constructor(private _httpClient: HttpClient) {
        this._endPointUrl = endpoint_url;
    };

    public post<T>(apiPath: string, body): Observable<any> {
        console.log(apiPath);
        const _url: string = this.createApiUrl(apiPath);
        return this._httpClient.post<T>(_url, body, { observe: 'response' })
            .catch(initialError => {
                return Observable.throw(initialError);
            });
    }
    public put<T>(apiPath: string, body): Observable<any> {
        console.log(apiPath);
        const _url: string = this.createApiUrl(apiPath);
        return this._httpClient.put<T>(_url, body, { observe: 'response' })
            .catch(initialError => {
                return Observable.throw(initialError);
            });
    }

    public postWithParam<T>(apiPath: string, urlParam): Observable<any> {
        console.log(apiPath);
        const _url: string = this.createApiUrl(apiPath);
        return this._httpClient.post<T>(_url+urlParam, { observe: 'response' })
            .catch(initialError => {
                return Observable.throw(initialError);
            });
    }

    public get<T>(apiPath: string, params?: Object, headers?: string): Observable<T> {
        const _url: string = this.createApiUrl(apiPath);
        const urlParams = new URLSearchParams();
        const options: Object = {
            params: urlParams
        };
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key];
                urlParams.set(key, value);
            }
        }
        return this._httpClient.get<T>(_url, options)
            .catch(initialError => {
                return Observable.throw(initialError);
            });
    }

    public delete<T>(apiPath: string, params?: Object, headers?: string): Observable<any> {
        console.log(apiPath);
        const _url: string = this.createApiUrl(apiPath);
        const urlParams = new URLSearchParams();
        const options: Object = {
            params: urlParams
        };
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key];
                urlParams.set(key, value);
            }
        }
        return this._httpClient.delete<T>(_url, options)
            .catch(initialError => {
                return Observable.throw(initialError);
            });
    }

    private createApiUrl(apiPath: string) {
        return this._endPointUrl + '/' + apiPath;
    }
}