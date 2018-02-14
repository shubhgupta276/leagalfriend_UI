import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';


declare var $;

@Component({
  selector: 'app-add-institution',
  templateUrl: '../add-institution/add-institution.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddInstitutionMasterComponent implements OnInit {
  addInstitutionMasterForm: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  AddInstitutionMaster() {
    this.addInstitutionMasterForm = this.fb.group({
      institution: [null, Validators.required],
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddInstitutionMaster();
  }

  submitAddInstitutionMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Institution added successfully' });
    this.AddInstitutionMaster();
    this.closeModal();
    this.subscriberFields();
  }

  closeModal() {
    $('#closebtn').click();
  }

  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addInstitutionMasterForm.get('institution').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isInstitutionAlreadyExists = true;
        else
          this.isInstitutionAlreadyExists = false;
      }
    );
  }
}