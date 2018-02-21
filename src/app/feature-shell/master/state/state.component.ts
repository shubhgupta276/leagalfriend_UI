import { AddStateMasterComponent } from './add-state/add-state.component';
import { EditStateMasterComponent } from './edit-state/edit-state.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      StateComponent,
      AddStateMasterComponent,
      EditStateMasterComponent
    ]
  }
)
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  arr: [any];
  editStateMasterForm: FormGroup;
  editDetails: any;
  constructor(private fb: FormBuilder) {

  }

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
  GetAllState() {
    this.arr = [
      { stateName: "Uttar Pradesh" },
      { stateName: "Andhra Pradesh" },
      { stateName: "Arunachal Pradesh" },
      { stateName: "Assam" },
      { stateName: "Bihar" },
      { stateName: "Chandigarh " },
      { stateName: "Chhattisgarh" },
      { stateName: "Goa" },
      { stateName: "Dadra and Nagar Haveli " },
      { stateName: "Gujarat" },
      { stateName: "Haryana" },
      { stateName: "Himachal Pradesh" },
      { stateName: "Jammu & Kashmir" },
      { stateName: "Jharkhand" },
      { stateName: "Karnataka" },
      { stateName: "Kerala" },
      { stateName: "Lakshadweep " },
      { stateName: "Madhya Pradesh" },
      { stateName: "Maharashtra" },
      { stateName: "Manipur" },
      { stateName: "Meghalaya" },
      { stateName: "Mizoram" },
      { stateName: "Nagaland" },
      { stateName: "National Capital Territory of Delhi " },
      { stateName: "Odisha" },
      { stateName: "Puducherry " },
      { stateName: "Punjab" },
      { stateName: "Rajasthan" },
      { stateName: "Sikkim" },
      { stateName: "Tripura" },
    ];
  }

  showEditModal(data) {
    this.editDetails = data;
    $('#editStateMasterModal').modal('show');
  }


}
