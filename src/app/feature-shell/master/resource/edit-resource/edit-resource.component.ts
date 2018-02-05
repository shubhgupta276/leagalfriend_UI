import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;

@Component({
  selector: 'app-edit-resource',
  templateUrl:'../edit-resource/edit-resource.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditResourceMasterComponent implements OnInit
{
    editResourceMasterForm: FormGroup;

  EditResourceMaster() {
    this.editResourceMasterForm = this.fb.group({
      resourcecode: [null, Validators.required],
      resourcename: [null, Validators.required],
      resourcedesc: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditResourceMaster();
  }

  submitEditResourceMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Resource updated successfully'});
    this.EditResourceMaster();
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