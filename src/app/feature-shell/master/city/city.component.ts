import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { AddCityMasterComponent } from './add-city/add-city.component';
import { EditCityMasterComponent } from './edit-city/edit-city.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from './city.service'
import { City } from './city'
import { StorageService } from '../../../shared/services/storage.service';
declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      CityComponent,
      AddCityMasterComponent,
      EditCityMasterComponent
    ],
    providers: [CityService, StorageService]
  }
)

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.css"]
})
export class CityComponent implements OnInit {
  arCityData: City[] = [];
  editDetails: City;
  constructor(private fb: FormBuilder, private _cityService: CityService, private _storageService: StorageService) {

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
    var reqObj = {
      email: this._storageService.getUserEmail(),
    };

    this._cityService.getCities(reqObj).subscribe(
      result => {
        result = result.body;
        if (result.httpCode == 200) {
          for (var i = 0; i < result.cities.length; i++) {
            const obj = result.cities[i];

            this.arCityData.push({
              cityName: obj.cityName,
              id: obj.id
            });
          }
        }

      },
      err => {
        console.log(err);
        this.arCityData = [];

      });

  }

}
