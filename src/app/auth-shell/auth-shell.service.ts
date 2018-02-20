import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  Http,
  Headers,
  RequestOptions,
  Response,
  URLSearchParams
} from "@angular/http";
import { ApiGateway } from "../shared/services/api-gateway";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
// const featureConfig = require('./auth-shell.config');
import { login } from "./auth-shell.config";
import { signup } from "./auth-shell.config";
import { forgot_password  } from "./auth-shell.config";
import { verifyEmail } from "./auth-shell.config";
import { LoginModel } from "../shared/models/auth/login.model";
import { UserModel } from "../shared/models/user/user.model";
import { SignUpModel } from "../shared/models/auth/signup.model";
import { TokenModel } from "../shared/models/auth/token.model";

@Injectable()
export class AuthService {
  constructor(public apiGateWay: ApiGateway) { }

  login(customerData: LoginModel): Observable<LoginModel> {
    return this.apiGateWay.post<LoginModel>(
      login,
      JSON.stringify(customerData)
    );
  }

  // setRemeberMe(email: string = '', remberMe: boolean = false): void {
  //     const remberedUser = { 'email': email, 'remberMe': remberMe };
  //     localStorage.setItem('remberedMe.user', JSON.stringify(remberedUser));
  // }

  signup(customerData: SignUpModel): Observable<SignUpModel> {
    return this.apiGateWay.post<SignUpModel>(
      signup,
      JSON.stringify(customerData)
    );
  }

  verifyemail(token): Observable<any> {
    return this.apiGateWay.post<any>(
      verifyEmail + '?token=' + token, null
    );
  }
  forgot_password(email): Observable<SignUpModel> {
    return this.apiGateWay.get<any>(
      forgot_password + '?email=' + email, null
    );
  }

  



  signOut(): void {
    // clear token remove user from local storage to log user out
    if (localStorage.getItem("access_token")) {
      localStorage.removeItem("access_token");
    }
    if (localStorage.getItem("refresh_token")) {
      localStorage.removeItem("refresh_token");
    }
  }


}
