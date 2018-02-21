import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-edit-district',
  templateUrl: '../edit-district/edit-district.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditDistrictMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: any;

  editDistrictMasterForm: FormGroup;
  isDistrictAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }

  submitEditDistrictMaster(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'District updated successfully' });
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
    this.editDistrictMasterForm.get('districtName').valueChanges.subscribe(
      (e) => {
        
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isDistrictAlreadyExists = true;
        else
          this.isDistrictAlreadyExists = false;
      }
    );
  }

  createForm(data) {
    this.editDistrictMasterForm = this.fb.group({
      districtName: [data == null ? null : data.districtName, Validators.required],
      id: [data == null ? null : data.id, Validators.required]
    });
  }
}