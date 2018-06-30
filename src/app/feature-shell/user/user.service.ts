import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiGateway } from '../../shared/services/api-gateway';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { addUser, editUser, listUsers, listRoles, listStatus, getUser } from './user.config';
import { UserModel } from '../../shared/models/user/user.model';
import { RoleModel } from '../../shared/models/auth/role.model';
import { StatusModel } from '../../shared/models/auth/status.model';
import { ChangePassword } from "../../shared/models/auth/changepassword.model";

@Injectable()
export class UserService {

    constructor(public apiGateWay: ApiGateway) { }

    addNewUser(userData: UserModel): Observable<any> {
        return this.apiGateWay.post<UserModel>(addUser, JSON.stringify(userData));
    }

    editUser(userData: UserModel): Observable<any> {
        return this.apiGateWay.post<UserModel>(editUser, JSON.stringify(userData));
    }

    listUsers(client: string): Observable<any> {
        return this.apiGateWay.get<any>(listUsers + client);
    }

    listRoles(): Observable<RoleModel[]> {
        return this.apiGateWay.get<RoleModel[]>(listRoles);
    }

    listStatus(): Observable<StatusModel[]> {
        return this.apiGateWay.get<StatusModel[]>(listStatus);
    }
    getUser(userId: string): Observable<UserModel> {
        return this.apiGateWay.get<UserModel>(getUser + userId);
    }
    changepassword(customerData: ChangePassword): Observable<any> {

        return this.apiGateWay.post<ChangePassword>(
          'usermanagement/changePassword',
          JSON.stringify(customerData)
        );
      }
}
