import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  templateUrl: '../edit-branch/edit-branch.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditBranchMasterComponent implements OnInit {
  @Input() editDetails: any;
  editBranchMasterForm: FormGroup;
  City: KeyValue[] = Cities;
  isBranchcodeAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditBranchMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Branch Updated successfully' });
    this.closeModal();
  }

  closeModal() {
    $('#closebtn1').click();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.editDetails.currentValue !== undefined) {
      this.createForm(changes.editDetails.currentValue);
      this.subscriberFields();
    }

  }

  subscriberFields() {
    this.editBranchMasterForm.get('branchcode').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isBranchcodeAlreadyExists = true;
        else
          this.isBranchcodeAlreadyExists = false;
      }
    );
  }

  createForm(data) {
    this.editBranchMasterForm = this.fb.group({
      branchname: [data == null ? null : data.BranchName, Validators.required],
      branchcode: [data == null ? null : data.BranchCode, Validators.required],
      address: [data == null ? null : data.Address, Validators.required],
      city: [1],
      contact: [data == null ? null : data.Contact, Validators.required],
    });
  }
}