import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
// import { UserRoles, UserStatus, KeyValue } from '../../shared/Utility/util-common';
// import { matchValidator } from '../../shared/Utility/util-custom.validation';
declare var $;

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  arr: any[];
  usertype: string;
  filterby: string = "All";

  constructor() {  }

  ngOnInit() {
    // setTimeout(function () {
    //   $('#example1').dataTable();
    // }, 50);
    // this.bindDataTable();
    // setTimeout(function() {
    //   $("#example1").dataTable();
    // }, 50);
    // this.GetAllCustomer();
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
        CustomerName: "Vipin",
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
    this.bindDataTable();
    // var table = $("#example1").DataTable();

    // // #myInput is a <input type="text"> element
    // $("#myInput").on("keyup", function() {
    //   table.search(this.value).draw();
    // });
  }

  destroyTable(){
    $('#example1').DataTable().destroy();
    this.bindDataTable();
  }

  bindDataTable() {
    $($.document).ready(function() {
      var newTable = $("#example1").DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false
      });
      $("#myInput").on("keyup", function() {
        newTable.search(this.value).draw();
      });
    });
  }

  // GetAllCustomer() {
  //   this.arr = [
  //     {
  //       Status: "Active",
  //       CustomerName: "Puneet Chauhan",
  //       Organisation: "GlobalLogic",
  //       Email: "Puneet.kumar@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Sector-15,Noida",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Active",
  //       CustomerName: "Anup",
  //       Organisation: "GlobalLogic",
  //       Email: "Puneet.kumar@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Sector-15,Noida",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Active",
  //       CustomerName: "Vipin",
  //       Organisation: "GlobalLogic",
  //       Email: "Vipin.singh1@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Delhi",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Trial",
  //       CustomerName: "Anjani",
  //       Organisation: "GlobalLogic",
  //       Email: "Anjani.singh1@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Delhi",
  //       UserType: "Manager"
  //     },

  //     {
  //       Status: "Expired",
  //       CustomerName: "Kamal",
  //       Organisation: "GlobalLogic",
  //       Email: "Kamal.singh1@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Agra",
  //       UserType: "Manager"
  //     },

  //     {
  //       Status: "Active",
  //       CustomerName: "Anjali",
  //       Organisation: "GlobalLogic",
  //       Email: "Anjali.singh1@globallogic.com",
  //       Mobile: "8483939202",
  //       Address: "MP",
  //       UserType: "Manager"
  //     },

  //     {
  //       Status: "Trial",
  //       CustomerName: "Rakesh",
  //       Organisation: "GlobalLogic",
  //       Email: "Rakesh.singh1@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Patna",
  //       UserType: "Manager"
  //     },

  //     {
  //       Status: "Expired",
  //       CustomerName: "Vinay",
  //       Organisation: "GlobalLogic",
  //       Email: "Vinay.singh1@globallogic.com",
  //       Mobile: "7575484733",
  //       Address: "Lucknow",
  //       UserType: "Manager"
  //     },

  //     {
  //       Status: "Active",
  //       CustomerName: "Abi",
  //       Organisation: "GlobalLogic",
  //       Email: "Abi.singh1@globallogic.com",
  //       Mobile: "9758460007",
  //       Address: "Moradabad",
  //       UserType: "Employee"
  //     },

  //     {
  //       Status: "Expired",
  //       CustomerName: "Kamal",
  //       Organisation: "GlobalLogic",
  //       Email: "Kamal.singh1@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Agra",
  //       UserType: "Client"
  //     },

  //     {
  //       Status: "Expired",
  //       CustomerName: "Kamal",
  //       Organisation: "GlobalLogic",
  //       Email: "Kamal.singh1@globallogic.com",
  //       Mobile: "9910398806",
  //       Address: "Agra",
  //       UserType: "Client"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Ravi",
  //       Organisation: "GlobalLogic",
  //       Email: "Ravi.singh1@globallogic.com",
  //       Mobile: "8474747479",
  //       Address: "Agra",
  //       UserType: "Client"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Rohit",
  //       Organisation: "GlobalLogic",
  //       Email: "Rohit.singh1@globallogic.com",
  //       Mobile: "74748389839",
  //       Address: "Dhampur",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Trial",
  //       CustomerName: "Mohit",
  //       Organisation: "GlobalLogic",
  //       Email: "Mohit.singh1@globallogic.com",
  //       Mobile: "7484747474",
  //       Address: "Saharanpur",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Rajat",
  //       Organisation: "GlobalLogic",
  //       Email: "Rajat.singh1@globallogic.com",
  //       Mobile: "74874747473",
  //       Address: "Jaipur",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Akshay",
  //       Organisation: "GlobalLogic",
  //       Email: "Akshay.singh1@globallogic.com",
  //       Mobile: "74874747473",
  //       Address: "Agra",
  //       UserType: "Employee"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Monika",
  //       Organisation: "GlobalLogic",
  //       Email: "Monika.singh1@globallogic.com",
  //       Mobile: "74874747473",
  //       Address: "Delhi",
  //       UserType: "Employee"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Sumit",
  //       Organisation: "GlobalLogic",
  //       Email: "Sumit.singh1@globallogic.com",
  //       Mobile: "74874747473",
  //       Address: "Delhi",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Rohan",
  //       Organisation: "GlobalLogic",
  //       Email: "Rohan.singh1@globallogic.com",
  //       Mobile: "74874747473",
  //       Address: "Delhi",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Monika",
  //       Organisation: "GlobalLogic",
  //       Email: "Monika.singh1@globallogic.com",
  //       Mobile: "74874747473",
  //       Address: "Delhi",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Shiva",
  //       Organisation: "GlobalLogic",
  //       Email: "Shiva.singh1@globallogic.com",
  //       Mobile: "74874747473",
  //       Address: "Nepal",
  //       UserType: "Manager"
  //     },
  //     {
  //       Status: "Expired",
  //       CustomerName: "Mahesh",
  //       Organisation: "GlobalLogic",
  //       Email: "Mahesh.singh1@globallogic.com",
  //       Mobile: "87378373798",
  //       Address: "UP",
  //       UserType: "Manager"
  //     }
  //   ];
  //   debugger;
  //   this.arr = this.arr.filter(
  //     f =>
  //       this.filterby == "All"
  //         ? 1 == 1
  //         : f.Status == this.filterby || f.UserType == this.filterby
  //   );
  //   // this.bindDataTable();
  //   // $("#example1").dataTable();
  // }

  FilterGridData(filterby: string) {
    // this.filterby = filterby;
    // // $('#example1').DataTable().destroy();
    // this.GetAllCustomer();
    // this.bindDataTable();
  }
}
