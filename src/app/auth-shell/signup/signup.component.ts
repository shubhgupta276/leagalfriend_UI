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
  emailValidationMessage: string = "Email address is required.";
  public isMailSent: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private _httpClient: HttpClient,
    private authService: AuthService) {
    this.createSignup();
  }

  ngOnInit() {
    this.signupPageLayout();
    this.signupForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e != "") {
          this.signupForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = "Email format is not correct.";
        } else {
          this.signupForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = "Email address is required.";
        }
      }
    )
  }

  signupPageLayout() {
    $(window.document).ready(function () {
      $("body").addClass("register-page");
      $("body").removeClass("skin-black");
      $("body").removeClass("sidebar-mini");
      $("body").addClass("hold-transition");
      $("body").removeAttr("style");
      $("#wrapper_id").removeClass("wrapper").addClass("register-box");
      $("#wrapper_id").removeAttr("style");

    });
  }

  createSignup() {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      organisation: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: [null, Validators.required],
      postalCode: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator("password")])],
      mobileNumber: [null, Validators.required],
      role: [1],
      status: [1]
    });
  }

  registerUser(data) {
    debugger;
    const signUpDetails = new UserModel();
    signUpDetails.firstName = data.firstName;
    signUpDetails.lastName = data.lastName;
    signUpDetails.email = data.email;
    signUpDetails.organization = data.organisation;
    signUpDetails.password = data.password;
    signUpDetails.isClient = 1;
    this.authService.signup(signUpDetails).subscribe(
      result => {
        debugger;
        console.log(result);
        this._signup = result;
        this.isMailSent=true;
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
      });
  }

  redirectToLogin()
  {
    this.router.navigate(['login']);
  }

}

