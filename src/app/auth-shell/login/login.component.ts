import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { UserRoles, UserStatus, KeyValue } from '../../shared/Utility/util-common';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { LoginModel } from '../../shared/models/auth/login.model';
import { AuthService } from '../auth-shell.service';

declare let $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  emailValidationMessage: string = "Email address is required.";
  public _login: any;
  isLoggedInError=false;
  public submitted: boolean;
  public events: any[] = [];
  errLoginMsg="";
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      isRemember: []
    });
  }
  ngOnInit() {
    this.loginPageLayout();
    this.loginForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e != "") {
          this.loginForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = "Email format is not correct.";
        } else {
          this.loginForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = "Email address is required.";
        }
      }
    )
  }

  loginPageLayout() {
    $(window.document).ready(function () {
      if ($(".login-page")[0]) {
      } else {
        $("body").addClass("login-page");
      }
      if ($(".skin-black")[0]) {
        $("body").removeClass("skin-black");
      }
      if ($(".sidebar-mini")[0]) {
        $("body").removeClass("sidebar-mini");
      }
      if ($(".hold-transition")[0]) {
      } else {
        $("body").addClass("hold-transition");
      }
      if ($(".login-box")[0]) {
      } else {
        $("#wrapper_id").addClass("login-box");
      }
      if ($(".wrapper")[0]) {
        $("#wrapper_id").removeClass("wrapper");
      }
      if ($(".register-box")[0]) {
        $("#wrapper_id").removeClass("register-box");
      }
      if ($(".register-page")[0]) {
        $("body").removeClass("register-page");
      }
      $("body").removeAttr("style");
      $("#wrapper_id").removeAttr("style");
    });
  }

  register(): void {
    this.router.navigate(['signup']);
  }

  forgotPassword(){}

  login(data) {
    const loginDetails = new LoginModel();
    loginDetails.username = data.email;
    loginDetails.password = data.password;
    this.authService.login(loginDetails).subscribe(
      result => {        
        this._login = result;
        const accessToken = this._login.body.token;
        const clientId = this._login.body.clientId;
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('client_id', clientId);
          localStorage.setItem('user_id', data.email);
          this.router.navigate(['admin/dashboard']);
          this.isLoggedInError=false;
        }
        else
        {
          this.errLoginMsg="Your account has been suspended please contact your administrator.";
          this.isLoggedInError=true;
        }
      },
      err => {
        this.errLoginMsg="Invalid username or password";
        this.isLoggedInError=true;
        console.log(err);
      });
  }
}
