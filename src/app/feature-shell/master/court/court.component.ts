import { Component, OnInit } from '@angular/core';
import { AddCourtMasterComponent } from "./add-court/add-court.component";
import { EditCourtMasterComponent } from "./edit-court/edit-court.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourtService } from './court.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Court } from './court';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      CourtComponent,
      AddCourtMasterComponent,
      EditCourtMasterComponent,
    ],
    providers: [CourtService, StorageService]
  }
)
@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
  arr: Court[] = [];
  editDetails: any;
  constructor(private fb: FormBuilder, private _courtService: CourtService, private _storageService: StorageService) {

  }
  editCourtMasterForm: FormGroup;
  ngOnInit() {
    this.GetAllCourt();
  }

  showEditModal(data) {
    this.editDetails = data;
    $('#editCourtMasterModal').modal('show');

  }
  GetAllCourt() {
    var reqObj = {
      email: this._storageService.getUserEmail(),
    };

    this._courtService.getCourts(reqObj).subscribe(
      result => {
        result = result.body;
        if (result.httpCode == 200) {

          for (var i = 0; i < result.courts.length; i++) {
            const obj = result.courts[i];
            
            this.arr.push({
              courtName: obj.courtName,
              courtDesc: obj.courtDesc,
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


}
