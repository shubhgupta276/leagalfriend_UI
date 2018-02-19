import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;

@Component({
  selector: 'app-edit-court',
  templateUrl: '../edit-court/edit-court.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditCourtMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: any;
  editCourtMasterForm: FormGroup;
  isCourtNameAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditCourtMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Court updated successfully' });
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
    this.editCourtMasterForm.get('court').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isCourtNameAlreadyExists = true;
        else
          this.isCourtNameAlreadyExists = false;
      }
    );
  }
  createForm(data) {
    this.editCourtMasterForm = this.fb.group({
      court: [data == null ? null : data.CourtName, Validators.required],
      courtdesc: [data == null ? null : data.CourtDesc, Validators.required]
    });
  }
}