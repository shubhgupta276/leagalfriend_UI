import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { UserService } from '../user.service';
import { User } from '../../../shared/models/user/user';
declare var $;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit, OnChanges {
  @Input() selectedUser: User;
  editForm: FormGroup;
  Roles: KeyValue[] = UserRoles;
  Status: KeyValue[] = UserStatus;
  emailValidationMessage = 'Email address is required.';
  isEmailAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditUser(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'User updated successfully' });
    $('#editUserModal').modal('hide');
  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedUser.currentValue !== undefined) {
      this.createForm(changes.selectedUser.currentValue);
    }
    this.subscriberFields();

  }


  subscriberFields() {
    this.editForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e == "test@123.in") // right now this is hardcode later it will be checked from service(database)
          this.isEmailAlreadyExists = true;
        else
          this.isEmailAlreadyExists = false;
        if (e !== '') {
          this.editForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = 'Email format is not correct.';
        } else {
          this.editForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = 'Email address is required.';
        }
      }
    );
  }
  createForm(user) {
    this.editForm = this.fb.group({
      firstName: [user == null ? null : user.FirstName, Validators.required],
      lastName: [user == null ? null : user.LastName, Validators.required],
      organisation: [
        user == null ? null : user.Organisation,
        Validators.required
      ],
      addressLine1: [
        user == null ? null : user.AddressLine1,
        Validators.required
      ],
      addressLine2: [
        user == null ? null : user.AddressLine2,
        Validators.required
      ],
      postalCode: [
        user == null ? null : user.PostalCode,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      email: [
        user == null ? null : user.Email,
        Validators.compose([Validators.required, Validators.email])
      ],
      mobileNumber: [
        user == null ? null : user.MobileNumber,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ],
      role: [user == null ? 1 : user.UserTypeCode],
      status: [user == null ? 1 : user.StatusCode]
    });
  }
}
