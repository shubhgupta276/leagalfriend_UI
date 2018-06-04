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
  rowSelect = true;
  hoverTableRow = true;
  isDisplayPopup = false;
  arrUsers: any = [];
  userRoles: RoleModel[];
  userRoles1: any= [];
  userStatus: StatusModel[];
  filterby = 'All';
  editForm: FormGroup;
  $table: any;
  Branches=[];
  @ViewChild(EditUserComponent) child: EditUserComponent;
  constructor(private fb: FormBuilder, private userService: UserService, private _storageService:StorageService,private authService:AuthService) {
    this.setRoles();
    this.setStatus();
  }

  ngOnInit() {
    this.getUsers();
    this.GetLoggedInUserDetails();
    this.getBranchDDL();

  }

  // bindDataTable() {
  //   const arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, 'All']];
  //   const selectedPageLength = 15;
  //   this.$table = $('#example1').DataTable({
  //     columns: [
  //       { name: '#', orderable: true },
  //       { name: 'Name', orderable: true },
  //       { name: 'Email', orderable: true },
  //       { name: 'Phone', orderable: true },
  //       { name: 'Role', orderable: false },
  //       { name: 'Status', orderable: false }
  //     ],
  //     destroy: true,
  //     lengthMenu: arLengthMenu,
  //     pageLength: selectedPageLength,
  //     oLanguage: {
  //       sLengthMenu: 'Show _MENU_ rows',
  //       sSearch: '',
  //       sSearchPlaceholder: 'Search...'
  //     },
  //     initComplete: function () {
  //       const tableid = 'example1';
  //       const $rowSearching = $('#' + tableid + '_wrapper');
  //       $rowSearching.find('.row:eq(0)').hide();

  //       for (let i = 0; i < arLengthMenu[0].length; i++) {
  //         const selectText = (arLengthMenu[0][i] === selectedPageLength) ? 'selected' : '';
  //         $('#ddlLengthMenu').append(


  //           '<option ' + selectText + ' value=' +
  //           arLengthMenu[0][i] +
  //           '>' +
  //           arLengthMenu[1][i] +
  //           '</option>'
  //         );
  //       }
  //       // $('#ddlLengthMenu').val(selectedPageLength);

  //       $('#ddlLengthMenu').on('change', function () {
  //         $rowSearching
  //           .find('.row:eq(0)')
  //           .find('select')
  //           .val($(this).val())
  //           .change();
  //       });
  //     }
  //   });
  //   const $this = this;
  //   $this.$table.columns().every(function () {
  //     $('#txtSearch').on('keyup change', function () {
  //       if ($this.$table.search() !== this.value) {
  //         $this.$table.search(this.value).draw();
  //       }
  //     });
  //   });

  //   $this.$table.columns().every(function () {
  //     // user filter
  //     $('#ddlUserFilter').on('change', function () {
  //       const role = $(this).val();
  //       if (role === 'All') {
  //         $this.$table
  //           .columns(4)
  //           .search('')
  //           .draw();
  //       } else if ($this.$table.columns(5).search() !== this.value) {
  //         const query = '((  )|^)' + regex_escape(this.value) + '((  )|$)';
  //         $this.$table
  //           .columns(4)
  //           .search(query, true, false)
  //           .draw();
  //       } else {
  //       }
  //     });
  //     // status filter
  //     $('#ddlStatusFilter').on('change', function () {
  //       const status = $(this).val();
  //       if (status === 'All') {
  //         $this.$table
  //           .columns(5)
  //           .search('')
  //           .draw();
  //       } else if ($this.$table.columns(5).search() !== this.value) {
  //         const query = '((  )|^)' + regex_escape(this.value) + '((  )|$)';
  //         $this.$table
  //           .columns(5)
  //           .search(query, true, false)
  //           .draw();
  //       } else {
  //       }
  //     });
  //   });
  //   function regex_escape(text) {
  //     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  //   }
  // }


  getUsers() {
    const $this = this;
    const client = '?clientId=' + localStorage.getItem('client_id');
    this.userService.listUsers(client).subscribe(
      result => {
        result.forEach(element => {
          if (element.roles.length > 0)  {
            debugger
            element.roleId = element.roles[0].id;
          element.roles = element.roles[0].roleName;
          }
          element.statusId = element.status.statusId;
          element.status = element.status.statusName;
          this.tableInputData.push(element);
        });
        console.log(JSON.stringify(this.tableInputData[0]));
        this.dataTableComponent.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }
  editUser(user) {
    $('#editUserModal').modal('show');
    this.userRoles1 = [];
    this.child.createForm(user);
    this.child.subscriberFields();
  }


  public addUserToList(user: any) {
    user.roles = user.roles[0].roleName;
    user.status = user.status.statusName;
    this.tableInputData.push(user);
    console.log(user);
    this.dataTableComponent.ngOnInit();
  }

  setRoles() {
    this.userRoles = [];
    this.userService.listRoles().subscribe(
      result => {
        debugger
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


  GetLoggedInUserDetails() {
    const $this = this;
    const client = '?userId=' + localStorage.getItem('client_id');
    this.userService.getUser(client).subscribe(
      data => {
        $this.isDisplayPopup = data.subscriptionEnded;
        if (data.daysLeftForRenew <= 5) {
          $('#subscriptionWarningModal').modal('show');
        }else {
           $('#subscriptionWarningModal').modal('hide');
          }
        if (data.subscriptionEnded === true) {
          $('#subscriptionModal').modal({
            backdrop: 'static',
            keyboard: false,
            closeOnEscape: false,
            open: function(event, ui) {
              $('.ui-dialog-titlebar-close', ui.dialog || ui).hide();
          }
          });
        }else {
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
          debugger
          $this.Branches.push(value);
        });

      },
      err => {
        console.log(err);
      });
  }
}
