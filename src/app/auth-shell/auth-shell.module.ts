import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthShellRoutingModule } from './auth-shell-routing.module';
import { AuthShellComponent } from './auth-shell.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    imports: [ 
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AuthShellRoutingModule ],
  
   declarations: [
       AuthShellComponent,
       LoginComponent,
       ForgotPasswordComponent,
       SignupComponent
    ]
  })
  export class AuthShellModule {}