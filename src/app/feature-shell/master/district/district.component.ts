import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, NgModule } from "@angular/core";
import { AddDistrictMasterComponent } from './add-district/add-district.component';
import { EditDistrictMasterComponent } from './edit-district/edit-district.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistrictService } from './district.service'
import { StorageService } from '../../../shared/services/storage.service';
import { District } from './district';
declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      DistrictComponent,
      AddDistrictMasterComponent,
      EditDistrictMasterComponent
    ],
    providers: [DistrictService]
  }
)
@Component({
  selector: "app-district",
  templateUrl: "./district.component.html",
  styleUrls: ["./district.component.css"]
})
export class DistrictComponent implements OnInit {
  arr: District[] = [];
  constructor(private fb: FormBuilder, private _districtService: DistrictService, private _storageService: StorageService) {

  }
  editDistrictMasterForm: FormGroup;
  @ViewChild(EditDistrictMasterComponent) editChild: EditDistrictMasterComponent;
  ngOnInit() {
    this.GetAllDistrict();

  }

  GetAllDistrict() {

    this._districtService.getDistricts().subscribe(
      result => {
        
        if (result.httpCode == 200) {

          for (var i = 0; i < result.districts.length; i++) {

            const obj = result.districts[i];

            this.arr.push({
              districtName: obj.districtName,
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
  }

  showEditModal(data) {
    this.editChild.createForm(data);
    $('#editDistrictMasterModal').modal('show');
  }

}
