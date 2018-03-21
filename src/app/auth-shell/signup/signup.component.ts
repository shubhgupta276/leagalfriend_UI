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
import { SignUpModel, LoginCredential, Roles } from '../../shared/models/auth/signup.model';
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
  zipValidationMessage = 'Postal/Zip Code is required.';
  mobileNoValidationMessage = 'Mobile number is required.';
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
          this.emailValidationMessage = 'Email format is not correct.';
        } else {
          this.emailValidationMessage = 'Email address is required.';
        }
      }
    );

    this.signupForm.get('password').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.passwordValidationMessage = 'Password must use a combination' +
            ' of these: Atleast 1 upper case letters (A – Z),' +
            ' one lower case letters (a – z)' +
            ' one number (0 – 9)' +
            ' one special symbol (e.g. ‘!@#\$%\^&\’)' +
            ' and minimum length should be 8 characters.';
        } else {
          this.passwordValidationMessage = 'Password is required.';
        }
      }
    );

    this.signupForm.get('postalCode').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.zipValidationMessage = 'Postal/Zip Code length is less then 4';
        } else {
          this.zipValidationMessage = 'Postal/Zip Code is required';
        }
      }
    );

    this.signupForm.get('mobileNumber').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.mobileNoValidationMessage = 'Mobile number length is less then 10';
        } else {
          this.mobileNoValidationMessage = 'Mobile number is required.';
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
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/)])],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator('password')])],
      mobileNumber: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      role: [1],
      status: [1],
      termsAndCondition: [false, Validators.pattern('true')]
    });
  }

  registerUser(data) {

    const signUpDetails = new SignUpModel();
    signUpDetails.email = data.email;
    signUpDetails.organization = data.organisation;
    signUpDetails.password = data.password;
    signUpDetails.firstName = data.firstName;
    signUpDetails.lastName = data.lastName;



    // signUpDetails.address1 = data.address1;

    signUpDetails.status = {
      statusId: 1,
    };

    signUpDetails.roles = [{
      id: 1,

    }];

    signUpDetails.login = {
      userLoginId: data.email,
      password: data.password
    };


    signUpDetails.isClient = 1;

    // const testData = {
    //   "email": "puneet.kumar@globallogic.com",
    //   "organization": "gl",
    //   "password": "Global@123",
    //   "firstName": "Puneet", "lastName": "Kumar",
    //   "status": {
    //     "statusId": 1
    //   },
    //   "roles": [{
    //     "id": 1
    //   }],
    //   "login": {
    //     "userLoginId": "anup.debey1@globallogic.com",
    //     "password": "Global@123"
    //   },
    //   "isClient": 1
    // }

    this.authService.signup(signUpDetails).subscribe(

      result => {
        debugger;
        console.log(result);
        this._signup = result;
        this.isMailSent = true;
        // this.router.navigate(['/']);
      },
      err => {
        console.log(err);
      });
    debugger
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }



}

