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
  providers: [StorageService, AuthService, DatePipe]
})
export class AddCaseComponent implements OnInit {

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
      recourse: [1],
      manager: [1],
      court: [1],
      state: [1],
      parentCase: [1],
      nextHearingDate: [],
      customerName: [1],
      remark: [null, Validators.required],
      branch: [],
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

  constructor(private fb: FormBuilder, private apiGateWay: ApiGateway, private authService: AuthService, private _storageService: StorageService, private datePipe: DatePipe) {
    this.config = {
      displayKey: "name",//if objects array passed which key to be displayed defaults to description,
      search: true //enables the search plugin to search in the list,



    }
    this.AddCaseUser();
    // this.ngOnInit();
    this.GetAllCourt();
    this.bindStateDDL();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.getManagers();
    this.getEmployee();
    this.bindStageDDL();
    // this.getRunningCase();
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
          $this.Court.push({ name: value.courtName });

          $this.CourtPlace.push({ name: value.courtName });
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
        debugger
        result.branches.forEach(function (value) {

          $this.Branch.push({ name: value.branchName });
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
          $this.arDdl.push({ name: value.stateName });

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
        //  $(".search-container").find(".ng-pristine ng-valid ng-touched").click({
        result.recourses.forEach(function (value) {

          $this.Resource.push({ name: value.recourseName });


        });

       
        

      },
      err => {
        console.log(err);
      });

      setTimeout(() => {
        // $(".ngx-dropdown-button").click();
        $("#divRecourse").find(".ngx-dropdown-button").click();
         // alert( $(".search-container").find("input").val());
         // $(".search-container").find("input").trigger(e);
       }, 1000);
    // $this.Resource = [
    //   {name:"res1"},
    //   {name:"res2"},
    //   {name:"res3"},
    //   {name:"res4"},
    // ]
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

                name: value.firstName


              }
            );
          }

          if (value.roles[0].roleName == 'CUSTOMER') {
            $this.CustomerName.push(
              {

                name: value.firstName

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
        debugger
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


  bindStageDDL() {

    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.bindStageDDL(reqData).subscribe(

      result => {

        result.stageRecourses.forEach(function (value) {

          $this.Stage.push({ name: value.stageName });
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
    objEditCase.branchId = data.branch;
    var userId = parseInt(localStorage.getItem('client_id'));
    objEditCase.userId = userId;
    objEditCase.childCase = data.childCase;
    objEditCase.courtCaseId = data.courtCaseId;
    objEditCase.courtId = data.court;
    objEditCase.customerId = data.customerName;
    objEditCase.filingDate = this.datePipe.transform(data.filingdate, "yyyy-MM-dd");
    //objEditCase.caseid=data.caseId;
    objEditCase.lastHearingDate = this.datePipe.transform(data.lastHearingDate, "yyyy-MM-dd");
    objEditCase.nextHearingDate = this.datePipe.transform(data.nextHearingDate, "yyyy-MM-dd")
    objEditCase.oppLawyer = data.oppLawyer;
    objEditCase.recourseId = data.recourse;
    objEditCase.remark = data.remark;
    objEditCase.stageId = data.stage;
    objEditCase.employeeId = data.employee;

    objEditCase.managerId = data.manager;
    objEditCase.stateId = data.state;
    objEditCase.parentCaseId = data.parentCase;
    this.authService.submitEditCaseUser(objEditCase).subscribe(

      result => {
debugger

//var _result = result.body;


// if (result.body.httpCode == 200) { //success

//  $.toaster({ priority: 'success', title: 'Success', message: 'Case saved successfully'  });
  
// }

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


  // getRunningCase() {

  //   $this = this;
  //   var reqData = {
  //   erId: this._storageService.getUserId(),
  //   };
  //     authService.getCaseRunning(reqData).subscribe(

  //          {  

  //     sult.forEach(function (value) {

  //     $this.ParentCases.push(
  //       {
  //              //courtCaseId:value.courtCaseId,

  //              name:value.id
  //           }
  //         );
  //       }
  //       );
  //     })

  // }
}




