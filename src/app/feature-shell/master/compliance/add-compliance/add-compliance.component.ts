import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-add-compliance',
  templateUrl: '../add-compliance/add-compliance.component.html'
})
export class AddComplianceMasterComponent implements OnInit {

  @Input() tableInputData: any[];
  @Input() arRecourse: any[];
  arStage: any[];
  @Input() arStatus: any[];
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

  changeRecourse(recourseId) {
    this.arStage = [];
    this._stageService.getRecourseStages(recourseId).subscribe(
      result => {
        if (result.httpCode === 200) {
          result.stageRecourses.forEach(element => {
            this.arStage.push(element);
          });
        }
      });
  }

  submitAddComplianceMaster(data) {

    const reqData = {
      recourse: {
        id: data.recourse,
      },
      stage: {
        id: data.stage.id,
      },
      complianceName: data.compliance,
      statusId: data.status.statusId,
      userId: this._storageService.getUserId()
    };

    this._complianceService.addCompliance(reqData).subscribe(
      result => {
        const _result = result.body;

        if (_result.httpCode === 200) { // success
          // this.tableInputData.push(
          //   {
          //     recourse: data.recourse.recourseCode,
          //     stage: data.stage.stageCode,
          //     status: data.status.statusName,
          //     recourseId: data.recourse, stageId: data.stage, compliance: data.compliance,
          //     statusId: data.status, id: _result.id
          //   });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          // this.AddComplianceMaster();
          this.closeModal();
          // this.subscriberFields();
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
