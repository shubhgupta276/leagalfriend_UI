import { Component, OnInit } from '@angular/core';
import { AddStageMasterComponent } from "./add-stage/add-stage.component";
import { EditStageMasterComponent } from "./edit-stage/edit-stage.component";
import { CommonModule } from '@angular/common';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stage } from './stage';
import { StageService } from './stage.service';
import { StorageService } from '../../../shared/services/storage.service';
import { RecourseService } from '../resource/recourse.service';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      StageComponent,
      AddStageMasterComponent,
      EditStageMasterComponent,
    ],
    providers: [StageService, StorageService]
  }
)
@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  arr: Stage[] = [];
  arStatus: any[] = [];
  arRecourse: any[] = [];
  editStageMasterForm: FormGroup;
  @ViewChild(EditStageMasterComponent) editChild: EditStageMasterComponent;
  constructor(private fb: FormBuilder, private _stageService: StageService, private _storageService: StorageService,
    private _recourseService: RecourseService) {
  }

  ngOnInit() {
    this.GetAllStage();
    this.getStatus();
    this.getRecourse();

  }
  GetAllStage() {
    ;
    this._stageService.getStages().subscribe(
      result => {

        if (result.httpCode == 200) {
          for (var i = 0; i < result.stageRecourses.length; i++) {
            const obj = result.stageRecourses[i];

            this.arr.push(
              {
                stageCode: obj.stageCode,
                stageName: obj.stageName,
                recourse: obj.recourseId,
                recourseCode: obj.recourseCode,
                status: obj.stageStatusId,
                id: obj.id
              }
            );

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
  getStatus() {

    this._stageService.getStatus().subscribe(
      result => {

        if (result != null) {
          this.arStatus = result;
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
  getRecourse() {

    this._recourseService.getResources().subscribe(
      result => {

        if (result != null) {
          this.arRecourse = result.recourses;
        }
        else {
          console.log(result);
        }
      },
      err => {
        console.log(err);
        this.arRecourse = [];

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

  showEditModal(data: Stage) {
    this.editChild.createForm(data);

    $('#editStageMasterModal').modal('show');
  }

}
