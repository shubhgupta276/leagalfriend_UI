import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { City } from '../city';
import { CityService } from '../city.service';
import { StorageService } from '../../../../shared/services/storage.service';
// import { constants } from 'fs';
declare var $;


@Component({
  selector: 'app-edit-city',
  templateUrl: '../edit-city/edit-city.component.html'
})
export class EditCityMasterComponent implements OnInit {

  editDetails: City;
  @Input()
  tableInputData: any[];

  editCityMasterForm: FormGroup;
  isCityAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _cityService: CityService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditCityMaster(data) {
    const reqData = {
      cityName: data.cityName,
      id: data.id,
      userId: this._storageService.getUserId()

    };
    this._cityService.updateCity(reqData).subscribe(

      result => {
        const _result = result.body;
        if (_result.httpCode === 200) { // success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();
          const objFind = this.tableInputData.find(x => x.id === this.editDetails.id);
          objFind.cityName = data.cityName;
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
    this.editCityMasterForm.get('cityName').valueChanges.subscribe(
      (e) => {

        const fieldValue = e.toUpperCase();
        if (this.editDetails.cityName.toUpperCase() !== fieldValue
        && this.tableInputData.filter(x => x.cityName.toUpperCase() === fieldValue).length > 0) {
          this.isCityAlreadyExists = true;
        } else {
          this.isCityAlreadyExists = false;
        }
      }
    );
  }

  createForm(data: City) {
    this.editCityMasterForm = this.fb.group({
      cityName: [data == null ? null : data.cityName, Validators.required],
      id: [data == null ? null : data.id],
    });
    if (data != null) {
      this.isCityAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}
