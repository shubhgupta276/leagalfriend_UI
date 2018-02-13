import { Component, OnInit,Input } from '@angular/core';
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

    @Input() editCityMasterForm: FormGroup; 

  constructor() {
  }

  submitEditCityMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'City updated successfully'});
    this.closeModal();
  }

  closeModal()
  {
    $("#closebtn1").click();
  }

ngOnInit()
  {

  }
}