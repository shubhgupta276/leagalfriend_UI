import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';


declare var $;

@Component({
  selector: 'app-edit-institution',
  templateUrl: '../edit-institution/edit-institution.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditInstitutionMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: any;
  editInstitutionMasterForm: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditInstitutionMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Institution updated successfully' });
    this.closeModal();
  }

  closeModal() {
    $('#closeBtn1').click();
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
    this.editInstitutionMasterForm.get('institution').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isInstitutionAlreadyExists = true;
        else
          this.isInstitutionAlreadyExists = false;
      }
    );
  }

  createForm(data) {
    this.editInstitutionMasterForm = this.fb.group({
      institution: [data == null ? null : data.InstituteName, Validators.required],
    });
  }
}