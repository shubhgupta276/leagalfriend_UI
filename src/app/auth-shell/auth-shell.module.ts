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
import { TokenModel } from '../shared/models/auth/token.model';
import { changepasswordComponent } from './changepassword/changepassword.component';
import { HomeComponent } from './home/home.component';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { AuthService } from './auth-shell.service';



@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthShellRoutingModule,
    SharedModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#blue',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  providers: [AuthService],
  declarations: [
    AuthShellComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignupComponent,
    changepasswordComponent,
    HomeComponent
  ]
})
export class AuthShellModule {}
