import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Compliance } from '../compliance';
import { ComplianceService } from '../compliance.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { StageService } from '../../stage/stage.service';

export interface KeyValue {
  id: number;
  name: string;
}

declare var $;

@Component({
  selector: 'app-edit-compliance',
  templateUrl: '../edit-compliance/edit-compliance.component.html'
})
export class EditComplianceMasterComponent implements OnInit, OnChanges {
  @Input() tableInputData: any[];
  @Input() arRecourse: any[];
  arStage: any[] = [];
  @Input() arStatus: any[];
  editDetails: Compliance;
  isComplianceAlreadyExists: boolean = false;
  editComplianceMasterForm: FormGroup;
  selectedRecourse: any;
  selectedStage: any;
  selectedStatus: any;
  constructor(private fb: FormBuilder, private _complianceService: ComplianceService,
    private _stageService: StageService, private _storageService: StorageService) {
  }

  ngOnInit() {
    this.createForm(null);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.editDetails !== undefined && changes.editDetails.currentValue !== undefined) {
      this.createForm(changes.editDetails.currentValue);
      this.subscriberFields();
    }

  }

  subscriberFields() {
    this.editComplianceMasterForm.get('compliance').valueChanges.subscribe(
      (e) => {
        const fieldValue = e.toUpperCase();
        if (this.editDetails.compliance.toUpperCase() !== fieldValue
          && this.tableInputData.filter(x => x.compliance.toUpperCase() === fieldValue).length > 0) {
          this.isComplianceAlreadyExists = true;
        } else {
          this.isComplianceAlreadyExists = false;
        }
      }
    );
  }

  changeRecourse(recourse: any) {
    this.arStage = [];
    if (recourse) {
      this._stageService.getRecourseStages(recourse.id).subscribe(
        result => {
          if (result.httpCode === 200) {
            result.stageRecourses.forEach(element => {
              this.arStage.push(element);
            });
          }
        });
    }
  }

  submitEditComplianceMaster(data) {
    const reqData = {
      complianceName: data.compliance,
      id: data.id,
      recourse: {
        id: this.selectedRecourse.id,
      },
      stage: {
        id: this.selectedStage.id,
      },
      statusId: { statusId: this.selectedStatus.statusId, statusName: this.selectedStatus.statusName },
      userId: this._storageService.getUserId()
    };

    this._complianceService.updateCompliance(reqData).subscribe(

      result => {

        const _result = result.body;
        if (_result.httpCode === 200) { // success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();

          const objFind = this.tableInputData.find(x => x.id === this.editDetails.id);
          objFind.complianceName = data.compliance;
          objFind.recourseName = this.selectedRecourse.recourseName;
          objFind.recourseCode = this.selectedRecourse.recourseCode;
          objFind.recourseId = this.selectedRecourse.id;
          objFind.stageName = this.selectedStage.stageName;
          objFind.stageCode = this.selectedStage.stageCode;
          objFind.stageId = this.selectedStage.id;
          objFind.statusId = this.selectedStatus.statusId;
          objFind.statusName = this.selectedStatus.statusName;
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $('#closebtn').click();
  }

  createForm(data: any) {
    debugger
    this.selectedRecourse = null;
    this.selectedStage = null;
    this.selectedStatus = null;
    
    this.editComplianceMasterForm = this.fb.group({
      recourse: [data == null ? "" : data.recourseId, Validators.required],
      stage: [data == null ? "" : data.stageId, Validators.required],
      compliance: [data == null ? null : data.complianceName, Validators.required],
      status: [data == null ? "" : data.statusId, Validators.required],
      id: [data == null ? null : data.id, Validators.required],
    });
    
    if (data != null) {
      this.selectedRecourse = data.recourse;
      this.selectedStage = data.stage;
      this.selectedStatus = data.status;
      this.changeRecourse(data.recourse);
      this.isComplianceAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}
