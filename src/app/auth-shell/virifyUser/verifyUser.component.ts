import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import { Console } from '@angular/core/src/console';
import { AuthService } from '../auth-shell.service';
import { ChangePassword } from '../../shared/models/auth/changepassword.model';

import { TokenModel } from '../../shared/models/auth/token.model';
declare let $;
@Component({
    selector: 'app-verify-user',
    templateUrl: './verifyUser.component.html',

    providers: [AuthService]
})

export class VerifyUserComponent implements OnInit {
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
        var isReferral;
        const str1 = window.location.href.slice(window.location.href.indexOf('/'));
        const str2 = 'verifyReferralEmail';
        if (str1.indexOf(str2) !== -1) {
            isReferral = 'Y';
        } else {
            isReferral = 'N'
        }
        var token = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
        const tokenDetails = new TokenModel();
        tokenDetails.token = token;
        tokenDetails.isReferral = isReferral;
        tokenDetails.oldPassword = data.newPassword;
        tokenDetails.password = data.confirmPassword;
        var password = data.confirmPassword;

        this.authService.verifyUser(token, isReferral, password).subscribe(

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
