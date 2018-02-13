import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { AddDistrictMasterComponent } from './add-district/add-district.component';
import { EditDistrictMasterComponent } from './edit-district/edit-district.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      DistrictComponent,
      AddDistrictMasterComponent,
      EditDistrictMasterComponent
    ]
  }
)
@Component({
  selector: "app-district",
  templateUrl: "./district.component.html",
  styleUrls: ["./district.component.css"]
})
export class DistrictComponent implements OnInit {
  arr: any[];
  constructor(private fb: FormBuilder) {
    this.EditDistrictMaster(null);
   }
  editDistrictMasterForm: FormGroup;
  ngOnInit() {
    this.GetAllDistrict();
    $($.document).ready(function () {

      var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
      var selectedPageLength = 15;

      var $table = $("#example2").DataTable({
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
          var tableid = "example2";
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

  GetAllDistrict() {
    this.arr = [
      { District: "Bijnor" },
      { District: "Moradabad" },
      { District: "Gaziabaad" },
      { District: "Adilabad" },
      { District: "Agra" },
      { District: "Ahmed Nagar" },
      { District: "Ahmedabad" },
      { District: "Aizawl" },
      { District: "Ajmer" },
      { District: "Akola" },
      { District: "Alappuzha" },
      { District: "Aligarh" },
      { District: "Alirajpur" },
      { District: "Allahabad" },
      { District: "Almora" },
      { District: "Alwar" },
      { District: "Ambala" },
      { District: "Amravati" },
      { District: "Amreli" },
      { District: "Amritsar" }
    ];
  }

  showEditModal(data) {
    $('#editDistrictMasterModal').modal('show');
    this.EditDistrictMaster(data);
  }
  EditDistrictMaster(data) {
    this.editDistrictMasterForm = this.fb.group({
      district: [data == null ? null : data.District, Validators.required]
    });
  }
}
