import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiGateway } from '../shared/services/api-gateway';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
// const featureConfig = require('./auth-shell.config');
import { login } from './auth-shell.config';
import { signup } from './auth-shell.config';
import { LoginModel } from '../shared/models/auth/login.model';
import { UserModel } from '../shared/models/user/user.model';

@Injectable()
export class AuthService{

    constructor(public apiGateWay: ApiGateway) { }

    login(customerData: LoginModel): Observable<LoginModel> {
        return this.apiGateWay.post<LoginModel>(login, JSON.stringify(customerData));
      }

    // setRemeberMe(email: string = '', remberMe: boolean = false): void {
    //     const remberedUser = { 'email': email, 'remberMe': remberMe };
    //     localStorage.setItem('remberedMe.user', JSON.stringify(remberedUser));
    // }

    signup(customerData: UserModel): Observable<UserModel> {
        return this.apiGateWay.post<UserModel>(signup, JSON.stringify(customerData));
      }
}