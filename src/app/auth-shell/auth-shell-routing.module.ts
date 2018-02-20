import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthShellComponent } from './auth-shell.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './VerifyEmail/VerifyEmail.component';
const authShellRoutes: Routes = [
    { path: '', component: AuthShellComponent, children:[
        { path: 'login', component: LoginComponent },
        { path: 'forgotpassword', component: ForgotPasswordComponent },
        { path: 'resetpassword', component: ResetPasswordComponent },
        { path: 'signup', component: SignupComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'verifyemail', component: VerifyEmailComponent },
        { path: 'resetpwd', component: VerifyEmailComponent },
        { path: '**', component: VerifyEmailComponent },
       
    ]}
      // { path: 'login', component: LoginComponent },
      // { path: 'forgotpassword', component: ForgotPasswordComponent },
      // { path: 'resetpassword', component: ResetPasswordComponent },
      // { path: 'signup', component: SignupComponent },
      // { path: '', redirectTo: 'login', pathMatch: 'full' }
    ];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authShellRoutes)],
  exports: [RouterModule],
  declarations: [VerifyEmailComponent]
})
export class AuthShellRoutingModule {}