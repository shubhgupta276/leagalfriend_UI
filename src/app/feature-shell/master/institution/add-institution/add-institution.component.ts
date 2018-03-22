import { Component, OnInit,Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../../shared/services/storage.service';
import { InstitutionService } from '../institution.service';
import { Institution } from '../institution';


declare var $;

@Component({
  selector: 'app-add-institution',
  templateUrl: '../add-institution/add-institution.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddInstitutionMasterComponent implements OnInit {
  @Input() arInstitution: Institution[];
  addInstitutionMasterForm: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  AddInstitutionMaster() {
    this.addInstitutionMasterForm = this.fb.group({
      institutionName: [null, Validators.required],
    });
  }

  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    this.AddInstitutionMaster();
  }

  submitAddInstitutionMaster(data : Institution) {
    var reqData = {
      institutionName: data.institutionName,
      userId: this._storageService.getUserId()
    };

    this._institutionService.addInstitution(reqData).subscribe(
      result => {
        var _result = result.body;

        if (_result.httpCode == 200) { //success
          this.arInstitution.push({ institutionName: data.institutionName, id: _result.id });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddInstitutionMaster();
          this.closeModal();
          this.subscriberFields();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $('#closebtn').click();
  }

  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addInstitutionMasterForm.get('institutionName').valueChanges.subscribe(
      (e) => {
        if (this.arInstitution.filter(x => x.institutionName.toUpperCase() == e.toUpperCase()).length > 0) 
          this.isInstitutionAlreadyExists = true;
        else
          this.isInstitutionAlreadyExists = false;
      }
    );
  }
}