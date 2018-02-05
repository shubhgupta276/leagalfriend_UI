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
declare var $;

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  arr: any[];
  usertype: string = "All";
  filterby: string = "All";

  constructor() {}

  ngOnInit() {
    this.GetAllCustomer();
  }

  showEditModal(){
    $('#editUserModal').modal('show');
    }

  GetAllCustomer() {
    this.arr = [
      {
        Status: "Active",
        CustomerName: "Puneet Chauhan",
        Organisation: "GlobalLogic",
        Email: "Puneet.kumar@globallogic.com",
        Mobile: "9910398806",
        Address: "Sector-15,Noida",
        UserType: "Manager"
      },
      {
        Status: "Active",
        CustomerName: "Anup",
        Organisation: "GlobalLogic",
        Email: "Puneet.kumar@globallogic.com",
        Mobile: "9910398806",
        Address: "Sector-15,Noida",
        UserType: "Manager"
      },
      {
        Status: "Active",
        CustomerName: "Vipin Rawat",
        Organisation: "GlobalLogic",
        Email: "Vipin.singh1@globallogic.com",
        Mobile: "9910398806",
        Address: "Delhi",
        UserType: "Manager"
      },
      {
        Status: "Trial",
        CustomerName: "Anjani",
        Organisation: "GlobalLogic",
        Email: "Anjani.singh1@globallogic.com",
        Mobile: "9910398806",
        Address: "Delhi",
        UserType: "Manager"
      },

      {
        Status: "Expired",
        CustomerName: "Kamal",
        Organisation: "GlobalLogic",
        Email: "Kamal.singh1@globallogic.com",
        Mobile: "9910398806",
        Address: "Agra",
        UserType: "Manager"
      },

      {
        Status: "Active",
        CustomerName: "Anjali",
        Organisation: "GlobalLogic",
        Email: "Anjali.singh1@globallogic.com",
        Mobile: "8483939202",
        Address: "MP",
        UserType: "Manager"
      },

      {
        Status: "Trial",
        CustomerName: "Rakesh",
        Organisation: "GlobalLogic",
        Email: "Rakesh.singh1@globallogic.com",
        Mobile: "9910398806",
        Address: "Patna",
        UserType: "Manager"
      },

      {
        Status: "Expired",
        CustomerName: "Vinay",
        Organisation: "GlobalLogic",
        Email: "Vinay.singh1@globallogic.com",
        Mobile: "7575484733",
        Address: "Lucknow",
        UserType: "Manager"
      },

      {
        Status: "Active",
        CustomerName: "Abi",
        Organisation: "GlobalLogic",
        Email: "Abi.singh1@globallogic.com",
        Mobile: "9758460007",
        Address: "Moradabad",
        UserType: "Employee"
      },

      {
        Status: "Expired",
        CustomerName: "Kamal",
        Organisation: "GlobalLogic",
        Email: "Kamal.singh1@globallogic.com",
        Mobile: "9910398806",
        Address: "Agra",
        UserType: "Client"
      },

      {
        Status: "Expired",
        CustomerName: "Kamal",
        Organisation: "GlobalLogic",
        Email: "Kamal.singh1@globallogic.com",
        Mobile: "9910398806",
        Address: "Agra",
        UserType: "Client"
      },
      {
        Status: "Expired",
        CustomerName: "Ravi",
        Organisation: "GlobalLogic",
        Email: "Ravi.singh1@globallogic.com",
        Mobile: "8474747479",
        Address: "Agra",
        UserType: "Client"
      },
      {
        Status: "Expired",
        CustomerName: "Rohit",
        Organisation: "GlobalLogic",
        Email: "Rohit.singh1@globallogic.com",
        Mobile: "74748389839",
        Address: "Dhampur",
        UserType: "Manager"
      },
      {
        Status: "Trial",
        CustomerName: "Mohit",
        Organisation: "GlobalLogic",
        Email: "Mohit.singh1@globallogic.com",
        Mobile: "7484747474",
        Address: "Saharanpur",
        UserType: "Manager"
      },
      {
        Status: "Expired",
        CustomerName: "Rajat",
        Organisation: "GlobalLogic",
        Email: "Rajat.singh1@globallogic.com",
        Mobile: "74874747473",
        Address: "Jaipur",
        UserType: "Manager"
      },
      {
        Status: "Expired",
        CustomerName: "Akshay",
        Organisation: "GlobalLogic",
        Email: "Akshay.singh1@globallogic.com",
        Mobile: "74874747473",
        Address: "Agra",
        UserType: "Employee"
      },
      {
        Status: "Expired",
        CustomerName: "Monika",
        Organisation: "GlobalLogic",
        Email: "Monika.singh1@globallogic.com",
        Mobile: "74874747473",
        Address: "Delhi",
        UserType: "Employee"
      },
      {
        Status: "Expired",
        CustomerName: "Sumit",
        Organisation: "GlobalLogic",
        Email: "Sumit.singh1@globallogic.com",
        Mobile: "74874747473",
        Address: "Delhi",
        UserType: "Manager"
      },
      {
        Status: "Expired",
        CustomerName: "Rohan",
        Organisation: "GlobalLogic",
        Email: "Rohan.singh1@globallogic.com",
        Mobile: "74874747473",
        Address: "Delhi",
        UserType: "Manager"
      },
      {
        Status: "Expired",
        CustomerName: "Monika",
        Organisation: "GlobalLogic",
        Email: "Monika.singh1@globallogic.com",
        Mobile: "74874747473",
        Address: "Delhi",
        UserType: "Manager"
      },
      {
        Status: "Expired",
        CustomerName: "Shiva",
        Organisation: "GlobalLogic",
        Email: "Shiva.singh1@globallogic.com",
        Mobile: "74874747473",
        Address: "Nepal",
        UserType: "Manager"
      },
      {
        Status: "Expired",
        CustomerName: "Mahesh",
        Organisation: "GlobalLogic",
        Email: "Mahesh.singh1@globallogic.com",
        Mobile: "87378373798",
        Address: "UP",
        UserType: "Manager"
      }
    ];

    $($.document).ready(function() {
      var $table = $("#example1").DataTable({
        columns: [
          { name: "#", orderable: true },
          { name: "Name", orderable: true },
          { name: "Email", orderable: true },
          { name: "Phone", orderable: true },
          { name: "Role", orderable: false },
          { name: "Status", orderable: false }
        ],
        // scrollY:        '65vh',
        // scrollCollapse: true,
        "lengthMenu": [[10, 15, 25, -1], [10, 15, 25, "All"]],
        "pageLength": 15,
        "oLanguage": {
          "sLengthMenu": "Show _MENU_ rows",
          "sSearch": "",
          "sSearchPlaceholder": 'Search...'
        }
        // "dom": "<'row'<'col-sm-12'f>>" + "<'row'<'col-sm-12'tr>>" +
        // "<'row'<'col-sm-2'l><'col-sm-6'i><'col-sm-4'p>>"
        // initComplete: function() {
        //   $("#example1_wrapper")
        //     .find("#example1_filter,.dataTables_length")
        //     .hide();
        // }
      });
      // $('.dataTables_filter input').attr("placeholder", 'Search... ');

      $table.columns().every(function() {
        // $("#txtSearch").on("keyup change", function() {
        //   $table.search(this.value).draw();
        // });
        //user filter
        $("#ddlUserFilter").on("change", function() {
          var status = $(this).val();
          if (status == "All") {
            $table
              .columns(4)
              .search("")
              .draw();
          }else if ($table.columns(4).search() !== this.value){
            $table
              .columns(4)
              .search(this.value)
              .draw();
          }else{};
        });
        //status filter
        $("#ddlStatusFilter").on("change", function() {
          var status = $(this).val();
          if (status == "All"){
            $table
              .columns(5)
              .search("")
              .draw();
          }else if ($table.columns(5).search() !== this.value){
            $table
              .columns(5)
              .search(this.value)
              .draw();
          }else{};
        });
        
      });

      // $("#ddlExample1Paging").on("change", function() {
      //   $("#example1_wrapper")
      //     .find(".dataTables_length")
      //     .find("select")
      //     .val($(this).val())
      //     .change();
      // });
    });

    //   $("#example1").DataTable({
    //     initComplete: function() {
    //       this.api()
    //         .columns([4,5])
    //         .every(function() {
    //           var column = this;
    //           var select = $('<select><option value=""></option></select>')
    //             .appendTo($(column.footer()).empty())
    //             .on("change", function() {
    //               var val = $.fn.dataTable.util.escapeRegex($(this).val());

    //               column.search(val ? "^" + val + "$" : "", true, false).draw();
    //             });

    //           column
    //             .data()
    //             .unique()
    //             .sort()
    //             .each(function(d, j) {
    //               select.append('<option value="' + d + '">' + d + "</option>");
    //             });
    //         });
    //     }
    //   });
    // });

    // $(".statusFilter").click(function() {
    //   $(".statusFilter").removeClass("active2");
    //   $(this).addClass("active2");
    // });

    // $(".userFilter").click(function() {
    //   $(".userFilter").removeClass("active2");
    //   $(this).addClass("active2");
    // });
  }
}
