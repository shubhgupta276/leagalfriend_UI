import { Injectable, Injector, } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod, RequestOptionsArgs, Request, Response, ResponseContentType } from '@angular/http';
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
import { TokenService } from './token-service';

@Injectable()
export class ApiGateway {
    _endPointUrl: string;
    constructor(private _httpClient: HttpClient, private _http: Http, private auth: TokenService) {
        this._endPointUrl = endpoint_url;
    };

    public post<T>(apiPath: string, body): Observable<any> {
        const _url: string = this.createApiUrl(apiPath);
        return this._httpClient.post<T>(_url, body, { observe: 'response' })
            .catch(initialError => {
                return Observable.throw(initialError);
            });
    }
    public put<T>(apiPath: string, body): Observable<any> {
        const _url: string = this.createApiUrl(apiPath);
        return this._httpClient.put<T>(_url, body, { observe: 'response' })
            .catch(initialError => {
                return Observable.throw(initialError);
            });
    }
    public postWithParam<T>(apiPath: string, urlParam): Observable<any> {
        const _url: string = this.createApiUrl(apiPath);
        return this._httpClient.post<T>(_url + urlParam, { observe: 'response' })
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

    public getFile(apiPath: string): Observable<any> {

        let myHeaders = new Headers();
        const authHeader = this.auth.getAuthorizationHeader();
        myHeaders.append('Authorization', authHeader.access_token.toString());
        myHeaders.append('customer-id', authHeader.client_id.toString());

        let options = new RequestOptions({ headers: myHeaders, responseType: ResponseContentType.Blob });

        const _url: string = this.createApiUrl(apiPath);

        return this._http.get(_url, options)
            .map((response: Response) => <Blob>response.blob());

        // return this._httpClient.get(_url, )
        //     .map((response: Response) => <Blob>response.blob());
    }
    public postFile(apiPath: string, data: any): Observable<any> {

        let myHeaders = new Headers();
        const authHeader = this.auth.getAuthorizationHeader();
        myHeaders.append('Authorization', authHeader.access_token.toString());
        myHeaders.append('customer-id', authHeader.client_id.toString());

        let options = new RequestOptions({ headers: myHeaders, responseType: ResponseContentType.Blob });

        const _url: string = this.createApiUrl(apiPath);

        return this._http.post(_url, data, options)
            .map((response: Response) => <Blob>response.blob());

        // return this._httpClient.get(_url, )
        //     .map((response: Response) => <Blob>response.blob());
    }
    public delete<T>(apiPath: string, params?: Object, headers?: string): Observable<any> {
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