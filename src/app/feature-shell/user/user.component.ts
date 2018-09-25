import { CustomerType } from './../../shared/models/auth/signup.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, ViewChild, AfterContentInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  UserRoles,
  UserStatus,
  KeyValue
} from '../../shared/Utility/util-common';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import { debug } from 'util';
import { filter } from 'rxjs/operators/filter';
import { User, Users } from '../../shared/models/user/user';
import { UserService } from './user.service';
import { UserModel } from '../../shared/models/user/user.model';
import { RoleModel } from '../../shared/models/auth/role.model';
import { StatusModel } from '../../shared/models/auth/status.model';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { userTableConfig } from './user.config';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from '../../auth-shell/auth-shell.service';
import { ActionColumnModel } from '../../shared/models/data-table/action-column.model';
import { ChangePassword } from '../../shared/models/auth/changepassword.model';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';

declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  tableInputData = [];
  public changePasswordForm: FormGroup;
  columns = userTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  isDisplayPopup = false;
  userRoles: RoleModel[];
  userRoles1: any = [];
  userStatus: StatusModel[];
  passwordValidationMessage = 'Password is required.';
  filterby = 'All';
  rowData: any;
  moduleName = 'user';
  editForm: FormGroup;
  $table: any;
  Branches = [];
  institutions = [];
  serviceMode: any;
  @ViewChild(EditUserComponent) child: EditUserComponent;
  actionColumnConfig: ActionColumnModel;
  constructor(private fb: FormBuilder, private userService: UserService, private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService, private authService: AuthService) {
    this.setRoles();
    this.setStatus();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.serviceMode = params.mode;
    });
    this.changePasswordValidation();
    this.setActionConfig();
    this.getUsers();
    this.GetLoggedInUserDetails();
    this.getBranchDDL();
    this.getInstitution();
    $('#customerList').modal('show');
  }

  changePasswordValidation() {
    this.changePasswordForm = this.fb.group({
      newPassword: [null, Validators.compose([Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/)])],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator('newPassword')])],
    });
  }
  getUsers() {

    const $this = this;
    const client = '?clientId=' + localStorage.getItem('client_id');
    this.userService.listUsers(client).subscribe(
      result => {

        result.forEach(element => {
          if (element.roles.length > 0) {
            element.roleId = element.roles[0].id;
            element.roles = element.roles[0].roleName;
          }
          if (element.branch != null) {
            element.branchId = element.branch.id;
            element.branchName = element.branch.branchName;
          }
          if (element.institution != null) {
            element.institutionId = element.institution.id;
            element.institutionName = element.institution.institutionName;
          }

          element.statusId = element.status.statusId;
          element.status = element.status.statusName;
          element.name = element.firstName + ' ' + element.lastName;
          this.tableInputData.push(element);
        });
        this.dataTableComponent.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  public addUserToList(user: any) {
    user.roleId = user.roles[0].id;
    user.roles = user.roles[0].roleName;
    user.statusId = user.status.statusId;
    user.status = user.status.statusName;
    this.tableInputData.push(user);
    console.log(user);
    this.dataTableComponent.ngOnInit();
  }

  setRoles() {
    var $this = this
    $this.userRoles = [];
    this.userService.listRoles().subscribe(
      result => {
        result.forEach(function (value) {

          if (result[0].roleName == 'ADMIN') {
            result.splice(0, 1)
            $this.userRoles = result;
          }
        });

      },
      err => {
        console.log(err);
        this.userRoles = null;
      });
  }

  setStatus() {
    this.userService.listStatus().subscribe(
      result => {
        this.userStatus = result;
      },
      err => {
        this.userStatus = null;
      });
  }
  onRowClick(event) {
    console.log(event);
  }
  onRowDoubleClick(event) {
    $('#editUserModal').modal('show');
    this.userRoles1 = [];
    this.child.createForm(event);
    this.child.subscriberFields();
  }

  onRowSelect(event) {
    console.log(event);
  }
  onActionBtnClick(event) {
    if (event.eventType === 'edit') {
      $('#editUserModal').modal('show');
      this.userRoles1 = [];
      this.child.createForm(event.data);
      this.child.subscriberFields();
    }
  }
  onActionBtnClickForChangePasswordPopup(event) {

    this.rowData = event;
    $('#changePasswordPopUp').modal("show");
  }


  changeUserPassword(row) {

    const changepassworddetails = new ChangePassword();
    changepassworddetails.userId = this.rowData.data.id;
    // changepassworddetails.oldPassword = data.newPassword;
    changepassworddetails.password = row.confirmPassword;
    this.userService.changepassword(changepassworddetails).subscribe(

      result => {

        if (result.body.httpCode === 200) {
          $.toaster({ priority: 'success', title: 'Success', message: 'Password Updated Successfully' });
          $('#changePasswordPopUp').modal('hide');
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }


      },
      err => {
        console.log(err);
      });
  }
  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = true;
    this.actionColumnConfig.btnText = ['Make Default', 'Default'];
    this.actionColumnConfig.moduleName = 'user';
  }

  GetLoggedInUserDetails() {
    const $this = this;
    const client = '?userId=' + localStorage.getItem('client_id');
    this.userService.getUser(client).subscribe(
      data => {
        $this.isDisplayPopup = data.subscriptionEnded;
        if (data.daysLeftForRenew <= 5) {
          $('#subscriptionWarningModal').modal('show');
        } else {
          $('#subscriptionWarningModal').modal('hide');
        }
        if (data.subscriptionEnded === true) {
          $('#subscriptionModal').modal({
            backdrop: 'static',
            keyboard: false,
            closeOnEscape: false,
            open: function (event, ui) {
              $('.ui-dialog-titlebar-close', ui.dialog || ui).hide();
            }
          });
        } else {
          $('#subscriptionModal').modal('hide');
        }

      },
      error => console.log(error)
    );

  }
  getBranchDDL() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.getBranchDDL(reqData).subscribe(

      result => {
        result.branches.forEach(function (value) {
          $this.Branches.push(value);
        });

      },
      err => {
        console.log(err);
      });
  }
  getInstitution() {
    var $this = this
    var reqData = {
      userId: this._storageService.getUserId(),
    };
    this.authService.getInstitution().subscribe(

      result => {

        result.institutions.forEach(function (value) {
          $this.institutions.push(value);
        });

      },
      err => {
        console.log(err);
      });
  }
}
