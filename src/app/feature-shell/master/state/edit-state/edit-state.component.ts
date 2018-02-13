import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-edit-state',
  templateUrl: '../edit-state/edit-state.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditStateMasterComponent implements OnInit {
  @Input() editStateMasterForm: FormGroup;

  constructor() {
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
 
}