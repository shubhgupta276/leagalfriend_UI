import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

export interface KeyValue {
  id: number;
  name: string;
}

export const Cities: KeyValue[] = [{ id: 1, name: "Jaipur" }, { id: 2, name: "Delhi" }, { id: 3, name: "Chennai" }];


declare var $;

@Component({
  selector: 'app-edit-branch',
  templateUrl:'../edit-branch/edit-branch.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditBranchMasterComponent implements OnInit
{
    editBranchMasterForm: FormGroup;
    City: KeyValue[] = Cities;

  EditBranchMaster() {
    this.editBranchMasterForm = this.fb.group({
        branchname: [null, Validators.required],
        branchcode: [null, Validators.required],
        address: [null, Validators.required],
        city: [1],
        contact: [null, Validators.required],
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditBranchMaster();
  }

  submitEditBranchMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Branch Updated successfully'});
    this.EditBranchMaster();
    this.closeModal();
  }

  closeModal()
  {
    $('#closebtn1').click();
  }

ngOnInit()
  {

  }
}