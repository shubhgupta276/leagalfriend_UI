import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { UserService } from '../user.service';
import { User } from '../../../shared/models/user/user';
import { UserModel } from '../../../shared/models/user/user.model';
import { StatusModel } from '../../../shared/models/auth/status.model';
import { RoleModel } from '../../../shared/models/auth/role.model';
import { SharedService } from '../../../shared/services/shared.service';
import { StorageService } from '../../../shared/services/storage.service';
declare var $;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  public changePasswordForm: FormGroup;
  @Input() Roles: RoleModel[];
  @Input() Status: StatusModel[];
  @Input() tableInputData: any;
  @Input()   rowData: any;
  selectedStatus: string;
  selectedRole: string;

  isStatusChange: boolean;
  isRoleChange: boolean;
  emailValidationMessage = 'Email address is required.';
  zipValidationMessage = 'Postal/Zip Code is required.';
  mobileNoValidationMessage = 'Mobile number is required.';
  roleValue: number;
  userTypeRole: number;
  userTypeOption = [
    { id: 1, text: "Individual" },
    { id: 2, text: "Institutional" }
  ]
  @Input() Branches = [];
  @Input() institutions = [];
  constructor(private userService: UserService, private fb: FormBuilder, private _sharedService: SharedService,private _storageService: StorageService) {
    this.createForm(null);
    
  }
  ngOnInit() {
  }
  statuschange(args) {
    this.isStatusChange = true;
    this.selectedStatus = args.target.options[args.target.selectedIndex].text;
  }
  rolechange(args) {
    this.isRoleChange = true;
    this.selectedRole = args.target.options[args.target.selectedIndex].text;
    var role = args.target.options[args.target.selectedIndex].value;
    var arr = role.split(':');
    this.roleValue = parseInt(arr[1]);
  }
  userTypeRoleChange(args) {
    var arr = args.target.value.split(':');
    
    this.userTypeRole = parseInt(arr[1]);
   
  }
  submitEditUser(data) {

    if (this.isStatusChange) {
      data.statusName = this.selectedStatus;
    }
    if (this.isRoleChange) {
      data.roles = this.selectedRole;
    }

    const finalData = this.GetUserEditData(data);
    // if(finalData.roles[0].roleName=='Admin' || finalData.roles[0].roleName=='EMPLOYEE' || finalData.roles[0].roleName=='MANAGER')
    // {
    //   finalData.institution=1;
    //   finalData.userType=1;
    // }
    this.userService.editUser(finalData).subscribe(
      result => {

        if (result.body.httpCode === 200) {
          $.toaster({ priority: 'success', title: 'Success', message: 'User updated successfully' });
          this.BindGridOnEdit(data);
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      });
    $('#editUserModal').modal('hide');
  }
  BindGridOnEdit(data) {

    this.tableInputData.forEach((item, index) => {

      if (data.id === item.id) {
        this.tableInputData[index].firstName = data.firstName;
        this.tableInputData[index].lastName = data.lastName;
        this.tableInputData[index].name = data.firstName + ' ' + data.lastName;
        this.tableInputData[index].organization = data.organisation;
        this.tableInputData[index].addressLine1 = data.addressLine1;
        this.tableInputData[index].addressLine2 = data.addressLine2;
        this.tableInputData[index].email = data.email;
        this.tableInputData[index].mobileNumber = data.mobileNumber;
        this.tableInputData[index].roleId = data.role;
        this.tableInputData[index].roles = data.roles;
        this.tableInputData[index].address = {
          address1: data.addressLine1,
          address2: data.addressLine2,
          city: '',
          state: '',
          zipCode: data.postalCode
        };
        // this.tableInputData[index].branch = {
        //   id: data.id,
        //   branchName: data.branchName,
        // };
        this.tableInputData[index].institutionId = data.institution.id;
        this.tableInputData[index].institutionName = data.institution.name;
        this.tableInputData[index].branchId = data.branchId;
        this.tableInputData[index].barnchName = data.barnchName;
        this.tableInputData[index].roleId = data.role;
        this.tableInputData[index].statusId = data.status;
        this.tableInputData[index].status = data.statusName;
        const userTypeData = this.userTypeOption.filter(x => x.id == data.userTypeRole);
        this.tableInputData[index].userType = {
          id: userTypeData[0].id,
          name: userTypeData[0].text
        };
        this.userTypeRole = userTypeData[0].id;
      }
    });
  }
  GetUserEditData(data): UserModel {

    const userdata = new UserModel();
    const userTypeData = this.userTypeOption.filter(x => x.id == data.userTypeRole);
    userdata.id = data.id;
    userdata.firstName = data.firstName;
    userdata.lastName = data.lastName;
    userdata.organization = data.organisation;
    userdata.addressLine1 = data.addressLine1;
    userdata.addressLine2 = data.addressLine2;
    userdata.email = data.email;

    userdata.password = data.password;
    userdata.mobileNumber = data.mobileNumber;
    userdata.roles = [
      {
        id: data.role,
        roleName: data.roles
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
      statusId: data.status,
      statusName: data.statusName
    };
    
    userdata.institution = {
      id:data.institutionId
    };
    userdata.branch = {
      id:data.branchId
    };
    userdata.userType = {
      id: userTypeData[0].id,
      name: userTypeData[0].text
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
        Validators.nullValidator
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
      role: [user == null ? 1 : user.roleId],
      password: [],
      roles: [user == null ? 1 : user.roles],
      status: [user == null ? 1 : user.statusId],
      statusName: [user == null ? 1 : user.status],
      userTypeRole: [user == null ? 1 : user.userType.id],
      branchId: [user == null ? null : user.branchId],
      branchName: [user == null ? null : user.branchName],
      institutionId: [user == null ? null : user.institutionId],
      institutionName: [user == null ? null : user.institutionName],
    });
    
    this.userTypeRole = user == null ? 1 : user.userType.id;
    this.roleValue = user == null ? 1 : user.roleId;
    this.editForm.controls['role'].disable();
    this.editForm.controls['userTypeRole'].disable();
    this.editForm.controls['institutionId'].disable();
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
  // changepassword()
  // {
  //   $('#changePasswordPopUp').modal('show');
  //   $('#editUserModal').modal('hide');
  // }
  


}
