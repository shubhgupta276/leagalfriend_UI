import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from "@angular/core";
 import { AuthService } from '../../auth-shell/auth-shell.service';
// import { AuthService } from '../auth-shell.service';

import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
 import { TokenModel } from '../../shared/models/auth/token.model';

declare let $;


@Component({
  selector: "app-VerifyEmail",
  templateUrl: "./VerifyEmail.component.html",
  providers: [AuthService]

})
export class VerifyEmailComponent implements OnInit {

  _signup: any;
  isMailSent = false;
  message: string;
  isSuccess: boolean=true;
  public forgotPasswordForm: FormGroup;


  constructor(private fb: FormBuilder,
    private authService: AuthService) {

  }
  ngOnInit() {
this.verifyEmailPageLayout();
    this.verifyEmail();

  }

  verifyEmail() {
var isReferral;
const str1 = window.location.href.slice(window.location.href.indexOf('/'));
const str2 = 'verifyReferralEmail';
if (str1.indexOf(str2) !== -1) {
  isReferral = 'Y';
}
else{
  isReferral= 'N'
}
    var token = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
    //var password
    
    const tokenDetails = new TokenModel();
    tokenDetails.token = token;
    tokenDetails.isReferral = isReferral;
    //tokenDetails.password=


    this.authService.verifyemail(token,isReferral).subscribe(

      result => {
       
        if (result.body.successMessage === null) {
          this.message = result.body.failureReason;
          this.isSuccess = false;
        } else {
          this.message = result.body.successMessage;
          this.isSuccess = true;
        }
      },
      err => {
        console.log(err);
      });
  }

  getColor() {
    
    if (this.isSuccess) {
      return 'green';
    } else {
      return 'red';
    }
  }
  forgotPasswordRecovery(){}
  verifyEmailPageLayout(){
    $(window.document).ready(function () {
      if($(".login-page")[0]){
      }else{
        $("body").addClass("login-page");
      }
      if($(".skin-black")[0]){
        $("body").removeClass("skin-black");
      }
      if($(".sidebar-mini")[0]){
        $("body").removeClass("sidebar-mini");
      }
      if($(".hold-transition")[0]){
      }else{
        $("body").addClass("hold-transition");
      }
      if($(".login-box")[0]){
      }else{
        $("#wrapper_id").addClass("login-box");
      }
      if($(".wrapper")[0]){
        $("#wrapper_id").removeClass("wrapper");
      }
      if($(".register-box")[0]){
        $("#wrapper_id").removeClass("register-box");
      }
      if($(".register-page")[0]){
        $("body").removeClass("register-page");
      }
      $("body").removeAttr("style");
      $("#wrapper_id").removeAttr("style");
    });
  }
}