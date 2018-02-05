import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;

@Component({
  selector: 'app-add-court',
  templateUrl:'../add-court/add-court.component.html'
 //template:`<h1>test popup</h1>`
})
export class AddCourtMasterComponent implements OnInit
{
    addCourtMasterForm: FormGroup;

  AddCourtMaster() {
    this.addCourtMasterForm = this.fb.group({
        court: [null, Validators.required],
        courtdesc: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddCourtMaster();
  }

  submitAddCourtMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Court added successfully'});
    this.AddCourtMaster();
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