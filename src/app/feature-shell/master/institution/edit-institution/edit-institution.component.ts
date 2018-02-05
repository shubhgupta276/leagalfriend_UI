import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';


declare var $;

@Component({
  selector: 'app-edit-institution',
  templateUrl:'../edit-institution/edit-institution.component.html'
 //template:`<h1>test popup</h1>`
})
export class EditInstitutionMasterComponent implements OnInit
{
    editInstitutionMasterForm: FormGroup;

    EditInstitutionMaster() {
    this.editInstitutionMasterForm = this.fb.group({
        institution: [null, Validators.required],
    });
  }

  constructor(private fb: FormBuilder) {
    this.EditInstitutionMaster();
  }

  submitEditInstitutionMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Institution updated successfully'});
    this.EditInstitutionMaster();
    this.closeModal();
  }

  closeModal(){
    $('#closeBtn1').click();
  }

ngOnInit()
  {

  }
}