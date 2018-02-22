import { Component, OnInit, Input } from '@angular/core';
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
export class EditUserComponent implements OnInit {
  @Input() editForm: FormGroup;
  @Input() Roles: RoleModel[];
  @Input() Status: StatusModel[];
  emailValidationMessage = 'Email address is required.';

  constructor(private userService: UserService ) { }

  submitEditUser(data) {
    const finalData = this.GetUserEditData(data);
    this.userService.editUser(finalData).subscribe(
      result => {
        console.log(result);
      },
      err => {
        console.log(err);
      });
    $.toaster({ priority : 'success', title : 'Success', message : 'User updated successfully'});
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
    // userdata.status = data.status;
    userdata.email = data.email;
    userdata.mobileNumber = data.mobileNumber;

    return userdata;
  }

  ngOnInit() {
    this.editForm.get('email').valueChanges.subscribe(
      (e) => {
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

}
