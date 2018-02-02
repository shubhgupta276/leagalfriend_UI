import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-edit-state',
  templateUrl:'../edit-state/edit-state.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditStateMasterComponent implements OnInit
{
    editStateMasterForm: FormGroup;

    EditStateMaster() {
    this.editStateMasterForm = this.fb.group({
        state: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditStateMaster();
  }

  submitEditStateMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'State updated successfully'});
    this.EditStateMaster();
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