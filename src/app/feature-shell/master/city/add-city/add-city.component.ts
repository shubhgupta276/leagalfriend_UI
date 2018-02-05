import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-add-city',
  templateUrl:'../add-city/add-city.component.html'
 //template:`<h1>test popup</h1>`
})
export class AddCityMasterComponent implements OnInit
{

    addCityMasterForm: FormGroup;


  AddCityMaster() {
    this.addCityMasterForm = this.fb.group({
        city: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddCityMaster();
  }

  submitAddCityMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'City added successfully'});
    this.AddCityMaster();
    this.closeModal();
  }
  
  closeModal()
  {
    $("#closebtn").click();
  }  

ngOnInit()
  {

  }
}