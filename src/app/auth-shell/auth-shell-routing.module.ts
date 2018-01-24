import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthShellComponent } from './auth-shell.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';

const authShellRoutes: Routes = [
    // { path: '', component: AuthShellComponent, children:[
    //     { path: 'login', component: LoginComponent },
    //     { path: 'forgotpassword', component: ForgotPasswordComponent },
    //     { path: 'signup', component: SignupComponent },
    //     { path: '', redirectTo: 'login', pathMatch: 'full' }
    // ]}
      { path: 'login', component: LoginComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authShellRoutes)],
  exports: [RouterModule]
})
export class AuthShellRoutingModule {}