import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Stage } from '../stage';
import { StageService } from '../stage.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Recourse } from '../../resource/recourse';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

export interface KeyValue {
  id: number;
  name: string;
}

declare var $;

@Component({
  selector: 'app-add-stage',
  templateUrl: '../add-stage/add-stage.component.html'
  // template:`<h1>test popup</h1>`
})
export class AddStageMasterComponent implements OnInit {
  @Input() arStage: Stage[];
  @Input() arStatus: any[];
  @Input() arRecourse: any[];
  @Input() @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  addStageMasterForm: FormGroup;
  isStagecodeAlreadyExists: boolean = false;
  AddStageMaster() {
    this.addStageMasterForm = this.fb.group({
      recourseName: [""],
      recourse: ["", Validators.required],
      // stageCode: [null, Validators.required],
      stageDesc: [null, Validators.required],
      stageName: [null, Validators.required],
      // status: ["", Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _stageService: StageService, private _storageService: StorageService) {
    this.AddStageMaster();
  }

  submitAddStageMaster(data) {
    const reqData = {
      recourse: { id: data.recourse.id },
      // stageCode: data.stageCode,
      stageName: data.stageName,
      stageDesc: data.stageDesc,
      // statusId: data.status,
      userId: this._storageService.getUserId()
    };

    this._stageService.addStage(reqData).subscribe(
      result => {
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.arStage.push(
            {
              recourseId: data.recourse.id,
              recourse: data.recourse.recourseName,
              stageName: data.stageName,
              stageCode: data.stageCode,
              status: data.status,
              id: _result.id
            }
          );
          this.dataTableComponent.ngOnInit();

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
    // this.addStageMasterForm.get('stageCode').valueChanges.subscribe(
    //   (e) => {
    //     if (this.arStage.filter(x => x.stageCode.toUpperCase() == e.toUpperCase()).length > 0)
    //       this.isStagecodeAlreadyExists = true;
    //     else {
    //       this.isStagecodeAlreadyExists = false;
    //     }
    //   }
    // );
  }
}