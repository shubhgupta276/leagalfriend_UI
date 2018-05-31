import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { DistrictService } from '../district.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { District } from '../district';
declare var $;


@Component({
  selector: 'app-add-district',
  templateUrl: '../add-district/add-district.component.html'
})
export class AddDistrictMasterComponent implements OnInit {

  addDistrictMasterForm: FormGroup;
  isDistrictAlreadyExists: boolean = false;
  @Input() tableInputData: District[];

  AddDistrictMaster() {
    this.addDistrictMasterForm = this.fb.group({
      districtName: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _districtService: DistrictService, private _storageService: StorageService) {
    this.AddDistrictMaster();
  }

  submitAddDistrictMaster(data) {
    const reqData = {
      districtName: data.districtName,
      userId: this._storageService.getUserId()
    };

    this._districtService.addDistrict(reqData).subscribe(
      result => {
        const _result = result.body;
        if (_result.httpCode === 200) { // success
          this.tableInputData.push({ districtName: data.districtName, id: _result.id });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddDistrictMaster();
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
    this.addDistrictMasterForm.get('districtName').valueChanges.subscribe(
      (e) => {

        if (this.tableInputData.filter(x => x.districtName.toUpperCase() === e.toUpperCase()).length > 0) {
          this.isDistrictAlreadyExists = true;
        } else {
          this.isDistrictAlreadyExists = false;
        }
      }
    );
  }
}
