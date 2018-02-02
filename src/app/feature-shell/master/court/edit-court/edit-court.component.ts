import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;

@Component({
  selector: 'app-edit-court',
  templateUrl:'../edit-court/edit-court.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditCourtMasterComponent implements OnInit
{
    editCourtMasterForm: FormGroup;

  EditCourtMaster() {
    this.editCourtMasterForm = this.fb.group({
      court: [null, Validators.required],
      courtdesc: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditCourtMaster();
  }

  submitEditCourtMaster(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'Court updated successfully'});
  }

ngOnInit()
  {

  }
}