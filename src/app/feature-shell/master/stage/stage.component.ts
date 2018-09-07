import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AddStageMasterComponent } from "./add-stage/add-stage.component";
import { EditStageMasterComponent } from "./edit-stage/edit-stage.component";
import { CommonModule } from '@angular/common';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stage } from './stage';
import { StageService } from './stage.service';
import { StorageService } from '../../../shared/services/storage.service';
import { RecourseService } from '../resource/recourse.service';
import { stageTableConfig } from './stage.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';

declare let $;


@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class StageComponent implements OnInit {
  //arr: Stage[] = [];
  arStatus: any[] = [];
  arRecourse: any[] = [];
  editStageMasterForm: FormGroup;
  @ViewChild(EditStageMasterComponent) editChild: EditStageMasterComponent;
  tableInputData = [];
  columns = stageTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;

  constructor(private fb: FormBuilder, private _stageService: StageService, private _storageService: StorageService,
    private _recourseService: RecourseService) {
  }

  ngOnInit() {
    this.setActionConfig();
    this.GetAllStage();
    this.getStatus();
    this.getRecourse();

  }

  GetAllStage() {

    this._stageService.getStages().subscribe(
      result => {
        if (result.httpCode == 200) {

          for (var i = 0; i < result.stages.length; i++) {
            const obj = result.stages[i];
            if (obj.recourse) {
              this.tableInputData.push(
                {
                  stageCode: obj.stageCode,
                  stageName: obj.stageName,
                  recourseId: obj.recourse.id,
                  recourse: obj.recourse.recourseName,
                  status: obj.statusId,
                  id: obj.id
                }
              );
            }
          }
          this.dataTableComponent.ngOnInit();
        }
        else {
          console.log(result);
        }
      },
      err => {
        console.log(err);

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
  onRowClick(event) {
    console.log(event);
  }
  onRowDoubleClick(event) {
    // this.editChild.createForm(event);
    // $('#editStageMasterModal').modal('show');
  }

  onRowSelect(event) {
    console.log(event);
  }
  onActionBtnClick(event) {
    if (event.eventType === 'edit') {
      this.editChild.createForm(event.data);
      $('#editStageMasterModal').modal('show');
    }

  }

  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    // this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = false;
  }

}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [
      StageComponent,
      AddStageMasterComponent,
      EditStageMasterComponent,
    ],
    providers: [StageService, StorageService]
  }
)

export class StageModule { }

