import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { UserService } from '../user.service';
import { User } from '../../../shared/models/user/user';
import { UserModel } from '../../../shared/models/user/user.model';
import { StatusModel } from '../../../shared/models/auth/status.model';
import { RoleModel } from '../../../shared/models/auth/role.model';
declare var $;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent {
  editForm: FormGroup;
  @Input() Roles: RoleModel[];
  @Input() Status: StatusModel[];
  emailValidationMessage = 'Email address is required.';
  zipValidationMessage = 'Postal/Zip Code is required.';
  mobileNoValidationMessage = 'Mobile number is required.';

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditUser(data) {
    debugger
    const finalData = this.GetUserEditData(data);
    this.userService.editUser(finalData).subscribe(
      result => {
        if (result.body.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: 'User updated successfully' });
          console.log(result);
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      });

    $('#editUserModal').modal('hide');
  }

  GetUserEditData(data): UserModel {
    const userdata = new UserModel();
    userdata.id = data.id;
    userdata.firstName = data.firstName;
    userdata.lastName = data.firstName;
    userdata.organization = data.organisation;
    userdata.addressLine1 = data.addressLine1;
    userdata.addressLine2 = data.addressLine2;
    userdata.email = data.email;
    userdata.mobileNumber = data.mobileNumber;
    userdata.roles = [
      {
        id: data.role
      }
    ];
    userdata.address =
      {
        address1: data.addressLine1,
        address2: data.addressLine2,
        city: '',
        state: '',
        zipCode: data.postalCode
      }
      ;
    userdata.status = {
      statusId: data.status
    };
    userdata.isClient = false;
    userdata.clientId = Number(localStorage.getItem('client_id'));
    return userdata;
  }
  createForm(user) {
    this.editForm = this.fb.group({
      id: [user == null ? null : user.id],
      firstName: [user == null ? null : user.firstName, Validators.required],
      lastName: [user == null ? null : user.lastName, Validators.required],
      organisation: [
        user == null ? null : user.organization,
        Validators.required
      ],
      addressLine1: [
        (user == null || user.address == null) ? null : user.address.address1,
        Validators.required
      ],
      addressLine2: [
        (user == null || user.address == null) ? null : user.address.address2,
        Validators.required
      ],
      postalCode: [
        (user == null || user.address == null) ? null : user.address.zipCode,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      email: [
        user == null ? null : user.email,
        Validators.compose([Validators.required, Validators.email])
      ],
      mobileNumber: [
        user == null ? null : user.mobileNumber,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ],
      role: [user == null ? 1 : user.roles[0].id],
      status: [user == null ? 1 : user.status.statusId]
    });
  }
  subscriberFields() {
    this.editForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.emailValidationMessage = 'Email format is not correct.';
        } else {
          this.emailValidationMessage = 'Email address is required.';
        }
      }
    );

    this.editForm.get('postalCode').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.zipValidationMessage = 'Postal/Zip Code length is less then 4';
        } else {
          this.zipValidationMessage = 'Postal/Zip Code is required';
        }
      }
    );

    this.editForm.get('mobileNumber').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.mobileNoValidationMessage = 'Mobile number length is less then 10';
        } else {
          this.mobileNoValidationMessage = 'Mobile number is required.';
        }
      }
    );
  }


}
