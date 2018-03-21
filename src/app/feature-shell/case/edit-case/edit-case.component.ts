import { Component, OnInit, Input, Output } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  CaseResource, CaseManager, CaseCourt, CaseState, ParentCase, CaseCustomerName,
  CaseBranch, CaseStage, CaseEmployee, CaseCourtPlace, KeyValue
} from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { Court } from "../../master/court/Court";
import { getCourtsUrl } from '../../master/master.config';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { StorageService } from "../../../shared/services/storage.service";
declare var $;


@Component({
  selector: 'app-edit-case',
  templateUrl: '../edit-case/edit-case.component.html',
  providers: [StorageService]
  // template:`<h1>test popup</h1>`
})
export class EditCaseComponent implements OnInit {

  @Input() editCaseForm: FormGroup;

  Resource: KeyValue[] = CaseResource;
  Manager: KeyValue[] = CaseManager;
  Court: any =[];
  State: KeyValue[] = CaseState;
  ParentCases: KeyValue[] = ParentCase;
  CustomerName: KeyValue[] = CaseCustomerName;
  Branch: KeyValue[] = CaseBranch;
  Stage: KeyValue[] = CaseStage;
  Employee: KeyValue[] = CaseEmployee;
  CourtPlace: KeyValue[] = CaseCourtPlace;
  // emailValidationMessage: string = "Email address is required.";
constructor(private apiGateWay: ApiGateway, private _storageService: StorageService)
{

}
  submitEditCaseUser(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Case updated successfully' });
  }


  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      $('.input-group.date').datepicker().on('changeDate', function (ev) {
        const attrName = $(this).find('input').attr('formControlName');
        const attrValue = $(this).find('input').val();
        self.editCaseForm.controls[attrName].setValue(attrValue);
      });
    });
    this.GetAllCourt();
  }

  GetAllCourt() {    
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    return this.apiGateWay.post<Court>(
      getCourtsUrl,
      JSON.stringify(reqData)).subscribe(
        result => {
          result = result.body;
          if (result.httpCode == 200) {
           result.courts.forEach(obj => {
             this.Court.push({
              courtName: obj.courtName,
              id: obj.id
             })
           
           });
          }
          else {
            console.log(result);
          }
        },
        err => {
          console.log(err);
  
        });
  }
}
