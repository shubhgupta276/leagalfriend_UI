import { Component, OnInit, Input } from '@angular/core';
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
})
export class AddInstitutionMasterComponent implements OnInit {
  @Input() tableInputData: any[];
  @Input() arCity: any[];
  addInstitutionMasterForm: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  AddInstitutionMaster() {
    this.addInstitutionMasterForm = this.fb.group({
      institutionName: [null, Validators.required],
      contactPerson: [null, Validators.required],
      address: [null, Validators.required],
      city: ['', Validators.required],
      billingAddress: [null, Validators.required],
      contactNo: [null, Validators.required],
    });
  }

  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    this.AddInstitutionMaster();
  }

  submitAddInstitutionMaster(data: Institution) {
    const reqData = {
      institutionName: data.institutionName,
      contactName: data.contactPerson,
      address: data.address,
      billingAddr: data.billingAddress,
      fkCity: data.city.id,
      phone: data.contactNo,
      userId: this._storageService.getUserId()
    };

    this._institutionService.addInstitution(reqData).subscribe(
      result => {
        const _result = result.body;

        if (_result.httpCode === 200) { // success
          this.tableInputData.push({
            institutionName: data.institutionName,
            address: data.address,
            billingAddress: data.billingAddress,
            contactNo: data.contactNo,
            contactPerson: data.contactPerson,
            city: data.city.cityName,
            cityId: data.city.id,
            id: _result.id,
            defaultInstitution: false
          });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddInstitutionMaster();
          this.closeModal();
          this.subscriberFields();
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
        }
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
        if (this.tableInputData.filter(x => x.institutionName.toUpperCase() === e.toUpperCase()).length > 0) {
          this.isInstitutionAlreadyExists = true;
        } else {
          this.isInstitutionAlreadyExists = false;
        }
      }
    );
  }
}
