import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthShellRoutingModule } from './auth-shell-routing.module';
import { AuthShellComponent } from './auth-shell.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { SignUpModel } from '../shared/models/auth/signup.model';
import {TokenModel} from '../shared/models/auth/token.model';
import { changepasswordComponent } from './changepassword/changepassword.component';


@NgModule({
    imports: [
      HttpClientModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AuthShellRoutingModule,
      SharedModule
     ],

   declarations: [
       AuthShellComponent,
       LoginComponent,
       ForgotPasswordComponent,
       ResetPasswordComponent,
       SignupComponent,
       changepasswordComponent
      
    ]
  })
  export class AuthShellModule {}
