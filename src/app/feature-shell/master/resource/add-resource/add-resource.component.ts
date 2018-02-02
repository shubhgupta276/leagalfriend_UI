import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;

@Component({
  selector: 'app-add-resource',
  templateUrl:'../add-resource/add-resource.component.html'
 //template:`<h1>test popup</h1>`
})
export class AddResourceMasterComponent implements OnInit
{
    addResourceMasterForm: FormGroup;

  AddResourceMaster() {
    this.addResourceMasterForm = this.fb.group({
        resourcecode: [null, Validators.required],
        resourcename: [null, Validators.required],
        resourcedesc: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddResourceMaster();
  }

  submitAddResourceMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Resource added successfully'});
    this.AddResourceMaster();
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