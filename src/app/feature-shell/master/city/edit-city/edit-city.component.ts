import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-edit-city',
  templateUrl: '../edit-city/edit-city.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditCityMasterComponent implements OnInit, OnChanges {

  @Input()
  editDetails: any;

  editCityMasterForm: FormGroup;
  isCityAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditCityMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'City updated successfully' });
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
    this.editCityMasterForm.get('city').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isCityAlreadyExists = true;
        else
          this.isCityAlreadyExists = false;
      }
    );
  }

  createForm(data) {
    this.editCityMasterForm = this.fb.group({
      city: [data == null ? null : data.BankCity, Validators.required],
    });
  }
}