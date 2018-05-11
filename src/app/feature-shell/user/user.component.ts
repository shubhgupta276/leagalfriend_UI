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

declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  isDisplayPopup = false;
  arrUsers: any = [];
  userRoles: RoleModel[];
  userStatus: StatusModel[];
  filterby = 'All';
  editForm: FormGroup;
  $table: any;
  @ViewChild(EditUserComponent) child: EditUserComponent;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.setRoles();
    this.setStatus();
  }

  ngOnInit() {
    this.getUsers();
    this.GetLoggedInUserDetails();

  }

  bindDataTable() {
    const arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, 'All']];
    const selectedPageLength = 15;
    this.$table = $('#example1').DataTable({
      columns: [
        { name: '#', orderable: true },
        { name: 'Name', orderable: true },
        { name: 'Email', orderable: true },
        { name: 'Phone', orderable: true },
        { name: 'Role', orderable: false },
        { name: 'Status', orderable: false }
      ],
      lengthMenu: arLengthMenu,
      pageLength: selectedPageLength,
      oLanguage: {
        sLengthMenu: 'Show _MENU_ rows',
        sSearch: '',
        sSearchPlaceholder: 'Search...'
      },
      initComplete: function () {
        const tableid = 'example1';
        const $rowSearching = $('#' + tableid + '_wrapper');
        $rowSearching.find('.row:eq(0)').hide();

        for (let i = 0; i < arLengthMenu[0].length; i++) {
          const selectText = (arLengthMenu[0][i] === selectedPageLength) ? 'selected' : '';
          $('#ddlLengthMenu').append(


            '<option ' + selectText + ' value=' +
            arLengthMenu[0][i] +
            '>' +
            arLengthMenu[1][i] +
            '</option>'
          );
        }
        // $('#ddlLengthMenu').val(selectedPageLength);

        $('#ddlLengthMenu').on('change', function () {
          $rowSearching
            .find('.row:eq(0)')
            .find('select')
            .val($(this).val())
            .change();
        });
      }
    });
    var $this = this;
    $this.$table.columns().every(function () {
      $('#txtSearch').on('keyup change', function () {
        if ($this.$table.search() !== this.value) {
          $this.$table.search(this.value).draw();
        }
      });
    });

    $this.$table.columns().every(function () {
      // user filter
      $('#ddlUserFilter').on('change', function () {
        const role = $(this).val();
        if (role === 'All') {
          $this.$table
            .columns(4)
            .search('')
            .draw();
        } else if ($this.$table.columns(5).search() !== this.value) {
          var query = "((  )|^)" + regex_escape(this.value) + "((  )|$)";
          $this.$table
            .columns(4)
            .search(query, true, false)
            .draw();
        } else {
        }
      });
      // status filter
      $('#ddlStatusFilter').on('change', function () {
        const status = $(this).val();
        if (status === 'All') {
          $this.$table
            .columns(5)
            .search('')
            .draw();
        } else if ($this.$table.columns(5).search() !== this.value) {
          var query = "((  )|^)" + regex_escape(this.value) + "((  )|$)";
          $this.$table
            .columns(5)
            .search(query, true, false)
            .draw();
        } else {
        }
      });
    });
    function regex_escape(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
  }

  getUsers() {
    var $this = this;
    const client = '?clientId=' + localStorage.getItem('client_id');
    this.userService.listUsers(client)
      .map(res => res)
      .finally(() => {
        setTimeout(() => {
          $this.bindDataTable();
        }, 5);
      })
      .subscribe(
      data => {
        this.arrUsers = data
      },
      error => console.log(error)
      );

  };

  editUser(user) {
    $('#editUserModal').modal('show');
    this.child.createForm(user);
    this.child.subscriberFields();
  }


  public addUserToList(user: any): void {
    this.arrUsers.push(user);
    this.$table.destroy();
    setTimeout(() => {
      this.bindDataTable();
    }, 5);

    $.toaster({ priority: 'success', title: 'Success', message: 'User added successfully' });
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


  GetLoggedInUserDetails() {
    debugger
    var $this = this;
    var client = '?userId=' + localStorage.getItem('client_id');
    this.userService.getUser(client).subscribe(
      data => {
        debugger
        $this.isDisplayPopup = data.subscriptionEnded;
        if(data.daysLeftForRenew<=5)
        {
          $('#subscriptionWarningModal').modal("show");
        }
        else{
          $('#subscriptionWarningModal').modal("hide");
        }
        if (data.subscriptionEnded == true) {
          $('#subscriptionModal').modal({
            backdrop: 'static',
            keyboard: false,
            closeOnEscape: false,
            open: function(event, ui) {
              $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
          }
          })
          //$("#subscriptionModal").modal("show");
        }
        else {
          $("#subscriptionModal").modal("hide");
        }

      },
      error => console.log(error)
    );

  }
}
