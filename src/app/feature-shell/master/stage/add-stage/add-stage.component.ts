import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Stage } from '../stage';
import { StageService } from '../stage.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Recourse } from '../../resource/recourse';

export interface KeyValue {
  id: number;
  name: string;
}

declare var $;

@Component({
  selector: 'app-add-stage',
  templateUrl: '../add-stage/add-stage.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddStageMasterComponent implements OnInit {
  @Input() arStage: Stage[];
  @Input() arStatus: any[];
  @Input() arRecourse: any[];
  
  addStageMasterForm: FormGroup;
  isStagecodeAlreadyExists: boolean = false;
  AddStageMaster() {
    this.addStageMasterForm = this.fb.group({
      recourseName: [""],
      recourse: ["", Validators.required],
      stageCode: [null, Validators.required],
      stageName: [null, Validators.required],
      status: ["", Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _stageService: StageService, private _storageService: StorageService) {
    this.AddStageMaster();
  }

  submitAddStageMaster(data) {
    debugger;
    var reqData = {
      recourseId: data.recourse.id,
      stageCode: data.stageCode,
      stageName: data.stageName,
      statusId: data.status,
      userId: this._storageService.getUserId()
    };
    
    this._stageService.addStage(reqData).subscribe(
      result => {
        var _result = result.body;
        
        if (_result.httpCode == 200) { //success
          
          this.arStage.push(
            {
              recourse: data.recourse.id, recourseCode: data.recourse.recourseCode, stageName: data.stageName,
              stageCode: data.stageCode, status: data.status, id: _result.id
            }
          );
          
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddStageMaster();
          this.closeModal();
          this.subscriberFields();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
      },
      err => {
        console.log(err);
      });
  }
 
  closeModal() {
    $("#closebtn").click();
  }

  ngOnInit() {
    this.subscriberFields();
  }

  subscriberFields() {
    this.addStageMasterForm.get('stageCode').valueChanges.subscribe(
      (e) => {
        if (this.arStage.filter(x => x.stageCode.toUpperCase() == e.toUpperCase()).length > 0)
          this.isStagecodeAlreadyExists = true;
        else {
          this.isStagecodeAlreadyExists = false;
        }
      }
    );
  }
}