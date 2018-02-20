import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;

@Component({
  selector: 'app-edit-resource',
  templateUrl: '../edit-resource/edit-resource.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditResourceMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: any;
  editResourceMasterForm: FormGroup;
  isResourcecodeAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditResourceMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Resource updated successfully' });
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
    this.editResourceMasterForm.get('resourcecode').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isResourcecodeAlreadyExists = true;
        else
          this.isResourcecodeAlreadyExists = false;
      }
    );
  }
  createForm(data) {
    this.editResourceMasterForm = this.fb.group({
      resourcecode: [data == null ? null : data.ResourceCode, Validators.required],
      resourcename: [data == null ? null : data.ResourceName, Validators.required],
      resourcedesc: [data == null ? null : data.ResourceDesc, Validators.required]
    });
  }
}