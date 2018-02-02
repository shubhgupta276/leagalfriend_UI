import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-add-state',
  templateUrl:'../add-state/add-state.component.html'
 //template:`<h1>test popup</h1>`
})
export class AddStateMasterComponent implements OnInit
{
    addStateMasterForm: FormGroup;

  AddStateMaster() {
    this.addStateMasterForm = this.fb.group({
        state: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddStateMaster();
  }

  submitAddStateMaster(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'State added successfully'});
  }

ngOnInit()
  {

  }
}