import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../../shared/services/storage.service';
import { InstitutionService } from '../institution.service';
import { Institution } from '../institution';


declare var $;

@Component({
  selector: 'app-edit-institution',
  templateUrl: '../edit-institution/edit-institution.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditInstitutionMasterComponent implements OnInit, OnChanges {
  @Input() editDetails: Institution;
  @Input() arInstitution: Institution[];
  editInstitutionMasterForm: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditInstitutionMaster(data: Institution) {

    var reqData = {
      institutionName: data.institutionName,
      id: data.id,
      userId: this._storageService.getUserId()

    };

    this._institutionService.updateInstitution(reqData).subscribe(

      result => {
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();


          const objFind = this.arInstitution.find(x => x.id == this.editDetails.id);
          objFind.institutionName = data.institutionName;
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });

      },
      err => {
        console.log(err);
      });
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
    this.editInstitutionMasterForm.get('institutionName').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.institutionName.toUpperCase() != fieldValue && this.arInstitution.filter(x => x.institutionName.toUpperCase() == fieldValue).length > 0)
          this.isInstitutionAlreadyExists = true;
        else
          this.isInstitutionAlreadyExists = false;
      }
    );
  }

  createForm(data: Institution) {
    this.editInstitutionMasterForm = this.fb.group({
      institutionName: [data == null ? null : data.institutionName, Validators.required],
      id: [data == null ? null : data.id]
    });
  }
}