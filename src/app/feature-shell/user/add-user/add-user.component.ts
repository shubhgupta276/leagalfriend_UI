import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { UserService } from '../user.service';
import { UserModel } from '../../../shared/models/user/user.model';
import { RoleModel } from '../../../shared/models/auth/role.model';
import { StatusModel } from '../../../shared/models/auth/status.model';
declare var $;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {

  @Output() userAdded: EventEmitter<any> = new EventEmitter<any>();
  addForm: FormGroup;
  @Input() Roles: RoleModel[];
  @Input() Status: StatusModel[];
  @Input() Branches = [];
  
  @Input() institutions=[];
  emailValidationMessage = 'Email address is required.';
  passwordValidationMessage = 'Password is required.';
  zipValidationMessage = 'Postal/Zip Code is required.';
  mobileNoValidationMessage = 'Mobile number is required.';
  selectedRole = [];
  roleValue: number;
  userTypeRole: any;
  adminLawer = localStorage.permission_level;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.AddUser();
  }

  AddUser() {
    this.addForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      organisation: [null, Validators.nullValidator],
      addressLine1: [null, Validators.required],
      addressLine2: [null, Validators.required],
      postalCode: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/)])],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator('password')])],
      mobileNumber: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      role: [2],
      status: [1],
      userTypeRole: [null, Validators.nullValidator],
      branchName: [null, Validators.nullValidator],
      institutions: [null, Validators.nullValidator],
    });
  }

  submitAddUser(data) {
    const userDetails = new UserModel();
    userDetails.firstName = data.firstName;
    userDetails.lastName = data.lastName;
    userDetails.name = data.firstName + ' ' + data.lastName;
    userDetails.email = data.email;
    userDetails.organization = data.organisation;
    userDetails.password = data.password;
    userDetails.isClient = false;
    userDetails.addressLine1 = data.addressLine1;
    userDetails.addressLine2 = data.addressLine2;
    userDetails.mobileNumber = data.mobileNumber;    
    userDetails.roles = [
      {
        id: data.role,
        roleName: this.getRoleName(data.role)
      }
    ];
    userDetails.address = {
      address1: data.addressLine1,
      address2: data.addressLine2,
      city: '',
      state: '',
      zipCode: data.postalCode
    };
    userDetails.status = {
      statusId: data.status,
      statusName: this.getStatusName(data.status)
    };
    
    userDetails.branch = {
      id: data.branchName,
    };
    userDetails.institution = {
      id: data.institutions,
    };
    
    if (data.userTypeRole === undefined || data.userTypeRole == null) {
      userDetails.userType = {
        id: 2,
        name: 'Institutional'
      };
    }
    else {
      userDetails.userType = {
        id: data.userTypeRole,
       // name: data.userTypeRole.text
      };
    }
    userDetails.clientId = Number(localStorage.getItem('client_id'));
    this.userService.addNewUser(userDetails).subscribe(
      result => {
        
        if (result.body.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: 'User added successfully' });
          window.location.href='./admin/user'
          console.log(result);
          userDetails.id = result.body.id;
          userDetails.showSubscriptionFlash = result.body.showSubscriptionFlash;
          userDetails.subscriptionEndDate = result.body.subscriptionEndDate;
          userDetails.subscriptionEnded = result.body.subscriptionEnded;
          userDetails.subscriptionId = result.body.subscriptionId;
          userDetails.verified = result.body.verified;
          this.userAdded.emit(userDetails);
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      });
    $('#addUserModal').modal('hide');
    this.AddUser();
  }

  ngOnInit() {
    this.addForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.emailValidationMessage = 'Email format is not correct.';
        } else {
          this.emailValidationMessage = 'Email address is required.';
        }
      }
    );

    this.addForm.get('password').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.passwordValidationMessage = 'Password must use a combination' +
            ' of these: Atleast 1 upper case letters (A – Z),' +
            ' one lower case letters (a – z)' +
            ' one number (0 – 9)' +
            ' one special symbol (e.g. ‘!@#\$%\^&\’)' +
            ' and minimum length should be 8 characters.';
        } else {
          this.passwordValidationMessage = 'Password is required.';
        }
      }
    );

    this.addForm.get('postalCode').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.zipValidationMessage = 'Postal/Zip Code length is less then 4';
        } else {
          this.zipValidationMessage = 'Postal/Zip Code is required';
        }
      }
    );

    this.addForm.get('mobileNumber').valueChanges.subscribe(
      (e) => {
        if (e !== '') {
          this.mobileNoValidationMessage = 'Mobile number length is less then 10';
        } else {
          this.mobileNoValidationMessage = 'Mobile number is required.';
        }
      }
    );
  }
  getRoleName(roleId): string {
    const objFind = this.Roles.filter(x => x.id === roleId)[0];
    if (objFind) {
      return objFind.roleName;
    } else {
      return '';

    }
  }
  getStatusName(statusId): string {
    const objFind = this.Status.filter(x => x.statusId === statusId)[0];
    if (objFind) {
      return objFind.statusName;
    } else {
      return '';
    }
  }
  rolechange(args) {
    this.selectedRole = args.target.options[args.target.selectedIndex].text;
    var role = args.target.options[args.target.selectedIndex].value;
    var arr = role.split(':');
    this.roleValue = parseInt(arr[1]);
  }
  userTypeRoleChange(args) {
    
    this.userTypeRole = args.target.options[args.target.selectedIndex];
  }
  
}

