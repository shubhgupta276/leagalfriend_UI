import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-add-state',
  templateUrl: '../add-state/add-state.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddStateMasterComponent implements OnInit {
  addStateMasterForm: FormGroup;
  isStateAlreadyExists: boolean = false;
  AddStateMaster() {
    this.addStateMasterForm = this.fb.group({
      stateName: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddStateMaster();
  }

  submitAddStateMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'State added successfully' });
    this.AddStateMaster();
    this.closeModal();
    this.subscriberFields();
  }

  closeModal() {
    $("#closebtn").click();
  }

  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addStateMasterForm.get('stateName').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isStateAlreadyExists = true;
        else
          this.isStateAlreadyExists = false;
      }
    );
  }
}