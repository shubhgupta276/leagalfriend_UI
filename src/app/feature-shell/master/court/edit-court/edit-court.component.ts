import { Component, OnInit,Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;

@Component({
  selector: 'app-edit-court',
  templateUrl:'../edit-court/edit-court.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditCourtMasterComponent implements OnInit
{
   @Input() editCourtMasterForm: FormGroup;

  constructor() {
  }

  submitEditCourtMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Court updated successfully'});
    this.closeModal();
  }
  closeModal()
  {
    $("#closebtn1").click();
  }

ngOnInit()
  {

  }
}