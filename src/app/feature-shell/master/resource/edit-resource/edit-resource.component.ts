import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Recourse } from '../recourse';
import { RecourseService } from '../recourse.service';
import { StorageService } from '../../../../shared/services/storage.service';

declare var $;

@Component({
  selector: 'app-edit-resource',
  templateUrl: '../edit-resource/edit-resource.component.html'
})
export class EditResourceMasterComponent implements OnInit {
  @Input() tableInputData: Recourse[];
  editDetails: Recourse;
  editResourceMasterForm: FormGroup;
  isResourcecodeAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _recourseService: RecourseService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditResourceMaster(data: Recourse) {
    const reqData = {
      recourseCode: data.recourseCode,
      recourseName: data.recourseName,
      recourseDesc: data.recourseDesc,
      id: data.id,
      userId: this._storageService.getUserId()

    };
    this._recourseService.updateResource(reqData).subscribe(

      result => {
        const _result = result.body;
        if (_result.httpCode === 200) { // success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();
          const objFind = this.tableInputData.find(x => x.id === this.editDetails.id);
          objFind.recourseCode = data.recourseCode;
          objFind.recourseName = data.recourseName;
          objFind.recourseDesc = data.recourseDesc;
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

  }

  subscriberFields() {

    this.editResourceMasterForm.get('recourseCode').valueChanges.subscribe(
      (e) => {
        const fieldValue = e.toUpperCase();
        if (this.editDetails.recourseCode.toUpperCase() !== fieldValue
          && this.tableInputData.filter(x => x.recourseCode.toUpperCase() === fieldValue).length > 0) {
          this.isResourcecodeAlreadyExists = true;
        } else {
          this.isResourcecodeAlreadyExists = false;
        }
      });
  }
  createForm(data: Recourse) {
    this.editResourceMasterForm = this.fb.group({
      recourseCode: [data == null ? null : data.recourseCode, Validators.required],
      recourseName: [data == null ? null : data.recourseName, Validators.required],
      recourseDesc: [data == null ? null : data.recourseDesc, Validators.required],
      id: [data == null ? null : data.id]
    });
    if (data != null) {
      this.isResourcecodeAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}
