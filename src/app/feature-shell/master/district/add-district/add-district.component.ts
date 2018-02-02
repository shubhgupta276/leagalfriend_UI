import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-add-district',
  templateUrl:'../add-district/add-district.component.html'
 //template:`<h1>test popup</h1>`
})
export class AddDistrictMasterComponent implements OnInit
{

    addDistrictMasterForm: FormGroup;


  AddDistrictMaster() {
    this.addDistrictMasterForm = this.fb.group({
        district: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddDistrictMaster();
  }

  submitAddDistrictMaster(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'District added successfully'});
  }

ngOnInit()
  {

  }
}