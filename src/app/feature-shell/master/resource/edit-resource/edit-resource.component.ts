import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  //template:`<h1>test popup</h1>`
})
export class EditResourceMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: Recourse;
  @Input() arRecourse: Recourse[];
  editResourceMasterForm: FormGroup;
  isResourcecodeAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _recourseService: RecourseService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditResourceMaster(data: Recourse) {
    var reqData = {
      cityName: data.recourseCode,
      recourseName: data.recourseName,
      recourseDesc: data.recourseDesc,
      id: data.id,
      userId: this._storageService.getUserId()

    };

    this._recourseService.updateResource(reqData).subscribe(

      result => {
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          this.closeModal();
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
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
    
    if (changes.editDetails.currentValue !== undefined) {
      this.createForm(changes.editDetails.currentValue);
      this.subscriberFields();
    }

  }
  subscriberFields() {

    this.editResourceMasterForm.get('recourseCode').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.recourseCode.toUpperCase() != fieldValue && this.arRecourse.filter(x => x.recourseCode.toUpperCase() == fieldValue).length > 0)
          this.isResourcecodeAlreadyExists = true;
        else {
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
  }
}