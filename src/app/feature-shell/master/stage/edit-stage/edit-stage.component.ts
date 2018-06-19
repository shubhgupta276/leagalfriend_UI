import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Stage } from '../stage';
import { StageService } from '../stage.service';
import { StorageService } from '../../../../shared/services/storage.service';

export interface KeyValue {
  id: number;
  name: string;
}

declare var $;

@Component({
  selector: 'app-edit-stage',
  templateUrl: '../edit-stage/edit-stage.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditStageMasterComponent implements OnInit, OnChanges {
  @Input() arStage: Stage[];
  @Input() arStatus: KeyValue[];
  @Input() arRecourse: any[];
  editDetails: Stage;
  editStageMasterForm: FormGroup;
  isStagecodeAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _stageService: StageService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditStageMaster(data) {
    
    const reqData = {
      recourse: {
       id: data.recourse,
      },
      stageCode: data.stageCode,
      stageName: data.stageName,
      statusId: data.status,
      id: data.id,
      userId: this._storageService.getUserId()
    }
    this._stageService.updateStage(reqData).subscribe(

      result => {
        var _result = result.body;

        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();

          const objFind = this.arStage.find(x => x.id == this.editDetails.id);
          objFind.recourse = data.recourse.id;
          objFind.stageCode = data.stageCode;
          objFind.stageName = data.stageName;
          objFind.status = data.status;
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });

      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $("#closebtn1").click();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.editDetails !== undefined && changes.editDetails.currentValue !== undefined) {

      this.createForm(changes.editDetails.currentValue);
      this.subscriberFields();
    }
  }

  subscriberFields() {
    this.editStageMasterForm.get('stageCode').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.stageCode.toUpperCase() != fieldValue && this.arStage.filter(x => x.stageCode.toUpperCase() == fieldValue).length > 0)
          this.isStagecodeAlreadyExists = true;
        else {
          this.isStagecodeAlreadyExists = false;
        }
      }
    );
  }

  createForm(data) {
    this.editStageMasterForm = this.fb.group({
      recourse: [data == null ? null : data.recourseId, Validators.required],
      stageCode: [data == null ? null : data.stageCode, Validators.required],
      stageName: [data == null ? null : data.stageName, Validators.required],
      status: [data == null ? null : data.status, Validators.required],
      id: [data == null ? null : data.id]
    });
    if (data != null) {
      this.isStagecodeAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}