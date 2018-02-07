import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import {
  UserRoles,
  UserStatus,
  KeyValue
} from "../../shared/Utility/util-common";
import { matchValidator } from "../../shared/Utility/util-custom.validation";
import { debug } from "util";
import { filter } from "rxjs/operators/filter";
import { User, Users } from "../../shared/models/user/user";
declare var $;

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  arr: User[];
  usertype = "All";
  filterby = "All";
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  ngOnInit() {
    this.GetAllCustomer();
  }

  showEditModal() {
    $("#editUserModal").modal("show");
  }

  GetAllCustomer() {
    this.arr = Users;
    $($.document).ready(function() {
      var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
      var selectedPageLength = 15;
      const $table = $("#example1").DataTable({
        columns: [
          { name: "#", orderable: true },
          { name: "Name", orderable: true },
          { name: "Email", orderable: true },
          { name: "Phone", orderable: true },
          { name: "Role", orderable: false },
          { name: "Status", orderable: false }
        ],
        lengthMenu: arLengthMenu,
        pageLength: selectedPageLength,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        },
        initComplete: function() {
          var tableid = "example1";
          var $rowSearching = $("#" + tableid + "_wrapper");
          $rowSearching.find(".row:eq(0)").hide();

          for (var i = 0; i < arLengthMenu[0].length; i++) {
            var selectText=(arLengthMenu[0][i]==selectedPageLength)?'selected':'';
            $("#ddlLengthMenu").append(
             

              "<option "+ selectText  +" value=" +
                arLengthMenu[0][i] +
                ">" +
                arLengthMenu[1][i] +
                "</option>"
            );
          }
          // $("#ddlLengthMenu").val(selectedPageLength);

          $("#ddlLengthMenu").on("change", function() {
            $rowSearching
              .find(".row:eq(0)")
              .find("select")
              .val($(this).val())
              .change();
          });
        }
      });

      $table.columns().every(function() {
        $("#txtSearch").on("keyup change", function() {
          if ($table.search() !== this.value) {
            $table.search(this.value).draw();
          }
        });
      });

      $table.columns().every(function() {
        // user filter
        $("#ddlUserFilter").on("change", function() {
          const status = $(this).val();
          if (status === "All") {
            $table
              .columns(4)
              .search("")
              .draw();
          } else if ($table.columns(4).search() !== this.value) {
            $table
              .columns(4)
              .search(this.value)
              .draw();
          } else {
          }
        });
        // status filter
        $("#ddlStatusFilter").on("change", function() {
          const status = $(this).val();
          if (status === "All") {
            $table
              .columns(5)
              .search("")
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
    });
  }

  editUser(user) {
    this.createForm(user);
    $("#editUserModal").modal("show");
  }

  createForm(user) {
    this.editForm = this.fb.group({
      firstName: [user == null ? null : user.FirstName, Validators.required],
      lastName: [user == null ? null : user.LastName, Validators.required],
      organisation: [
        user == null ? null : user.Organisation,
        Validators.required
      ],
      addressLine1: [
        user == null ? null : user.AddressLine1,
        Validators.required
      ],
      addressLine2: [
        user == null ? null : user.AddressLine2,
        Validators.required
      ],
      postalCode: [
        user == null ? null : user.PostalCode,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      email: [
        user == null ? null : user.Email,
        Validators.compose([Validators.required, Validators.email])
      ],
      mobileNumber: [
        user == null ? null : user.MobileNumber,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ],
      role: [user == null ? 1 : user.UserTypeCode],
      status: [user == null ? 1 : user.StatusCode]
    });
  }
}
