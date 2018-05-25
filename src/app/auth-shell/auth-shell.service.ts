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
import { login, resetPassword } from "./auth-shell.config";
import { signup } from "./auth-shell.config";
import { changepassword } from "./auth-shell.config";
import { forgot_password  } from "./auth-shell.config";
import { verifyEmail } from "./auth-shell.config";
import { LoginModel } from "../shared/models/auth/login.model";
import { UserModel } from "../shared/models/user/user.model";
import { SignUpModel } from "../shared/models/auth/signup.model";
import { TokenModel } from "../shared/models/auth/token.model";
import { ResetPassword } from "../shared/models/auth/resetpassword.model";
import { ChangePassword } from "../shared/models/auth/changepassword.model";
import { Branch } from '../shared/models/auth/case.model';
import { Recourse } from '../shared/models/auth/recourse.model';
import {EditCase} from '../shared/models/auth/editcase.model';
import {Calender} from '../shared/models/auth/calender.model';

@Injectable()
export class AuthService {
  constructor(public apiGateWay: ApiGateway) {
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
      'users/type',null
      
    );
  }
  signup(customerData: SignUpModel): Observable<SignUpModel> {
    debugger
    return this.apiGateWay.post<SignUpModel>(
      signup,
      JSON.stringify(customerData)
      
    );
    
  }

  verifyemail(token,isReferral): Observable<any> {
    return this.apiGateWay.post<any>(
      verifyEmail + '?token=' + token+'&isReferral='+ isReferral, null
    );
  }
  forgot_password(email): Observable<any> {
    
   return  this.apiGateWay.get<any>(
      forgot_password + '?email=' + email, null
    );
  
  }
  resetPassword(customerData: ResetPassword): Observable<ResetPassword> {
    return this.apiGateWay.post<ResetPassword>(
      resetPassword,
      JSON.stringify(customerData)
    );
  }
  changepassword(customerData: ChangePassword): Observable<ChangePassword> {
    
    return this.apiGateWay.post<ChangePassword>(
      'usermanagement/updatePassword',
      JSON.stringify(customerData)
    );
  }
  getBranchDDL(reqData): Observable<any> {    
    return this.apiGateWay.get<Branch>(
      'master/branches'+ '?email='+ reqData.email.replace('"',''), null,
      
    );
  }

  getCourtDDL(reqData): Observable<any> {    
    return this.apiGateWay.get<any>(
      'master/courts'+ '?email='+ reqData.email.replace('"',''), null,
      
    );
  }
  GetAllCity(reqData): Observable<any> {    
    return this.apiGateWay.get<any>(
      'master/cities'+ '?email='+ reqData.email.replace('"',''), null,
      
    );
  }

  bindStateDDL(reqData): Observable<any> {    
    return this.apiGateWay.get<any>(
      'master/states'+ '?email='+ reqData.email.replace('"',''), null,
      
    );
  }
  bindRecourseDDL(reqData): Observable<any> {    
    return this.apiGateWay.get<any>(
      'master/recourses'+ '?email='+ reqData.email.replace('"',''), null,
      
    );
  }
  bindStageDDL(reqData): Observable<any> {    
    return this.apiGateWay.get<Recourse>(
      'master/stages'+ '?email='+ reqData.email+ '&recourseId='+reqData.recourseId, null,
      
    );
  }

  submitEditCaseUser(customerData: EditCase): Observable<any> {
    
    return this.apiGateWay.post<any>(
      'case/add',customerData
      //JSON.stringify(customerData)
    );
    
  }
  updateEditCaseUser(customerData: EditCase): Observable<EditCase> {
    return this.apiGateWay.post<any>(
      'case/update',customerData
     // JSON.stringify(customerData)
    );
  }

  deleteCaseById(id): Observable<EditCase> {
    return this.apiGateWay.delete<any>(
      'case/case/file'+ '?caseFileId='+id,null,
      //JSON.stringify(id)
    );
  }
  downloadCaseFile(id): Observable<EditCase> {
    return this.apiGateWay.get<any>(
      '/case/file/download'+'?fileId='+id
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
      'case/compliance'+ '?caseComplianceId='+id,null,
     
    );
  }
  getCaseRunning(reqData): Observable<any> {    
    return this.apiGateWay.get<Recourse>(
      'case/caseList'+ '?userId='+ reqData.userId,null,
      
    );
  }

  getCaseByCaseId(reqData): Observable<any> {    
    return this.apiGateWay.get<Recourse>(
      'case/getCase'+ '?caseId='+ reqData.caseId,null,
      
    );
  }
  getCaseCompliance(reqData): Observable<any> {    
    return this.apiGateWay.get<Recourse>(
      'case/compliance'+ '?caseId='+ reqData.caseId,null,
      
    );
  }

  saveEvent(customerData: Calender): Observable<Calender> {
    return this.apiGateWay.post<Calender>(
      '/events/addEvent',
      JSON.stringify(customerData)
    );
  }

  getEvent(reqData): Observable<any> {    
    return this.apiGateWay.post<Recourse>(
      'events/eventList'+ '?userId='+ reqData.userId,null,
      
    );
  }
  getCompliances(reqData): Observable<any> {

    return this.apiGateWay.get<any>(
        
        'master/compliances'+ '?email='+ reqData.email.replace('"',''), null,
    );
}

  listUsers(reqData): Observable<any> {    
    return this.apiGateWay.get<Recourse>(
      'usermanagement/listusers'+ '?clientId='+ reqData.clientId,null,
      
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
  
  isLoggedIn(): boolean {
    if (localStorage.getItem("access_token"))
      return true;
    else
    
      return false;
  }

}
