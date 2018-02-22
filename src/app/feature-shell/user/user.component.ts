import { Component, OnInit, AfterContentInit } from '@angular/core';
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
import { setTimeout } from 'timers';
declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  arr: UserModel[];
  userRoles: RoleModel[];
  userStatus: StatusModel[];
  filterby = 'All';
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm(null);
    this.setRoles();
    this.setStatus();
  }

  ngOnInit() {
    this.getUsers();
  }
  showEditModal() {
    $('#editUserModal').modal('show');
  }
  ngForCallback() {
    alert();
    this.bindDataTable();
  }

  bindDataTable() {
    const arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, 'All']];
    const selectedPageLength = 15;
    const $table = $('#example1').DataTable({
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

    $table.columns().every(function () {
      $('#txtSearch').on('keyup change', function () {
        if ($table.search() !== this.value) {
          $table.search(this.value).draw();
        }
      });
    });

    $table.columns().every(function () {
      // user filter
      $('#ddlUserFilter').on('change', function () {
        const status = $(this).val();
        if (status === 'All') {
          $table
            .columns(4)
            .search('')
            .draw();
        } else if ($table.columns(5).search() !== this.value) {
          $table
            .columns(4)
            .search(this.value)
            .draw();
        } else {
        }
      });
      // status filter
      $('#ddlStatusFilter').on('change', function () {
        const status = $(this).val();
        if (status === 'All') {
          $table
            .columns(5)
            .search('')
            .draw();
        } else if ($table.columns(5).search() !== this.value) {
          $table
            .columns(5)
            .search(this.value)
            .draw();
        } else {
        }
      });
    });
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
        data => this.arr=data,
        error => console.log(error)
      );

  };

  editUser(user) {
    this.createForm(user);
    $('#editUserModal').modal('show');
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
        user == null ? null : user.address,
        Validators.required
      ],
      addressLine2: [
        user == null ? null : user.address,
        Validators.required
      ],
      postalCode: [
        user == null ? null : user.postalCode,
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

  public addUserToList(user: any): void {
    this.arr.push(user);
    $.toaster({ priority: 'success', title: 'Success', message: 'User added successfully' });
  }

  setRoles() {
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
}
