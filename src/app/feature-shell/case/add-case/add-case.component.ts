import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CaseResource, CaseManager,CaseCourt,CaseState,ParentCase,CaseCustomerName,CaseBranch,CaseStage,CaseEmployee,CaseCourtPlace, KeyValue } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-add-case',
  templateUrl:'../add-case/add-case.component.html'
 //template:`<h1>test popup</h1>`
})
export class AddCaseComponent implements OnInit
{

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
  // emailValidationMessage: string = "Email address is required.";

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
      filingdate: [],
      stage: [1],
      employee: [1],
      courtplace: [1],
      oppLawyer: [],
      childCase: [],
      lastHearingDate: [],
      uploadDocument: [],
    });
  }

  constructor(private fb: FormBuilder) {
    this.AddCaseUser();
  }

  submitAddCaseUser(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'User added successfully'});
  }


ngOnInit()
  {
    // this.editCaseForm.get('email').valueChanges.subscribe(
    //   (e) => {
    //     if (e != "") {
    //       this.editCaseForm.get('email').setValidators([Validators.email]);
    //       this.emailValidationMessage = "Email format is not correct.";
    //     } else {
    //       this.editCaseForm.get('email').setValidators([Validators.required]);
    //       this.emailValidationMessage = "Email address is required.";
    //     }
    //   }
    // )

  }
}