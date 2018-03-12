import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  CaseResource, CaseManager, CaseCourt, CaseState, ParentCase, CaseCustomerName,
  CaseBranch, CaseStage, CaseEmployee, CaseCourtPlace, KeyValue
} from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';

declare var $;


@Component({
  selector: 'app-add-case',
  templateUrl: '../add-case/add-case.component.html'
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

  constructor(private fb: FormBuilder) {
    this.AddCaseUser();
  }

  submitAddCaseUser(data) {
    $.toaster({ priority: 'success', title: 'Success', message: 'Case added successfully' });
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
