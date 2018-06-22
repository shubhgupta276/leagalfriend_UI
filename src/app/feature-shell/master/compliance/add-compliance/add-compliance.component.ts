import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Compliance } from '../compliance';
import { ComplianceService } from '../compliance.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { StageService } from '../../stage/stage.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

export interface KeyValue {
  id: number;
  name: string;
}

declare var $;

@Component({
  selector: 'app-add-compliance',
  templateUrl: '../add-compliance/add-compliance.component.html'
})
export class AddComplianceMasterComponent implements OnInit {

  @Input() tableInputData: any[];
  @Input() arRecourse: any[];
  @Input() @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  @Input() arStatus: any[];
  arStage: any[];
  selectedRecourse: any = "";
  addComplianceMasterForm: FormGroup;
  isComplianceAlreadyExists: boolean = false;
  AddComplianceMaster() {
    this.addComplianceMasterForm = this.fb.group({
      recourse: ['', Validators.required],
      stage: ['', Validators.required],
      compliance: [null, Validators.required],
      status: ['', Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _complianceService: ComplianceService,
    private _stageService: StageService,
    private _storageService: StorageService) {
    this.AddComplianceMaster();
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

  submitAddComplianceMaster(data) {

    const reqData = {
      recourse: {
        id: data.recourse.id,
      },
      stage: {
        id: data.stage.id,
      },
      complianceName: data.compliance,
      statusId: { statusId: data.status.statusId, statusName: data.status.statusName },
      userId: this._storageService.getUserId()
    };
    this._complianceService.addCompliance(reqData).subscribe(
      result => {
        const _result = result.body;

        if (_result.httpCode === 200) { // success
          this.tableInputData.push(
            {
              id: _result.id,
              complianceName: data.compliance,
              recourse: data.recourse,
              recourseName: data.recourse.recourseName,
              recourseCode: data.recourse.recourseCode,
              recourseId: data.recourse.id,
              stageName: data.stage.stageName,
              stageCode: data.stage.stageCode,
              stageId: data.stage.id,
              statusId: data.status.statusId,
              statusName: data.status.statusName
            });
          this.dataTableComponent.ngOnInit();
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $('#closebtn1').click();
  }

  ngOnInit() {
    this.subscriberFields();
  }

  subscriberFields() {
    this.addComplianceMasterForm.get('compliance').valueChanges.subscribe(
      (e) => {
        if (this.tableInputData.filter(x => x.complianceName.toUpperCase() === e.toUpperCase()).length > 0) {
          this.isComplianceAlreadyExists = true;
        } else {
          this.isComplianceAlreadyExists = false;
        }
      }
    );
  }
}
