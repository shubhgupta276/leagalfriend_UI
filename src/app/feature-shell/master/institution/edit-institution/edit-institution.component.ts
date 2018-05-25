import { Component, Input } from '@angular/core';
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
export class EditInstitutionMasterComponent {
  @Input() arInstitution: Institution[];
  editDetails: Institution;
  @Input() arCity: any[];
  editInstitutionMasterForm: FormGroup;
  isInstitutionAlreadyExists: boolean = false;

  selectedCity: any;
  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditInstitutionMaster(data: Institution) {

    var reqData = {
      institutionName: data.institutionName,
      contactName: data.contactPerson,
      address: data.address,
      billingAddr: data.billingAddress,
      phone: data.contactNo,
      fkCity: data.city.id,
      id: data.id,
      userId: this._storageService.getUserId(),
      defaultInstitution: data.defaultInstitution
    };

    this._institutionService.updateInstitution(reqData).subscribe(

      result => {
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();

          const objFind = this.arInstitution.find(x => x.id == this.editDetails.id);
          objFind.institutionName = data.institutionName;
          objFind.contactPerson = data.contactPerson;
          objFind.city = data.city.cityName;
          objFind.cityId = data.city.id;
          objFind.address = data.address;
          objFind.billingAddress = data.billingAddress;
          objFind.contactNo = data.contactNo;

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
      contactPerson: [data == null ? null : data.contactPerson, Validators.required],
      address: [data == null ? null : data.address, Validators.required],
      city: [data == null ? null : data.city, Validators.required],
      billingAddress: [data == null ? null : data.billingAddress, Validators.required],
      contactNo: [data == null ? null : data.contactNo, Validators.required],
      id: [data == null ? null : data.id],
      defaultInstitution: [data == null ? null : data.defaultInstitution, Validators.nullValidator]
    });
    if (data != null) {
      this.isInstitutionAlreadyExists = false;
      this.selectedCity = null;
      setTimeout(() => {
        this.selectedCity = this.arCity.filter(x => x.id == data.cityId)[0];
      }, 100);
      //this.selectedCity = this.arCity.filter(x => x.id == data.cityId)[0];
      //debugger
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}