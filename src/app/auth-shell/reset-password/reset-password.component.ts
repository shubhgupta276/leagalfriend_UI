import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import { Console } from '@angular/core/src/console';

declare let $;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {    
     this.resetPasswordForm = fb.group({
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator("newPassword")])],   
  });
  }
  ngOnInit() {
    this.resetPasswordPageLayout();
  }

   resetPassword(data){
       
     if(data.newPassword!="" && data.newPassword ==data.confirmPassword)
     this.router.navigate(['login']);
   }
   
  resetPasswordPageLayout(){
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
