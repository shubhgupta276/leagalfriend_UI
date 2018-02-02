import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiGateway } from '../../shared/services/api-gateway';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { addUser } from './user.config';
import { UserModel } from '../../shared/models/user/user.model';

@Injectable()
export class UserService{

    constructor(public apiGateWay: ApiGateway) { }

    addNewUser(customerData: UserModel): Observable<UserModel> {
        return this.apiGateWay.post<UserModel>(addUser, JSON.stringify(customerData));
      }
}