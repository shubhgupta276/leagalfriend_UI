import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { City } from '../city';
import { CityService } from '../city.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { constants } from 'fs';
declare var $;


@Component({
  selector: 'app-edit-city',
  templateUrl: '../edit-city/edit-city.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditCityMasterComponent implements OnInit, OnChanges {

  @Input()
  editDetails: City;
  @Input()
  arCityData: City[];

  editCityMasterForm: FormGroup;
  isCityAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _cityService: CityService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditCityMaster(data) {
    var reqData = {
      cityName: data.cityName,
      id: data.id,
      userId: this._storageService.getUserId()

    };
    
    this._cityService.updateCity(reqData).subscribe(

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
    this.editCityMasterForm.get('cityName').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.cityName.toUpperCase() != fieldValue && this.arCityData.filter(x => x.cityName.toUpperCase() == fieldValue).length > 0)
          this.isCityAlreadyExists = true;
        else {
          this.isCityAlreadyExists = false;
        }
      }
    );
  }

  createForm(data) {
    this.editCityMasterForm = this.fb.group({
      cityName: [data == null ? null : data.cityName, Validators.required],
      id: [data == null ? null : data.id],
    });
  }
}