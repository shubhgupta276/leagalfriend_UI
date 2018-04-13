import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { EditCase } from '../../../shared/models/auth/editcase.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { StorageService } from "../../../shared/services/storage.service";
import { HttpResponse } from 'selenium-webdriver/http';

declare var $;
@Component({
  selector: 'app-add-case',
  templateUrl: '../add-case/add-case.component.html',
  providers: [StorageService, AuthService, DatePipe],


})
export class AddCaseComponent implements OnInit {

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


  addCaseForm: FormGroup;

  Resource: any = [];
  Manager: any = [];
  Court: any = [];
  State: any = [];
  ParentCases: any = [];
  CustomerName: any = [];
  Branch: any = [];
  Stage: any = [];
  Employee: any = [];
  CourtPlace: any[] = [];
  fillignDateValue: string;
  config: any;
  configData: any;
  arDdl: any = [];
  AddCaseUser() {
    this.addCaseForm = this.fb.group({

      courtCaseId: [],
      recourse: [null, Validators.required],
      manager: [null, Validators.required],
      court: [null, Validators.required],
      state: [null, Validators.required],
      parentCase: [null, Validators.required],
      nextHearingDate: [null, Validators.required],
      customerName: [null, Validators.required],
      remark: [null, Validators.required],
      branch: [null, Validators.required],
      filingdate: [],
      stage: [null, Validators.required],
      employee: [null, Validators.required],
      courtplace: [null, Validators.required],
      oppLawyer: [],
      childCase: [],
      lastHearingDate: [null, Validators.required],
      uploadDocument: [],
    });
  }

  constructor(private fb: FormBuilder, private apiGateWay: ApiGateway, private authService: AuthService, private _storageService: StorageService, private datePipe: DatePipe) {

    this.AddCaseUser();
    this.GetAllCourt();
    this.bindStateDDL();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.getManagers();
    this.getEmployee();
    this.bindStageDDL();
    this.getRunningCase();
    this.getEmployee();

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


  getEmployee() {

    var $this = this
    var reqData = {
      clientId: localStorage.getItem('client_id'),
    };
    this.authService.listUsers(reqData).subscribe(

      result => {

        result.forEach(function (value) {
          if (value.roles[0].roleName == 'EMPLOYEE') {
            $this.Employee.push({ id: value.id, text: value.firstName, });
          }
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

        result.stageRecourses.forEach(function (value) {

          $this.Stage.push({ id: value.id, text: value.stageName });
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
  submitAddCaseUser(data) {

    debugger
    const objEditCase = new EditCase();
    //objEditCase.branch = data.branch[0].id;
    var userId = parseInt(localStorage.getItem('client_id'));
    objEditCase.userId = userId;
    objEditCase.childCase = data.childCase;
    objEditCase.courtCaseId = data.courtCaseId;
    objEditCase.courtId = data.court[0].id;
    objEditCase.customerId = data.customerName[0].id;
    objEditCase.filingDate = this.datePipe.transform(data.filingdate, "yyyy-MM-dd");
    //objEditCase.caseid=data.caseId;
    objEditCase.lastHearingDate = this.datePipe.transform(data.lastHearingDate, "yyyy-MM-dd");
    objEditCase.nextHearingDate = this.datePipe.transform(data.nextHearingDate, "yyyy-MM-dd")
    objEditCase.oppLawyer = data.oppLawyer;
    objEditCase.recourseId = data.recourse[0].id;
    objEditCase.remark = data.remark;
    objEditCase.stageId = data.stage[0].id;
    objEditCase.employeeId = data.employee[0].id;

    objEditCase.managerId = data.manager[0].id;
    objEditCase.stateId = data.state[0].id;
    objEditCase.parentCaseId = data.parentCase[0].id;
    this.authService.submitEditCaseUser(objEditCase).subscribe(

      result => {
        debugger




        // if (result.body.httpCode == 200) { //success

        //   $.toaster({ priority: 'success', title: 'Success', message: 'Case saved successfully' });

        // }

        console.log(result);
      },
      err => {
        console.log(err);
      });

  }

  ngOnInit() {
    // (<any>this.Resource).open()
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




