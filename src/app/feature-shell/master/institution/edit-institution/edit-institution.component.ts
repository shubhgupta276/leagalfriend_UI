import { Component, OnInit,Input } from '@angular/core';
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
   @Input() editInstitutionMasterForm: FormGroup;
  constructor() {
  }

  submitEditInstitutionMaster(data) {
    $.toaster({ priority : 'success', title : 'Success', message : 'Institution updated successfully'});
    this.closeModal();
  }

  closeModal(){
    $('#closeBtn1').click();
  }

ngOnInit()
  {

  }
}