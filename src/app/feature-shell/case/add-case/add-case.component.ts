import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  CaseResource, CaseManager, CaseCourt, CaseState, ParentCase, CaseCustomerName,
  CaseBranch, CaseStage, CaseEmployee, CaseCourtPlace, KeyValue
} from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import {EditCase} from '../../../shared/models/auth/editcase.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { StorageService } from "../../../shared/services/storage.service";

declare var $;


@Component({
  selector: 'app-add-case',
  templateUrl: '../add-case/add-case.component.html',
  providers: [StorageService,AuthService,DatePipe]
})
export class AddCaseComponent implements OnInit {

  addCaseForm: FormGroup;

  Resource: KeyValue[] = CaseResource;
  Manager: KeyValue[] = CaseManager;
  Court: KeyValue[] = CaseCourt;
  State: KeyValue[] = CaseState;
  ParentCases: KeyValue[] = ParentCase;
  CustomerName: KeyValue[] = CaseCustomerName;
  Branch: KeyValue[] = CaseBranch;
  Stage: KeyValue[] = CaseStage;
  Employee: KeyValue[] = CaseEmployee;
  CourtPlace: KeyValue[] = CaseCourtPlace;
  fillignDateValue: string;
  AddCaseUser() {
    this.addCaseForm = this.fb.group({


      courtCaseId: [],
      recourse: [1],
      manager: [1],
      court: [1],
      state: [1],
      parentCase: [1],
      nextHearingDate: [],
      customerName: [1],
      remark: [null, Validators.required],
      branch: [1],
      filingdate: [null, Validators.required],
      stage: [1],
      employee: [1],
      courtplace: [1],
      oppLawyer: [],
      childCase: [],
      lastHearingDate: [],
      uploadDocument: [],
    });
  }

  constructor(private fb: FormBuilder,private apiGateWay: ApiGateway,private authService: AuthService, private _storageService: StorageService,private datePipe: DatePipe) {
    this.AddCaseUser();
  }

  

  submitAddCaseUser(data)
{
  
  debugger
  const  objEditCase=new EditCase();
  objEditCase.branchId=data.branch;
  var userId = parseInt(localStorage.getItem('client_id'));
  objEditCase.userId=userId;
  objEditCase.childCase=data.childCase;
  objEditCase.courtCaseId=data.courtCaseId;
  objEditCase.courtId=data.court;
  objEditCase.customerId=data.customerName;
  objEditCase.filingDate=this.datePipe.transform(data.filingdate,"yyyy-MM-dd");
  //objEditCase.caseid=data.caseId;
  objEditCase.lastHearingDate=this.datePipe.transform(data.lastHearingDate,"yyyy-MM-dd");
  objEditCase.nextHearingDate= this.datePipe.transform(data.nextHearingDate,"yyyy-MM-dd")
  objEditCase.oppLawyer=data.oppLawyer;
  objEditCase.recourseId=data.recourse;
  objEditCase.remark =data.remark;
  objEditCase.stageId=data.stage;

  objEditCase.employeeId=data.manager;

  objEditCase.stateId=data.state;





  

  debugger
  this.authService.submitEditCaseUser(objEditCase).subscribe(

    result => {
       debugger
       $.toaster({ priority: 'success', title: 'Success', message: 'Case updated successfully' });
        console.log(result);
    },
    err => {
        console.log(err);
    });

}

  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      $('.input-group.date').datepicker().on('changeDate', function (ev) {
        const attrName = $(this).find('input').attr('formControlName');
        const attrValue = $(this).find('input').val();
        self.addCaseForm.controls[attrName].setValue(attrValue);
      });
    });
  }
}
