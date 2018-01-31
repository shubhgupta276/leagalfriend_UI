import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
declare var $;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;

  Roles: KeyValue[] = UserRoles;
  Status: KeyValue[] = UserStatus;
  emailValidationMessage: string = "Email address is required.";

  EditUser() {
    this.editForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      organisation: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: [null, Validators.required],
      postalCode: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator("password")])],
      mobileNumber: [null, Validators.required],
      role: [1],
      status: [1]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditUser();
  }

  submitEditUser(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'User updated successfully'});
  }

  ngOnInit() {
    this.editForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e != "") {
          this.editForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = "Email format is not correct.";
        } else {
          this.editForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = "Email address is required.";
        }
      }
    )
  }

}