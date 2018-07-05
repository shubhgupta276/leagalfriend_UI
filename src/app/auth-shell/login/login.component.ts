import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
import { SharedService } from '../../shared/services/shared.service';

declare let $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, SharedService]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  emailValidationMessage: string = 'Email address is required.';
  public _login: any;
  isLoggedInError = false;
  public submitted: boolean;
  public events: any[] = [];
  Customer: any = [];
  errLoginMsg = '';
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private sharedService: SharedService) {
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
        if (e !== '') {
          this.loginForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = 'Email format is not correct.';
        } else {
          this.loginForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = 'Email address is required.';
        }
      }
    );
  }

  loginPageLayout() {
    $(window.document).ready(function () {
      if ($('.login-page')[0]) {
      } else {
        $('body').addClass('login-page');
      }
      if ($('.skin-black')[0]) {
        $('body').removeClass('skin-black');
      }
      if ($('.sidebar-mini')[0]) {
        $('body').removeClass('sidebar-mini');
      }
      if ($('.hold-transition')[0]) {
      } else {
        $('body').addClass('hold-transition');
      }
      if ($('.login-box')[0]) {
      } else {
        $('#wrapper_id').addClass('login-box');
      }
      if ($('.wrapper')[0]) {
        $('#wrapper_id').removeClass('wrapper');
      }
      if ($('.register-box')[0]) {
        $('#wrapper_id').removeClass('register-box');
      }
      if ($('.register-page')[0]) {
        $('body').removeClass('register-page');
      }
      $('body').removeAttr('style');
      $('#wrapper_id').removeAttr('style');
    });
  }

  register(): void {
    this.router.navigate(['signup']);
  }

  forgotPassword() { }

  // getCustomer(a) {
  //   if (a.length > 0) {
  //     this.Customer = [];
  //     const $this = this;
  //     this.authService.checkUserClient(a).subscribe(
  //       result => {
  //         result.forEach(value => {
  //           $this.Customer.push(value);
  //         });
  //       });
  //   }

  // }

  setUserRole(data) {
    const userRole = data.roles[0].roleName;
    let customerType = '';
    if (data.customerType) {
      customerType = '_' + data.customerType['name'];
    }
    let userType = '';
    if (data.userType) {
      userType = '_' + data.userType['name'];
    }
    const permission = userRole + customerType + userType;
    localStorage.setItem('permission_level', permission);
  }

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
          const client = '?userId=' + localStorage.getItem('client_id');
          // localStorage.setItem('permission_level', 'ADMIN_LAWYER');
          // const permission = localStorage.getItem('permission_level');
          // console.log(permission);
          // this.router.navigateByUrl('admin/dashboard');
          this.authService.getUser(client).subscribe(
            userDetails => {
              if (userDetails) {
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                this.setUserRole(userDetails);
                const permission = localStorage.getItem('permission_level');
                console.log(permission);
                // if (permission === 'CLIENT_LAWYER' || permission === 'CLIENT_LAWYER_FIRM_Individual') {
                if (permission === 'CLIENT_Individual') {
                  this.router.navigate(['admin/case']);
                } else if (permission === 'CLIENT_Institutional') {
                  this.router.navigate(['admin/institution']);
                } else {
                  this.router.navigate(['admin/calendar']);
                }
              }
            },
            error => {
              console.log(error);
            }
          );
          this.isLoggedInError = false;
        } else {
          this.errLoginMsg = 'Your account has been suspended please contact your administrator.';
          this.isLoggedInError = false;
        }
      },
      err => {
        this.errLoginMsg = 'Invalid username or password';
        this.isLoggedInError = true;
        console.log(err);
      });
  }
}
