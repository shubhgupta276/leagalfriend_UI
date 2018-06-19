import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import { Console } from '@angular/core/src/console';
import { AuthService } from '../auth-shell.service';
import { ResetPassword } from '../../shared/models/auth/resetpassword.model';

declare let $;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [AuthService]
})

export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  passwordValidationMessage = 'Password is required.';

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.resetPasswordForm = fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.resetPasswordPageLayout();

    this.resetPasswordForm.get('newPassword').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.passwordValidationMessage = 'Password must use a combination' +
            ' of these: Atleast 1 upper case letters (A – Z),' +
            ' one lower case letters (a – z)' +
            ' one number (0 – 9)' +
            ' one special symbol (e.g. ‘!@#\$%\^&\’)' +
            ' and minimum length should be 8 characters.';
        } else {
        }
      }
    );
  }

  

  resetPassword(data) {
    if (data.newPassword !== '' && data.newPassword === data.confirmPassword) {
      this.router.navigate(['login']);
      var token = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
     
      const resetDetails = new ResetPassword();

  resetDetails.token = token;
  resetDetails.email = data.email;
  resetDetails.password = data.password;
 
  this.authService.resetPassword(resetDetails).subscribe(

    result => {
    },
    err => {
      console.log(err);
    });
  }
  
  
}

  resetPasswordPageLayout() {
    $(window.document).ready(function () {
      if ($('.login-page')[0]) {
      } else {
        $('body').addClass('login-page');
      }
      if ($('.skin-black')[0]) {
        $('body').removeClass('skin-black');
      }
      if ($('.sidebar-mini')[0]) {
        $('body').removeClass('sidebar-mini');
      }
      if ($('.hold-transition')[0]) {
      } else {
        $('body').addClass('hold-transition');
      }
      if ($('.login-box')[0]) {
      } else {
        $('#wrapper_id').addClass('login-box');
      }
      if ($('.wrapper')[0]) {
        $('#wrapper_id').removeClass('wrapper');
      }
      if ($('.register-box')[0]) {
        $('#wrapper_id').removeClass('register-box');
      }
      if ($('.register-page')[0]) {
        $('body').removeClass('register-page');
      }
      $('body').removeAttr('style');
      $('#wrapper_id').removeAttr('style');
    });
  }
}
