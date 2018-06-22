import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import { Console } from '@angular/core/src/console';
import { AuthService } from '../auth-shell.service';
import { ChangePassword } from '../../shared/models/auth/changepassword.model';
import { changepassword } from '../auth-shell.config';

declare let $;
@Component({
    selector: 'app-change-password',
    templateUrl: './changepassword.component.html',

    providers: [AuthService]
})

export class changepasswordComponent implements OnInit {


    public changePasswordForm: FormGroup;
    constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
        this.changePasswordForm = fb.group({
            newPassword: [null, Validators.required],
            confirmPassword: [null, Validators.required]
        });
    }

    ngOnInit() {

        this.changePasswordPageLayout();
    }
    changePassword(data) {
        const changepassworddetails = new ChangePassword();
        var userId = parseInt(localStorage.getItem('client_id'));
        var accesstoken=localStorage.getItem('access_token');
        changepassworddetails.userId = userId;
        changepassworddetails.oldPassword = data.newPassword;
        changepassworddetails.password = data.confirmPassword;


        this.authService.changepassword(changepassworddetails).subscribe(

            result => {
                if (result.body.httpCode === 200) {
                    $.toaster({ priority: 'success', title: 'Success', message: 'User Verify Successfully' });
                  } else {
                    $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
                  }
               window.location.href = 'login';

            },
            err => {
                console.log(err);
            });
    }


    changePasswordPageLayout() {
        $(window.document).ready(function () {
            if ($(".login-page")[0]) {
            } else {
                $("body").addClass("login-page");
            }
            if ($(".skin-black")[0]) {
                $("body").removeClass("skin-black");
            }
            if ($(".sidebar-mini")[0]) {
                $("body").removeClass("sidebar-mini");
            }
            if ($(".hold-transition")[0]) {
            } else {
                $("body").addClass("hold-transition");
            }
            if ($(".login-box")[0]) {
            } else {
                $("#wrapper_id").addClass("login-box");
            }
            if ($(".wrapper")[0]) {
                $("#wrapper_id").removeClass("wrapper");
            }
            if ($(".register-box")[0]) {
                $("#wrapper_id").removeClass("register-box");
            }
            if ($(".register-page")[0]) {
                $("body").removeClass("register-page");
            }
            $("body").removeAttr("style");
            $("#wrapper_id").removeAttr("style");
        });
    }
}
