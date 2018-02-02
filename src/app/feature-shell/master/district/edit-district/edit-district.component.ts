import { Component, OnInit } from '@angular/core';
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
    editDistrictMasterForm: FormGroup;
    
  EditDistrictMaster() {
    this.editDistrictMasterForm = this.fb.group({
        district: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditDistrictMaster();
  }

  submitEditDistrictMaster(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'District updated successfully'});
  }

ngOnInit()
  {

  }
}