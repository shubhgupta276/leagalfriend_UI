import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../shared/services/storage.service';
import { Institution } from '../../master/institution/institution';
import { InstitutionService } from '../../master/institution/institution.service';


declare var $;

@Component({
  selector: 'app-add-institution',
  templateUrl: '../add-institution/add-institution.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddInstitutionDashboardComponent implements OnInit {
  @Input() arCity: any[];
  addInstitutionMasterForm: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  AddInstitutionMaster() {
    this.addInstitutionMasterForm = this.fb.group({
      institutionName: [null, Validators.required],
      contactPerson: [null, Validators.required],
      address: [null, Validators.required],
      city: ["", Validators.required],
      billingAddress: [null, Validators.required],
      contactNo: [null, Validators.required],
    });
  }

  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    this.AddInstitutionMaster();
  }

  submitAddInstitutionMaster(data: Institution) {
    var reqData = {
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
        var _result = result.body;

        if (_result.httpCode == 200) { 
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          $('#addInstitutionMasterModal').modal('hide');
          this.AddInstitutionMaster();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
      },
      err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }
  
}