import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  templateUrl: '../edit-stage/edit-stage.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditStageMasterComponent implements OnInit, OnChanges {
  @Input() editDetails:any;
  editStageMasterForm: FormGroup;
  Resource: KeyValue[] = Resources;
  Status1: KeyValue[] = Status;
  isStagecodeAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditStageMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Stage updated successfully' });
    this.closeModal();
  }

  closeModal() {
    $("#closebtn1").click();
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
    this.editStageMasterForm.get('stagecode').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isStagecodeAlreadyExists = true;
        else
          this.isStagecodeAlreadyExists = false;
      }
    );
  }
  createForm(data) {
    this.editStageMasterForm = this.fb.group({
      resource: [1],
      stagecode: [data == null ? null : data.StageCode, Validators.required],
      stagename: [data == null ? null : data.StageName, Validators.required],
      status: [1]
    });
  }

}