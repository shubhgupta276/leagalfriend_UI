import { Component, OnInit, NgModule, ViewChild } from "@angular/core";
import { AddInstitutionMasterComponent } from "./add-institution/add-institution.component";
import { EditInstitutionMasterComponent } from "./edit-institution/edit-institution.component";
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';
import { StorageService } from '../../../shared/services/storage.service';
import { CityService } from "../city/city.service";

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      InstitutionComponent,
      AddInstitutionMasterComponent,
      EditInstitutionMasterComponent
    ],
    providers: [InstitutionService, StorageService, CityService]
  }
)
@Component({
  selector: "app-institution",
  templateUrl: "./institution.component.html",
  styleUrls: ["./institution.component.css"]
})
export class InstitutionComponent implements OnInit {

  arr: Institution[] = [];
  editInstitutionMasterForm: FormGroup;
  editDetails: any;
  arCity: any[] = [];
  @ViewChild(EditInstitutionMasterComponent) editChild: EditInstitutionMasterComponent;
  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _cityService: CityService, private _storageService: StorageService) {

  }

  ngOnInit() {
    this.GetAllInstitute();
    this.bindCity();
  }

  showEditModal(data) {
    this.editChild.createForm(data);
    $('#editInstitutionMasterModal').modal('show');
  }

  GetAllInstitute() {
    this._institutionService.getInstitutions().subscribe(
      result => {
        if (result.httpCode == 200) {

          for (var i = 0; i < result.institutions.length; i++) {
            const obj = result.institutions[i];

            this.arr.push({
              institutionName: obj.institutionName,
              address: obj.address,
              billingAddress: obj.billingAddr,
              contactNo: obj.phone,
              contactPerson: obj.contactName,
              city: obj.city,
              cityId: obj.fkCity,//todo
              id: obj.id
            });
          }
          setTimeout(() => {
            this.bindDatatable();
          }, 1);

        }
        else {
          console.log(result);
        }
      },
      err => {
        console.log(err);
        this.arr = [];

      });
  }

  bindDatatable() {
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
  }

  bindCity() {
    this._cityService.getCities().subscribe(result => {
      if (result.httpCode == 200) {
        result.cities.forEach(item => {
          this.arCity.push(item);
        });
      }
    })

  }
}
