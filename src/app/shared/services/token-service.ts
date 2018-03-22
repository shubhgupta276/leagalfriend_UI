import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiGateway } from './api-gateway';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AuthHeaderModel } from '../models/auth/auth-header.model';

@Injectable()
export class TokenService {
    public client: any;
    public user: any;
    public login: any;

    constructor() { }

    getAuthorizationHeader(): AuthHeaderModel {
        const model = new AuthHeaderModel();
        
        model.access_token = localStorage.getItem('access_token');
        model.client_id = localStorage.getItem('client_id');
        return model;
    }

}
