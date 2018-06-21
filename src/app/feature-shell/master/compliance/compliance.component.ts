import { Component, OnInit } from '@angular/core';
import { AddComplianceMasterComponent } from './add-compliance/add-compliance.component';
import { EditComplianceMasterComponent } from './edit-compliance/edit-compliance.component';
import { CommonModule } from '@angular/common';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComplianceService } from './compliance.service';
import { StorageService } from '../../../shared/services/storage.service';
import { RecourseService } from '../resource/recourse.service';
import { StageService } from '../stage/stage.service';
import { Compliance } from './compliance';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { complianceTableConfig } from './compliance.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';

declare let $;

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent implements OnInit {
  @ViewChild(EditComplianceMasterComponent) editChild: EditComplianceMasterComponent;
  arRecourse: any[];
  arStage: any[];
  arStatus: any[];
  editComplianceMasterForm: FormGroup;
  tableInputData = [];
  columns = complianceTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;
  showEditComponent = true;
  constructor(private fb: FormBuilder, private _complianceService: ComplianceService,
    private _storageService: StorageService, private _recourseService: RecourseService, private _stageService: StageService) {
  }
  ngOnInit() {
    this.setActionConfig();
    this.getAllCompliance();
    this.getRecourse();
    this.getStage();
    this.getStatus();
    var self = this;
    $("body").on("hidden.bs.modal", "#editComplianceMasterModal", function () {
      self.showEditComponent = false;
    })

  }
  getAllCompliance() {
    const $this = this;
    const reqData = {
      email: this._storageService.getUserEmail(),
    };
    this._complianceService.getCompliances(reqData).subscribe(
      result => {
        if (result.httpCode === 200) {
          for (let i = 0; i < result.compliances.length; i++) {
            const obj = result.compliances[i];
            this.tableInputData.push({
              id: obj.id,
              complianceName: obj.complianceName,
              recourse: obj.recourse,
              recourseName: obj.recourse.recourseName,
              recourseCode: obj.recourse.recourseCode,
              recourseId: obj.recourse.id,
              stage: obj.stage,
              stageName: obj.stage.stageName,
              stageCode: obj.stage.stageCode,
              stageId: obj.stage.id,
              status: obj.statusId,
              statusId: obj.statusId.statusId,
              statusName: obj.statusId.statusName
            });
          }
          this.dataTableComponent.ngOnInit();
        } else {
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
        } else {
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
          this.arStage = result.stages;
        } else {
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
        } else {
          console.log(result);
        }
      },
      err => {
        console.log(err);
        this.arStatus = [];

      });
  }

  onRowClick(event) {
    console.log(event);
  }
  onRowDoubleClick(event) {
    this.showEditComponent = true;
    setTimeout(() => {
      this.editChild.createForm(event);
      $('#editComplianceMasterModal').modal('show');
    }, 10);


  }

  onRowSelect(event) {
    console.log(event);
  }

  onActionBtnClick(event) {
    if (event.eventType === 'edit') {
      this.editChild.createForm(event.data);
      $('#editComplianceMasterModal').modal('show');
    }
  }

  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = true;
  }
}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [
      ComplianceComponent,
      AddComplianceMasterComponent,
      EditComplianceMasterComponent,
    ],
    providers: [ComplianceService, StorageService, RecourseService, StageService]
  }
)

export class ComplianceModule { }
