import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Recourse } from '../recourse';
import { RecourseService } from '../recourse.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

declare var $;

@Component({
  selector: 'app-add-resource',
  templateUrl: '../add-resource/add-resource.component.html'
})
export class AddResourceMasterComponent implements OnInit {
  @Input() tableInputData: any[];
  @Input() @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  addResourceMasterForm: FormGroup;
  isResourcecodeAlreadyExists: boolean = false;

  AddResourceMaster() {
    this.addResourceMasterForm = this.fb.group({
      // recourseCode: [null, Validators.required],
      recourseName: [null, Validators.required],
      recourseDesc: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _recourseService: RecourseService, private _storageService: StorageService) {
    this.AddResourceMaster();
  }

  submitAddResourceMaster(data: Recourse) {

    const reqData = {
      // recourseCode: data.recourseCode,
      recourseName: data.recourseName,
      recourseDesc: data.recourseDesc,
      userId: this._storageService.getUserId()
    };
    this._recourseService.addResource(reqData).subscribe(
      result => {
        const _result = result.body;

        if (_result.httpCode === 200) { // success
          this.tableInputData.push({
            recourseCode: data.recourseCode, recourseName: data.recourseName, recourseDesc: data.recourseDesc, id: _result.id
          });
          this.dataTableComponent.ngOnInit();
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddResourceMaster();
          this.closeModal();
          this.subscriberFields();
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

  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addResourceMasterForm.get('recourseCode').valueChanges.subscribe(
      (e) => {

        if (this.tableInputData.filter(x => x.recourseCode.toUpperCase() === e.toUpperCase()).length > 0) {
          this.isResourcecodeAlreadyExists = true;
        } else {
          this.isResourcecodeAlreadyExists = false;
        }
      }
    );
  }
}
