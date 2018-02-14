import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { AddCityMasterComponent } from './add-city/add-city.component';
import { EditCityMasterComponent } from './edit-city/edit-city.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      CityComponent,
      AddCityMasterComponent,
      EditCityMasterComponent
    ]
  }
)

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.css"]
})
export class CityComponent implements OnInit {
  arCityData: any[] = [];
  editDetails: any;
  constructor(private fb: FormBuilder) {

  }
  editCityMasterForm: FormGroup;
  ngOnInit() {
    this.getCityData();
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
  showEditModal(data) {
    this.editDetails = data;
    $('#editCityMasterModal').modal('show');

  }

  getCityData() {
    this.arCityData.push(
      { BankCity: "24_PARGANAS_NORTH" },
      { BankCity: "AADIPUR" },
      { BankCity: "AARA" },
      { BankCity: "AASIND" },
      { BankCity: "AASPURE" },
      { BankCity: "ABDASA" },
      { BankCity: "ABOHAR" },
      { BankCity: "ABU_ROAD" },
      { BankCity: "ACHALPUR_CITY" },
      { BankCity: "ACHAMPET" },
      { BankCity: "ADDANKI" }
    );
  }

}
