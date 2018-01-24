import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { UserRoles, UserStatus, KeyValue } from '../../shared/Utility/util-common';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
declare let $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [] 
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  emailValidationMessage: string = "Email address is required.";

  public submitted: boolean;
  public events: any[] = []; 
  constructor(private router: Router, fb: FormBuilder) {    
    this.loginForm = fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]     
  });
   }  
    ngOnInit() {
      // $(function () {
      //   $('input').iCheck({
      //     checkboxClass: 'icheckbox_square-blue',
      //     radioClass: 'iradio_square-blue',
      //     increaseArea: '20%' // optional
      //   });
      // });
      $(window.document).ready(function () {
        $("body").addClass("login-page");
      });
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
    
    register():void{      
      this.router.navigate(['signup']);
    }
    login(data){
      if(data.email=="kaushal.ng12" && data.password=="kaushal@1234"){
        alert("Login successfull");
        this.router.navigate(['admin']);
      }else{
        alert("Invalid username and password");
      }
    }
    forgotPassword():void{      
      this.router.navigate(['forgotpassword']);
    }
}
