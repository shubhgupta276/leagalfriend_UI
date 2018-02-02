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
  selector: 'app-add-branch',
  templateUrl:'../add-branch/add-branch.component.html'
 //template:`<h1>test popup</h1>`
})
export class AddBranchMasterComponent implements OnInit
{
    addBranchMasterForm: FormGroup;
    City: KeyValue[] = Cities;

  AddBranchMaster() {
    this.addBranchMasterForm = this.fb.group({
        branchname: [null, Validators.required],
        branchcode: [null, Validators.required],
        address: [null, Validators.required],
        city: [1],
        contact: [null, Validators.required],
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddBranchMaster();
  }

  submitAddBranchMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Branch added successfully'});
    this.AddBranchMaster();
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