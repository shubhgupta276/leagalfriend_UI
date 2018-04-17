import { Component, OnInit } from '@angular/core';
import { AddComplianceMasterComponent } from "./add-compliance/add-compliance.component";
import { EditComplianceMasterComponent } from "./edit-compliance/edit-compliance.component";
import { CommonModule } from '@angular/common';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComplianceService } from './compliance.service';
import { StorageService } from '../../../shared/services/storage.service';
import { RecourseService } from '../resource/recourse.service';
import { StageService } from '../stage/stage.service';
import { Compliance } from './compliance';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ComplianceComponent,
      AddComplianceMasterComponent,
      EditComplianceMasterComponent,
    ],
    providers: [ComplianceService, StorageService, RecourseService, StageService]
  }
)
@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent implements OnInit {
  @ViewChild(EditComplianceMasterComponent) editChild: EditComplianceMasterComponent;
  arr: Compliance[] = [];
  arRecourse: any[];
  arStage: any[];
  arStatus: any[];
  editComplianceMasterForm: FormGroup;

  constructor(private fb: FormBuilder, private _complianceService: ComplianceService,
    private _storageService: StorageService, private _recourseService: RecourseService, private _stageService: StageService) {
  }
  ngOnInit() {
    this.getAllCompliance();
    this.getRecourse();
    this.getStage();
    this.getStatus();
  }
  showEditModal(data) {
    this.editChild.createForm(data);
    $('#editComplianceMasterModal').modal('show');
  }
  getAllCompliance() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this._complianceService.getCompliances(reqData).subscribe(
      result => {
debugger
        if (result.httpCode == 200) {
          for (var i = 0; i < result.complianceStageRecourses.length; i++) {
            const obj = result.complianceStageRecourses[i];
            
            this.arr.push({
              compliance: obj.complianceName,
              stage:  obj.stageCode,
              stageId: obj.stageCode,
              recourse: obj.recourseCode,
              recourseId: obj.recourseCode,
              status: null,
              statusId: obj.statusId,
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

  getStage() {

    this._stageService.getStages().subscribe(
      result => {

        if (result != null) {
          this.arStage = result.stageRecourses;
        }
        else {
          console.log(result);
        }
      },
      err => {
        console.log(err);
        this.arStage = [];

      });
  }
  getStatus() {

    this._complianceService.getStatus().subscribe(
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
        this.arStatus = [];

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
