import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

export interface KeyValue {
  id: number;
  name: string;
}

export const Resources: KeyValue[] = [{ id: 1, name: "RODA" }, { id: 2, name: "DRT" }, { id: 3, name: "ARB" }];
export const Status: KeyValue[] = [{ id: 1, name: "ACTIVE" }, { id: 2, name: "DEACTIVE" }, { id: 3, name: "SUSPENDED" }];

declare var $;

@Component({
  selector: 'app-edit-stage',
  templateUrl:'../edit-stage/edit-stage.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditStageMasterComponent implements OnInit
{
    editStageMasterForm: FormGroup;
    Resource: KeyValue[] = Resources;
    Status1: KeyValue[] = Status;

  EditStageMaster() {
    this.editStageMasterForm = this.fb.group({
      resource: [1],
      stagecode: [null, Validators.required],
      stagename: [null, Validators.required],
      status: [1]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditStageMaster();
  }

  submitEditStageMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Stage updated successfully'});
    this.EditStageMaster();
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