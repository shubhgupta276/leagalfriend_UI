import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
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
declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  tableInputData = [];
  columns = userTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  isDisplayPopup = false;
  userRoles: RoleModel[];
  userRoles1: any = [];
  userStatus: StatusModel[];
  filterby = 'All';
  editForm: FormGroup;
  $table: any;
  Branches = [];
  institutions= [];
  @ViewChild(EditUserComponent) child: EditUserComponent;
  actionColumnConfig: ActionColumnModel;
  constructor(private fb: FormBuilder, private userService: UserService,
    private _storageService: StorageService, private authService: AuthService) {
    this.setRoles();
    this.setStatus();
  }

  ngOnInit() {
    this.setActionConfig();
    this.getUsers();
    this.GetLoggedInUserDetails();
    this.getBranchDDL();
    this.getInstitution();
    $('#customerList').modal('show');

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
    this.userRoles = [];
    this.userService.listRoles().subscribe(
      result => {
        this.userRoles = result;
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
  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = true;
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
        debugger
        result.institutions.forEach(function (value) {
          $this.institutions.push(value);
        });

      },
      err => {
        console.log(err);
      });
  }
}
