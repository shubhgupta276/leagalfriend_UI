import { Component, OnInit, Input, Output } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import {
//   CaseResource, CaseManager, CaseCourt, CaseState, ParentCase, CaseCustomerName,
//   CaseBranch, CaseStage, CaseEmployee, CaseCourtPlace, KeyValue
// } from '../../../shared/Utility/util-common';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { Court } from "../../master/court/Court";
import { getCourtsUrl } from '../../master/master.config';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { StorageService } from "../../../shared/services/storage.service";
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { EditCase } from '../../../shared/models/auth/editcase.model';
import { DatePipe } from '@angular/common';
import { parse } from 'querystring';
declare var $;
@Component({
  selector: 'app-edit-case',
  templateUrl: '../edit-case/edit-case.component.html',
  providers: [StorageService, AuthService, DatePipe]
  // template:`<h1>test popup</h1>`
})
export class EditCaseComponent implements OnInit {

  @Input() editCaseForm: FormGroup;

  Resource: any = [];
  Manager: any = [];
  Court: any = [];
  State: any = [];
  ParentCases: any = [];
  CustomerName: any = [];
  Branch: any = [];
  Stage: any = [];
  Employee: any = [];
  CourtPlace: any = [];
  // emailValidationMessage: string = "Email address is required.";
  constructor(private apiGateWay: ApiGateway, private authService: AuthService, private _storageService: StorageService, private datePipe: DatePipe) {

  }
  // submitEditCaseUser(data) {
  //   $.toaster({ priority: 'success', title: 'Success', message: 'Case updated successfully' });
  // }


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
    this.bindStateDDL();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.getManagers();
    this.getEmployee();
    this.bindStageDDL();
    this.getRunningCase();
  }

  GetAllCourt() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.getCourtDDL(reqData).subscribe(

      result => {

        result.courts.forEach(function (value) {


          //$this.arrListCaseBranch1.push({id:value.id,branchName:value.branchName});
          $this.Court.push(value);
          $this.CourtPlace.push(value);
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }

  bindStateDDL() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.bindStateDDL(reqData).subscribe(

      result => {

        result.states.forEach(function (value) {


          //$this.arrListCaseBranch1.push({id:value.id,branchName:value.branchName});
          $this.State.push(value);
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }
  getBranchDDL() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.getBranchDDL(reqData).subscribe(

      result => {
        result.branches.forEach(function (value) {

          $this.Branch.push(value);
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }

  bindRecourseDDL() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.bindRecourseDDL(reqData).subscribe(

      result => {

        result.recourses.forEach(function (value) {


          //$this.arrListCaseBranch1.push({id:value.id,branchName:value.branchName});
          $this.Resource.push(value);
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }

  bindStageDDL() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.bindStageDDL(reqData).subscribe(

      result => {
        debugger
        result.stageRecourses.forEach(function (value) {


          //$this.arrListCaseBranch1.push({id:value.id,branchName:value.branchName});
          $this.Stage.push(value);
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }


  getManagers() {

    var $this = this
    var reqData = {
      clientId: localStorage.getItem('client_id'),
    };
    this.authService.listUsers(reqData).subscribe(

      result => {

        result.forEach(function (value) {

          if (value.roles[0].roleName == 'MANAGER') {
            $this.Manager.push(
              {
                FirstName: value.firstName,
                id: value.id,
                //Role:value.roles[0].roleName
              }
            );
          }
          if (value.roles[0].roleName == 'CLIENT') {
            $this.CustomerName.push(
              {
                FirstName: value.firstName,
                id: value.id,
                //Role:value.roles[0].roleName
              }
            );
          }
        });


      },
      err => {
        console.log(err);
      });
  }


  getEmployee() {

    var $this = this
    var reqData = {
      clientId: localStorage.getItem('client_id'),
    };
    this.authService.listUsers(reqData).subscribe(

      result => {

        result.forEach(function (value) {
          if (value.roles[0].roleName == 'EMPLOYEE') {
            $this.Employee.push(
              {
                FirstName: value.firstName,
                id: value.id,
                //Role:value.roles[0].roleName
              }
            );
          }
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }








  submitEditCaseUser(data) {

    
    const objEditCase = new EditCase();
    objEditCase.id = data.caseId;
    objEditCase.courtCaseId = data.courtCaseId;
    var userId = parseInt(localStorage.getItem('client_id'));
    objEditCase.userId = userId;
    objEditCase.branchId = data.branchId;

    objEditCase.stageId = 1;
    objEditCase.recourseId = data.recourseId;
    objEditCase.employeeId = data.employeeId;
    objEditCase.courtId = data.courtId;
    objEditCase.stateId = data.stateId;
    objEditCase.nextHearingDate = this.datePipe.transform(data.nextHearingDate, "yyyy-MM-dd")
    objEditCase.customerId = data.customerId;
    objEditCase.filingDate = this.datePipe.transform(data.filingdate, "yyyy-MM-dd");
    objEditCase.oppLawyer = data.oppLawyer;
    objEditCase.childCase = data.childCase;
    objEditCase.lastHearingDate = this.datePipe.transform(data.lastHearingDate, "yyyy-MM-dd");
    objEditCase.remark = data.remark;

    this.authService.updateEditCaseUser(objEditCase).subscribe(

      result => {
       // $.toaster({ priority: 'success', title: 'Success', message: 'Case updated successfully' });
        console.log(result);
      },
      err => {
        console.log(err);
      });

  }


  getRunningCase() {

    var $this = this
    var reqData = {
      userId: this._storageService.getUserId(),
    };
    this.authService.getCaseRunning(reqData).subscribe(

      result => {

        result.forEach(function (value) {

        $this.ParentCases.push(
        {
          courtCaseId:value.courtCaseId,
        }
      );
      }
    );
})
}

}

