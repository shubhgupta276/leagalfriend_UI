import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

export interface KeyValue {
  id: number;
  name: string;
}

export const Resources: KeyValue[] = [{ id: 1, name: "RODA" }, { id: 2, name: "DRT" }, { id: 3, name: "ARB" }];
export const Stages: KeyValue[] = [{ id: 1, name: "Arguments" }, { id: 2, name: "Summons" }, { id: 3, name: "Appeal Filed" }];
export const Status: KeyValue[] = [{ id: 1, name: "ACTIVE" }, { id: 2, name: "DEACTIVE" }, { id: 3, name: "SUSPENDED" }];

declare var $;

@Component({
  selector: 'app-edit-compliance',
  templateUrl:'../edit-compliance/edit-compliance.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditComplianceMasterComponent implements OnInit
{
    editComplianceMasterForm: FormGroup;

    Resource: KeyValue[] = Resources;
    Stage: KeyValue[] = Stages;
    Status1: KeyValue[] = Status;

  EditComplianceMaster() {
    this.editComplianceMasterForm = this.fb.group({
        
        resource: [1],
        stage: [1],
        complaince: [null, Validators.required],
        status: [1]
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditComplianceMaster();
  }

  submitEditComplianceMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Compliance updated successfully'});
    this.EditComplianceMaster();
    this.closeModal();
  }

  closeModal()
  {
    $('#closebtn').click();
  }

ngOnInit()
  {

  }
}