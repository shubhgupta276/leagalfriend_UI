import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../shared/Utility/util-common';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { UserModel } from '../../shared/models/user/user.model';
import { AuthService } from '../auth-shell.service';
import { validateConfig } from '@angular/router/src/config';
import { CHECKBOX_REQUIRED_VALIDATOR } from '@angular/forms/src/directives/validators';

declare let $;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  public _signup: any;
  Roles: KeyValue[] = UserRoles;
  Status: KeyValue[] = UserStatus;
  emailValidationMessage = 'Email address is required.';
  passwordValidationMessage = 'Password is required.';
  public isMailSent = false;

  constructor(private router: Router, private fb: FormBuilder, private _httpClient: HttpClient,
    private authService: AuthService) {
    this.createSignup();
  }

  ngOnInit() {
    this.signupPageLayout();
    this.signupForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.signupForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = 'Email format is not correct.';
        } else {
          this.signupForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = 'Email address is required.';
        }
      }
    );

    this.signupForm.get('password').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.signupForm.get('password')
          .setValidators([Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/)]);
          this.passwordValidationMessage = 'Password must use a combination' +
          ' of these: Atleast 1 upper case letters (A – Z),' +
          ' one lower case letters (a – z)' +
          ' one number (0 – 9)' +
          ' one special symbol (e.g. ‘!@#\$%\^&\’)' +
          ' and minimum length should be 8 charector.';
        } else {
          this.signupForm.get('password').setValidators([Validators.required]);
          this.passwordValidationMessage = 'Password is required.';
        }
      }
    );
  }

  signupPageLayout() {
    $(window.document).ready(function () {
      $('body').addClass('register-page');
      $('body').removeClass('skin-black');
      $('body').removeClass('sidebar-mini');
      $('body').addClass('hold-transition');
      $('body').removeAttr('style');
      $('#wrapper_id').removeClass('wrapper').addClass('register-box');
      $('#wrapper_id').removeAttr('style');

    });
  }

  createSignup() {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      organisation: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: [null, Validators.required],
      postalCode: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator('password')])],
      mobileNumber: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      role: [1],
      status: [1],
      termsAndCondition: [false, Validators.pattern('true')]
    });
  }

  registerUser(data) {
    this.isMailSent = true;
    // this.router.navigate(['/']);
    const signUpDetails = new UserModel();
    signUpDetails.firstName = data.firstName;
    signUpDetails.lastName = data.lastName;
    signUpDetails.email = data.email;
    signUpDetails.isClient = 1;
    // signUpDetails.login.userLoginId = data.email;
    // this.authService.signup(signUpDetails).subscribe(
    //   result => {
    //     debugger;
    //     console.log(result);
    //     this._signup = result;
    //     // const accessToken = this._login.body.token;
    //     // const clientId = this._login.body.clientId;
    //     // if (accessToken) {
    //     //   localStorage.setItem('access_token', accessToken);
    //     //   localStorage.setItem('client_id', clientId);
    //     //   this.router.navigate(['admin']);
    //     // }

    //     // for show mail sent message


    //   },
    //   err => {
    //     console.log(err);
    //   });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

}

