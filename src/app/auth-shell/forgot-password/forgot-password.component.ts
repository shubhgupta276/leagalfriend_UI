import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import { Console } from '@angular/core/src/console';
import { SignUpModel } from '../../shared/models/auth/signup.model';
import { AuthService } from '../auth-shell.service';

declare let $;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService]
})

export class ForgotPasswordComponent implements OnInit {
  public _signup: any;
  public forgotPasswordForm: FormGroup;
  public isMailSent: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService ) {    
    this.forgotPasswordForm = fb.group({
      email: [null, Validators.required]    
  });
}

  ngOnInit() {
    this.forgotPasswordPageLayout();

    this.forgotPasswordForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e != "") {
          this.forgotPasswordForm.get('email').setValidators([Validators.email]);
         } else {
          this.forgotPasswordForm.get('email').setValidators([Validators.required]);
         }
      }
    )
  }

   forgotPasswordRecovery(data){
 
 var email=data.email;
     const signUpDetails = new SignUpModel();
     signUpDetails.email=data.email;
     this.authService.forgot_password(email).subscribe(
     result => {
       console.log(result);
       this._signup = result;
       this.isMailSent = true;
       // this.router.navigate(['/']);
     },
     err => {
       console.log(err);
     });
   }

   redirectToLogin()
   {
    this.router.navigate(['login']);
   }
   
  forgotPasswordPageLayout(){
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
