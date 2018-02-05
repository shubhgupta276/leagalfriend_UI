import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../shared/Utility/util-common';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
import { debug } from 'util';
import { filter } from 'rxjs/operators/filter';
import { User, Users } from '../../shared/models/user/user';
declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  arr: User[];
  usertype = 'All';
  filterby = 'All';
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  ngOnInit() {
    this.GetAllCustomer();
  }

  showEditModal(){
    $('#editUserModal').modal('show');
    }

  GetAllCustomer() {
    this.arr = Users;

    $($.document).ready(function () {
      const $table = $('#example1').DataTable({
        columns: [
          { name: '#', orderable: true },
          { name: 'Name', orderable: true },
          { name: 'Email', orderable: true },
          { name: 'Phone', orderable: true },
          { name: 'Role', orderable: false },
          { name: 'Status', orderable: false }
        ],
        // scrollY:        '65vh',
        // scrollCollapse: true,
        'lengthMenu': [[10, 15, 25, -1], [10, 15, 25, 'All']],
        'pageLength': 15,
        'oLanguage': {
          'sLengthMenu': 'Show _MENU_ rows',
          'sSearch': '',
          'sSearchPlaceholder': 'Search...'
        }
        // 'dom': '<'row'<'col-sm-12'f>>' + '<'row'<'col-sm-12'tr>>' +
        // '<'row'<'col-sm-2'l><'col-sm-6'i><'col-sm-4'p>>'
        // initComplete: function() {
        //   $('#example1_wrapper')
        //     .find('#example1_filter,.dataTables_length')
        //     .hide();
        // }
      });
      // $('.dataTables_filter input').attr('placeholder', 'Search... ');

      $table.columns().every(function () {
        // $('#txtSearch').on('keyup change', function() {
        //   $table.search(this.value).draw();
        // });
        // user filter
        $('#ddlUserFilter').on('change', function () {
           const status = $(this).val();
          if (status === 'All') {
            $table
              .columns(4)
              .search('')
              .draw();
          } else if ($table.columns(4).search() !== this.value) {
            $table
              .columns(4)
              .search(this.value)
              .draw();
          } else { }
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
          } else { }
        });

      });

      // $('#ddlExample1Paging').on('change', function() {
      //   $('#example1_wrapper')
      //     .find('.dataTables_length')
      //     .find('select')
      //     .val($(this).val())
      //     .change();
      // });
    });

    //   $('#example1').DataTable({
    //     initComplete: function() {
    //       this.api()
    //         .columns([4,5])
    //         .every(function() {
    //           var column = this;
    //           var select = $('<select><option value=''></option></select>')
    //             .appendTo($(column.footer()).empty())
    //             .on('change', function() {
    //               var val = $.fn.dataTable.util.escapeRegex($(this).val());

    //               column.search(val ? '^' + val + '$' : '', true, false).draw();
    //             });

    //           column
    //             .data()
    //             .unique()
    //             .sort()
    //             .each(function(d, j) {
    //               select.append('<option value='' + d + ''>' + d + '</option>');
    //             });
    //         });
    //     }
    //   });
    // });

    // $('.statusFilter').click(function() {
    //   $('.statusFilter').removeClass('active2');
    //   $(this).addClass('active2');
    // });

    // $('.userFilter').click(function() {
    //   $('.userFilter').removeClass('active2');
    //   $(this).addClass('active2');
    // });
  }

  editUser(user) {
    this.createForm(user);
    $('#editUserModal').modal('show');
  }

  createForm(user) {
    this.editForm = this.fb.group({
      firstName: [user == null ? null : user.FirstName, Validators.required],
      lastName: [user == null ? null : user.LastName, Validators.required],
      organisation: [user == null ? null : user.Organisation, Validators.required],
      addressLine1: [user == null ? null : user.AddressLine1, Validators.required],
      addressLine2: [user == null ? null : user.AddressLine2, Validators.required],
      postalCode: [user == null ? null : user.PostalCode, Validators.compose([Validators.required,  Validators.minLength(4)])],
      email: [user == null ? null : user.Email, Validators.compose([Validators.required, Validators.email])],
      mobileNumber: [user == null ? null : user.MobileNumber, Validators.compose([Validators.required, Validators.minLength(10)])],
      role: [user == null ? 1 : user.UserTypeCode],
      status: [user == null ? 1 : user.StatusCode]
    });
  }
}
