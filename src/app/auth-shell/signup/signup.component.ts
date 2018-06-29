import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../shared/Utility/util-common';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import {Subscription} from 'rxjs';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import {Http} from '@angular/http';
import { UserModel } from '../../shared/models/user/user.model';
import { SignUpModel, LoginCredential, Roles,Address,CustomerType } from '../../shared/models/auth/signup.model';
import { AuthService } from '../auth-shell.service';
import { validateConfig } from '@angular/router/src/config';
import { CHECKBOX_REQUIRED_VALIDATOR } from '@angular/forms/src/directives/validators';
import { parse } from 'url';

declare let $;
declare let subscriptionId;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})

export class SignupComponent implements OnInit {
  //busy: Promise<any>;
  busy: Subscription;
  public loading = false;
  signupForm: FormGroup;
  public _signup: any;
  Roles: KeyValue[] = UserRoles;
  Status: KeyValue[] = UserStatus;
  emailValidationMessage = 'Email address is required.';
  passwordValidationMessage = 'Password is required.';
  zipValidationMessage = 'Postal/Zip Code is required.';
  mobileNoValidationMessage = 'Mobile number is required.';
  public isMailSent = false;
  Subscription:any=[];
  UserType:any=[];
subscriptionId:number;
  constructor(private http: Http,private router: Router, private fb: FormBuilder, private _httpClient: HttpClient,
    private authService: AuthService,private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.subscriptionId = params['subscription'];
       
      });
    this.createSignup( this.subscriptionId);
   
  }
  ngOnInit() {
    
   this.getUserSubscription();
   this.getusersType();
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

  createSignup(subscriptionId) {
    
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
     // status: [1],
      subscription:[parseInt(subscriptionId), Validators.required],
      termsAndCondition: [false, Validators.pattern('true')]
    });
  }


  getUserSubscription()
  {
    
    var $this=this;
    this.authService.getUserSubscription().subscribe(

      result => {
        
      result.forEach(function(value)
      {
        
      
        $this.Subscription.push(value);
      });
      },
      err => {
        alert(err)
        console.log(err);
      });
  }
  getusersType()
  {
    var $this=this;
    this.authService.getusersType().subscribe(

      result => {
        
      result.forEach(function(value)
      {
        
      
        $this.UserType.push(value);
      });
      },
      err => {
        console.log(err);
      });
  }
  registerUser(data) {
    this.loading = true;
    const signUpDetails = new SignUpModel();
    {
      signUpDetails.address= {
        address1: data.addressLine1,
        address2: data.addressLine2,
        city: "test",
        state: "UP",
        zipCode: "201301"
      },
      //signUpDetails.clientId=1;
    signUpDetails.email = data.email;
    signUpDetails.firstName = data.firstName;
    signUpDetails.isClient = 1;
    signUpDetails.lastName = data.lastName;
    signUpDetails.login = {
      userLoginId: data.email,
      password: data.password
    };
    signUpDetails.mobileNumber=data.mobileNumber;
    signUpDetails.organization = data.organisation;
    signUpDetails.password = data.password;
  
  
    signUpDetails.status = {
      statusId: 1,
    };
    signUpDetails.subscriptionId=data.subscription;
    
    signUpDetails.customerType = {
      id: data.role,

    };

    this.authService.signup(signUpDetails).subscribe(

      result => {
        
        if(result.body.httpCode==200)
        {
          this.loading = false;
          this._signup = result;
          this.isMailSent = true;
         $('#registermsg').hide();
        }
        else
        {
          this.loading = false;
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
       
      },
      err => {
        console.log(err);
        this.loading = false;
      });
    
  }
}


  redirectToLogin() {
    this.router.navigate(['login']);
  }



}

