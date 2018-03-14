import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../../shared/services/storage.service';
import { DistrictService } from '../district.service';
import { District } from '../district';

declare var $;


@Component({
  selector: 'app-edit-district',
  templateUrl: '../edit-district/edit-district.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditDistrictMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: any;
  @Input() arDisrict: District[];

  editDistrictMasterForm: FormGroup;
  isDistrictAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _districtService: DistrictService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditDistrictMaster(data) {

    var reqData = {
      districtName: data.districtName,
      id: data.id,
      userId: this._storageService.getUserId()

    };

    this._districtService.updateDistrict(reqData).subscribe(

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
    this.editDistrictMasterForm.get('districtName').valueChanges.subscribe(
      (e) => {

        var filedValue = e.toUpperCase();
        if (this.editDetails.districtName.toUpperCase() != filedValue && this.arDisrict.filter(x => x.districtName.toUpperCase() == filedValue).length > 0)
          this.isDistrictAlreadyExists = true;
        else {
          this.isDistrictAlreadyExists = false;
        }
      }
    );
  }

  createForm(data) {
    this.editDistrictMasterForm = this.fb.group({
      districtName: [data == null ? null : data.districtName, Validators.required],
      id: [data == null ? null : data.id, Validators.required]
    });
  }
}