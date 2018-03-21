import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { City } from '../city';
import { CityService } from '../city.service';
import { StorageService } from '../../../../shared/services/storage.service';
declare var $;


@Component({
  selector: 'app-add-city',
  templateUrl: '../add-city/add-city.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddCityMasterComponent implements OnInit {
  @Input()
  arCityData: City[];
  addCityMasterForm: FormGroup;

  isCityAlreadyExists: Boolean = false;
  AddCityMaster() {
    this.addCityMasterForm = this.fb.group({
      cityName: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _cityService: CityService, private _storageService: StorageService) {
    this.AddCityMaster();
  }

  submitAddCityMaster(data: City) {

    var reqData = {
      cityName: data.cityName,
      userId: this._storageService.getUserId()
    };
    
    this._cityService.addCity(reqData).subscribe(
      result => {
        var _result = result.body;

        if (_result.httpCode == 200) { //success
          this.arCityData.push({ cityName: data.cityName, id: _result.id });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddCityMaster();
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
    this.addCityMasterForm.get('cityName').valueChanges.subscribe(
      (e) => {
        if (this.arCityData.filter(x => x.cityName.toUpperCase() == e.toUpperCase()).length > 0)
          this.isCityAlreadyExists = true;
        else {
          this.isCityAlreadyExists = false;
        }
      }
    );
  }
}