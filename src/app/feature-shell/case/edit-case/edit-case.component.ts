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

  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }
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
          $this.Court.push({ id: value.id, text: value.courtName });

          $this.CourtPlace.push({ id: value.id, text: value.courtName });
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }
  bindStateDDL() {
    this.items = [];
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.bindStateDDL(reqData).subscribe(

      result => {

        result.states.forEach(function (value) {


          //$this.arrListCaseBranch1.push({id:value.id,branchName:value.branchName});

          $this.State.push({ id: value.id, text: value.stateName });
          // $this.arDdl.push({ id: value.stateName, text: value.stateName});

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


                id: value.id, text: value.firstName


              }
            );
          }

          if (value.roles[0].roleName == 'CUSTOMER') {
            $this.CustomerName.push(
              {

                id: value.id, text: value.firstName

              }
            );
          }
        });


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

          $this.Branch.push({ id: value.id, text: value.branchName });
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }

  bindRecourseDDL() {
    this.items = [];
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };



    this.authService.bindRecourseDDL(reqData).subscribe(

      result => {

        //  $(".search-container").find(".ng-pristine ng-valid ng-touched").click({
        result.recourses.forEach(function (value) {

          $this.Resource.push({ id: value.id, text: value.recourseName });
        });

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

        result.stageRecourses.forEach(function (value) {

          $this.Stage.push({ id: value.id, text: value.stageName });
        });
        console.log(result);
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




  getRunningCase() {


    var $this = this
    var reqData = {
      userId: this._storageService.getUserId(),
    };
    this.authService.getCaseRunning(reqData).subscribe(

      result => {

        result.forEach(function (value) {
          $this.ParentCases.push({ id: value.parentCaseId, text: value.parentCaseId });
        });
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }



  submitEditCaseUser(data) {

    debugger
    const objEditCase = new EditCase();
    objEditCase.id = data.caseId;
    objEditCase.courtCaseId = data.courtCaseId;
    var userId = parseInt(localStorage.getItem('client_id'));
    objEditCase.userId = userId;
    objEditCase.branchId = data.branchId;

    objEditCase.stageId = data.stage[0].id;
    objEditCase.recourseId = data.recourse[0].id;
    objEditCase.employeeId = data.employee[0].id;
    objEditCase.courtId = data.court[0].id;
    objEditCase.stateId = data.state[0].id;
    objEditCase.nextHearingDate = this.datePipe.transform(data.nextHearingDate, "yyyy-MM-dd")
    objEditCase.customerId = data.customerName[0].id;
    objEditCase.managerId = data.manager[0].id;
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


  

}

