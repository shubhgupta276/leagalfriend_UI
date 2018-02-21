import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { DistrictService } from '../district.service';
import { StorageService } from '../../../../shared/services/storage.service';
declare var $;


@Component({
  selector: 'app-add-district',
  templateUrl: '../add-district/add-district.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddDistrictMasterComponent implements OnInit {

  addDistrictMasterForm: FormGroup;
  isDistrictAlreadyExists: boolean = false;

  AddDistrictMaster() {
    this.addDistrictMasterForm = this.fb.group({
      districtName: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _districtService: DistrictService, private _storageService: StorageService) {
    this.AddDistrictMaster();
  }

  submitAddDistrictMaster(data) {
    var reqData = {
      districtName: data.districtName,
      user: { id: this._storageService.getClientId() }
    };
    debugger
    this._districtService.addDistrict(reqData).subscribe(
      result => {
        var _result = result.body;
        
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddDistrictMaster();
          this.closeModal();
          this.subscriberFields();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
      },
      err => {
        debugger
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
    this.addDistrictMasterForm.get('districtName').valueChanges.subscribe(
      (e) => {

        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isDistrictAlreadyExists = true;
        else
          this.isDistrictAlreadyExists = false;
      }
    );
  }
}