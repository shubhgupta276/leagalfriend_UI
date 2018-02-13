import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare let $;
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllState();
    $($.document).ready(function () {

      var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
      var selectedPageLength = 15;

      var $table = $("#example1").DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        lengthMenu: arLengthMenu,
        pageLength: selectedPageLength,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        },
        initComplete: function () {
          var tableid = "example1";
          var $rowSearching = $("#" + tableid + "_wrapper");
          $rowSearching.find(".row:eq(0)").hide();

          for (var i = 0; i < arLengthMenu[0].length; i++) {
            $("#ddlLengthMenu").append("<option value=" + arLengthMenu[0][i] + ">" + arLengthMenu[1][i] + "</option>");
          }
          $("#ddlLengthMenu").val(selectedPageLength);

          $("#ddlLengthMenu").on("change", function () {
            $rowSearching.find(".row:eq(0)").find("select").val($(this).val()).change();
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

    });
  }
  GetAllState()
  {
    this.arr=[
      {State:"Uttar Pradesh"},
      {State:"Andhra Pradesh"},
      {State:"Arunachal Pradesh"},
      {State:"Assam"},
      {State:"Bihar"},
      {State:"Chandigarh "},
      {State:"Chhattisgarh"},
      {State:"Goa"},
      {State:"Dadra and Nagar Haveli "},
      {State:"Gujarat"},
      {State:"Haryana"},
      {State:"Himachal Pradesh"},
      {State:"Jammu & Kashmir"},
      {State:"Jharkhand"},
      {State:"Karnataka"},
      {State:"Kerala"},
      {State:"Lakshadweep "},
      {State:"Madhya Pradesh"},
      {State:"Maharashtra"},
      {State:"Manipur"},
      {State:"Meghalaya"},
      {State:"Mizoram"},
      {State:"Nagaland"},
      {State:"National Capital Territory of Delhi "},
      {State:"Odisha"},
      {State:"Puducherry "},
      {State:"Punjab"},
      {State:"Rajasthan"},
      {State:"Sikkim"},
      {State:"Tripura"},

      
      
    ];
  }
  
showEditModal(){
  $('#editStateMasterModal').modal('show');
  }

}
