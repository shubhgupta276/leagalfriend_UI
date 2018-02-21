import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-edit-state',
  templateUrl: '../edit-state/edit-state.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditStateMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: any;
  editStateMasterForm: FormGroup;
  isStateAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditStateMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'State updated successfully' });
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
    this.editStateMasterForm.get('state').valueChanges.subscribe(
      (e) => {  
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isStateAlreadyExists = true;
        else
          this.isStateAlreadyExists = false;
      }
    );
  }
  createForm(data) {
    this.editStateMasterForm = this.fb.group({
      state: [data == null ? null : data.State, Validators.required],
      id: [data == null ? null : data.id]
    });
  }

}