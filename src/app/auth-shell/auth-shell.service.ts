import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  Http,
  Headers,
  RequestOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import { ApiGateway } from '../shared/services/api-gateway';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
// const featureConfig = require('./auth-shell.config');
import { login, resetPassword, getUser } from "./auth-shell.config";
import { signup } from "./auth-shell.config";
import { changepassword } from "./auth-shell.config";
import { forgot_password } from "./auth-shell.config";
import { verifyEmail } from "./auth-shell.config";
import { LoginModel } from "../shared/models/auth/login.model";
import { UserModel } from "../shared/models/user/user.model";
import { SignUpModel } from "../shared/models/auth/signup.model";
import { TokenModel } from "../shared/models/auth/token.model";
import { ResetPassword } from "../shared/models/auth/resetpassword.model";
import { ChangePassword } from "../shared/models/auth/changepassword.model";
import { Branch } from '../shared/models/auth/case.model';
import { Recourse } from '../shared/models/auth/recourse.model';
import { EditCase } from '../shared/models/auth/editcase.model';
import { Calender } from '../shared/models/auth/calender.model';
import { StorageService } from "../shared/services/storage.service";

@Injectable()
export class AuthService {
  constructor(public apiGateWay: ApiGateway, private _storageService: StorageService) {
    window.addEventListener('storage', function (event) {
      if (event.key == 'access_token') {
        window.location.href = "/login";
      }
    });
  }




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
  getUserSubscription(): Observable<any> {
    return this.apiGateWay.get<any>('users/subscription');
  }
  getusersType(): Observable<any> {
    return this.apiGateWay.get<any>(
      'users/type', null

    );
  }
  signup(customerData: SignUpModel): Observable<any> {
    return this.apiGateWay.post<SignUpModel>(
      signup,
      JSON.stringify(customerData)

    );

  }
  checkUserClient(email): Observable<any> {

    return this.apiGateWay.get<any>(
      'users/client' + '?email=' + email, null
    );
  }
  verifyemail(token, isReferral): Observable<any> {
    return this.apiGateWay.post<any>(
      verifyEmail + '?token=' + token + '&isReferral=' + isReferral, null
    );
  }
  forgot_password(email): Observable<any> {

    return this.apiGateWay.get<any>(
      forgot_password + '?email=' + email, null
    );

  }
  resetPassword(customerData: ResetPassword): Observable<ResetPassword> {
    return this.apiGateWay.post<ResetPassword>(
      resetPassword,
      JSON.stringify(customerData)
    );
  }
  changepassword(customerData: ChangePassword): Observable<any> {

    return this.apiGateWay.post<ChangePassword>(
      'usermanagement/updatePassword',
      JSON.stringify(customerData)
    );
  }
  verifyUser(token, isReferral, password): Observable<any> {
    return this.apiGateWay.post<any>(
      'users/verifyUser' + '?token=' + token + '&isReferral=' + isReferral + '&password=' + password, null
    );
  }
  getBranchDDL(reqData): Observable<any> {
    return this.apiGateWay.get<Branch>(
      'master/branches' + '?userId=' + this._storageService.getUserId(), null,

    );
  }

  getInstitution(): Observable<any> {
    return this.apiGateWay.get<any>(
      'master/institutions' + '?userId=' + this._storageService.getUserId(), null,

    );
  }

  getCourtDDL(reqData): Observable<any> {
    return this.apiGateWay.get<any>(
      'master/courts' + '?userId=' + this._storageService.getUserId(), null,

    );
  }

  bindStateDDL(reqData): Observable<any> {
    return this.apiGateWay.get<any>(
      'master/states' + '?userId=' + this._storageService.getUserId(), null,

    );
  }
  bindRecourseDDL(reqData): Observable<any> {
    return this.apiGateWay.get<any>(
      'master/recourses' + '?userId=' + this._storageService.getUserId(), null,

    );
  }
  getResources(): Observable<any> {

    return this.apiGateWay.get<Recourse>(
      'master/recourses' + "?userId=" + this._storageService.getUserId()
    );
  }
  bindStageDDL(recourseId): Observable<any> {
    return this.apiGateWay.get<Recourse>(
      'master/recourse/stage' + '?userId=' + this._storageService.getUserId() + '&recourseId=' + recourseId, null,

    );
  }

  submitEditCaseUser(customerData: any): Observable<any> {
    return this.apiGateWay.post<any>(
      'case/add', customerData
      //JSON.stringify(customerData)
    );
  }
  updateEditCaseUser(customerData: any): Observable<EditCase> {
    return this.apiGateWay.post<EditCase>(
      'case/update', customerData
      // JSON.stringify(customerData)
    );
  }
  deleteCaseById(id): Observable<EditCase> {
    return this.apiGateWay.delete<any>(
      'case/file' + '?caseFileId=' + id, null,
    );
  }

  downloadFile(fileId: any): Observable<File> {
    return this.apiGateWay.getFile(
      '/case/file/download' + "?fileId=" + fileId
    );
  }
  updateCaseHearingDate(customerData: any): Observable<any> {
    return this.apiGateWay.put<any>(
      '/case/hearing',
      JSON.stringify(customerData)
    );
  }
  caseUpdateCompliance(customerData: any): Observable<EditCase> {
    return this.apiGateWay.post<any>(
      'case/update/compliance',
      JSON.stringify(customerData)
    );
  }

  closeCase(id): Observable<any> {
    return this.apiGateWay.put<any>(
      'case/compliance' + '?caseComplianceId=' + id, null,

    );
  }
  getCaseRunning(reqData): Observable<any> {
    return this.apiGateWay.get<Recourse>(
      'case/caseList' + '?userId=' + reqData.userId + '&branchId=' + reqData.branchId, null,

    );
  }

  getCaseByCaseId(reqData): Observable<any> {
    return this.apiGateWay.get<Recourse>(
      'case/getCase' + '?caseId=' + reqData.caseId, null,

    );
  }
  getCaseCompliance(reqData): Observable<any> {
    return this.apiGateWay.get<Recourse>(
      'case/compliance' + '?caseId=' + reqData.caseId, null,

    );
  }
  GetAllCity(reqData): Observable<any> {
    return this.apiGateWay.get<any>(
      'master/cities' + '?userId=' + this._storageService.getUserId(), null,

    );
  }

  getCompliances(reqData): Observable<any> {

    return this.apiGateWay.get<any>(

      'master/compliances' + '?userId=' + this._storageService.getUserId(), null,
    );
  }

  listUsers(reqData): Observable<any> {
    return this.apiGateWay.get<Recourse>(
      'usermanagement/employees' + '?userId=' + reqData.userId, null,

    );
  }
  listManager(reqData): Observable<any> {

    return this.apiGateWay.get<Recourse>(
      'usermanagement/managers' + '?userId=' + reqData.userId, null,

    );
  }
  listCustomers(reqData, isInstitutional): Observable<any> {
    return this.apiGateWay.get<Recourse>(
      'usermanagement/customers' + '?userId=' + reqData.userId + '&isInstitutional=' + isInstitutional, null,

    );
  }

  getUser(userId: string): Observable<any> {
    return this.apiGateWay.get<any>(getUser + userId);
  }




  signOut(): void {
    // this._storageService.setBranchData(null);
    // // clear token remove user from local storage to log user out
    // if (localStorage.getItem("access_token")) {
    //   localStorage.removeItem("access_token");
    // }
    // if (localStorage.getItem("refresh_token")) {
    //   localStorage.removeItem("refresh_token");
    // }
    localStorage.clear();
    localStorage.setItem('is_signed_out', 'yes');
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('access_token'))
      return true;
    else

      return false;
  }

}
