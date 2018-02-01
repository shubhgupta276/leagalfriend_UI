import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { UserService } from '../user.service';
import { UserModel } from '../../../shared/models/user/user.model';
declare var $;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {


  addForm: FormGroup;
  public _user: any;
  Roles: KeyValue[] = UserRoles;
  Status: KeyValue[] = UserStatus;
  emailValidationMessage: string = "Email address is required.";

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.AddUser();
  }

  AddUser() {
    this.addForm = this.fb.group({
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


  


  submitAddUser(data) {
    debugger;
    const userDetails = new UserModel();
    userDetails.firstName = data.firstName;
    userDetails.lastName = data.lastName;
    userDetails.email = data.email;
    userDetails.organization = data.organisation;
    userDetails.password = data.password;
    userDetails.isClient = 1;
    this.userService.addNewUser(userDetails).subscribe(
      result => {
        debugger;
        console.log(result);
        this._user = result;
      },
      err => {
        console.log(err);
      });
    $.toaster({ priority : 'success', title : 'Success', message : 'User added successfully'});
  }

  
  ngOnInit() {
    this.addForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e != "") {
          this.addForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = "Email format is not correct.";
        } else {
          this.addForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = "Email address is required.";
        }
      }
    )
  }

}