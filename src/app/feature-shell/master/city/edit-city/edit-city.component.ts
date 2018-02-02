import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-edit-city',
  templateUrl:'../edit-city/edit-city.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditCityMasterComponent implements OnInit
{

    editCityMasterForm: FormGroup;


    EditCityMaster() {
    this.editCityMasterForm = this.fb.group({
        city: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditCityMaster();
  }

  submitEditCityMaster(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'City updated successfully'});
  }

ngOnInit()
  {

  }
}