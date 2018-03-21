import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Recourse } from '../recourse';
import { RecourseService } from '../recourse.service';
import { StorageService } from '../../../../shared/services/storage.service';

declare var $;

@Component({
  selector: 'app-add-resource',
  templateUrl: '../add-resource/add-resource.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddResourceMasterComponent implements OnInit {
  @Input() arRecourse: Recourse[];
  addResourceMasterForm: FormGroup;
  isResourcecodeAlreadyExists: boolean = false;

  AddResourceMaster() {
    this.addResourceMasterForm = this.fb.group({
      recourseCode: [null, Validators.required],
      recourseName: [null, Validators.required],
      recourseDesc: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _recourseService: RecourseService, private _storageService: StorageService) {
    this.AddResourceMaster();
  }

  submitAddResourceMaster(data: Recourse) {

    var reqData = {
      recourseCode: data.recourseCode,
      recourseName: data.recourseName,
      recourseDesc: data.recourseDesc,
      userId: this._storageService.getUserId()
    };
    
    this._recourseService.addResource(reqData).subscribe(
      result => {
        var _result = result.body;

        if (_result.httpCode == 200) { //success
          
          this.arRecourse.push({recourseCode:data.recourseCode, recourseName: data.recourseName, recourseDesc: data.recourseDesc, id: _result.id });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddResourceMaster();
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
    this.subscriberFields()
  }
  subscriberFields() {
    this.addResourceMasterForm.get('recourseCode').valueChanges.subscribe(
      (e) => {
        
        if (this.arRecourse.filter(x => x.recourseCode.toUpperCase() == e.toUpperCase()).length > 0)
          this.isResourcecodeAlreadyExists = true;
        else {
          this.isResourcecodeAlreadyExists = false;
        }
      }
    );
  }
}