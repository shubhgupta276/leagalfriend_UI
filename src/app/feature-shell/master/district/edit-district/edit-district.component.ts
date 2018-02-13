import { Component, OnInit,Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-edit-district',
  templateUrl:'../edit-district/edit-district.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditDistrictMasterComponent implements OnInit
{
   @Input() editDistrictMasterForm: FormGroup;
     constructor() {
   
  }

  submitEditDistrictMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'District updated successfully'});
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