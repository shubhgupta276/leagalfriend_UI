import { Component, OnInit, Input, Output } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { Court } from "../../master/court/Court";
import { getCourtsUrl } from '../../master/master.config';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { StorageService } from "../../../shared/services/storage.service";
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { EditCase } from '../../../shared/models/auth/editcase.model';
import { DatePipe } from '@angular/common';
import { parse } from 'querystring';
import { CompleterService, CompleterData } from 'ng2-completer';
declare var $;
@Component({
  selector: 'app-edit-case',
  templateUrl: '../edit-case/edit-case.component.html',
  providers: [StorageService, AuthService, DatePipe]
  // template:`<h1>test popup</h1>`
})
export class EditCaseComponent implements OnInit {
  @Input() caseRunning = [];
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
  selectedRecourse: any;
  selectedManager: any;
  selectedCourt: any;
  selectedState: any;
  selectedParentCase: any;
  selectedCustomerName: any;
  selectedBranch: any;
  selectedStage: any;
  selectedEmployee: any;
  selectedCourtPlace: any;
  // arrCompliance = [];
  arr: any = [];
  caseId: any = [];
  complianceGridData = [];
  protected dataService: CompleterData;
  private get disabledV(): string {

    return this._disabledV;
  }

  private set disabledV(value: string) {

    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selectedRecourse1(value: any): void {
    var a = value.id;
    this.selectedRecourse = value;

    this.bindStageDDL(a,null);
    this.Stage.length = 0;



  }
  public selectedManager1(value: any): void {

    this.selectedManager = value;


  }
  public selectedBranch1(value: any): void {

    this.selectedBranch = value;


  }
  public selectedCourt1(value: any): void {

    this.selectedCourt = value;


  }
  public selectedCourtPlace1(value: any): void {

    this.selectedCourtPlace = value;


  }
  public selectedCustomerName1(value: any): void {

    this.selectedCustomerName = value;


  }
  public selectedSatge1(value: any): void {
    this.selectedStage = value;


  }
  public selectedState1(value: any): void {

    this.selectedState = value;


  }
  public selectParentCase1(value: any): void {

    this.selectedParentCase = value;


  }

  public selectEmployee1(value: any): void {
    this.selectedEmployee = value;


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
  editCaseForm: FormGroup;


  Resource: Array<any> = [];
  Manager: any = [];
  Court: any = [];
  State: any = [];
  ParentCases: any = [];
  CustomerName: any = [];
  Branch: any = [];
  Stage: any = [];
  Employee: any = [];
  CourtPlace: any = [];
  recourseSelected: Array<any> = [];
  managerSelected: Array<any> = [];
  employeeSelected: Array<any> = [];
  courtSelected: Array<any> = [];
  stateSelected: Array<any> = [];
  branchSelected: Array<any> = [];
  stageSelected: Array<any> = [];
  parentcaseSelected: Array<any> = [];
  customerSelected: Array<any> = [];
  courtPlaceSelected: Array<any> = [];
  recourseId: any;
  stageId: any;
  // emailValidationMessage: string = "Email address is required.";
  constructor(private fb: FormBuilder, private apiGateWay: ApiGateway,private completerService: CompleterService, private authService: AuthService, private _storageService: StorageService, private datePipe: DatePipe) {
    this.createForm(null);
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
    this.bindStateDDL();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.getManagers();
    this.getEmployee();
    //this.bindStageDDL();
    this.getRunningCase();
    this.BindCompliance();
    this.GetAllCity();

  }
  BindCompliance() {

  }
  bindDataOnEdit(c) {
    debugger
    this.caseId = c.id;
    //this.complianceGridData=[c[0].compliance];
    this.recourseSelected = [];
    const objFilter = this.Resource.filter(x => x.id == c.recourseId);
    this.recourseSelected.push({ id: c.recourseId, text: objFilter[0].text });
    this.selectedRecourse = this.recourseSelected[0];


    this.courtSelected = [];
    const objCourt = this.Court.filter(x => x.id == c.courtId);
    this.courtSelected.push({ id: c.courtId, text: objCourt[0].text });
    this.selectedCourt = this.courtSelected[0];

    this.stateSelected = [];
    const objstate = this.State.filter(x => x.id == c.stateId);
    this.stateSelected.push({ id: c.stateId, text: objstate[0].text });
    this.selectedState = this.stateSelected[0];

    this.branchSelected = [];
    const objBranch = this.Branch.filter(x => x.id == c.branchId);
    this.branchSelected.push({ id: c.branchId, text: objBranch[0].text });
    this.selectedBranch = this.branchSelected[0];
    debugger
    this.stageSelected = [];
    const objStage = this.Stage.filter(x => x.id == c.stageId);
    this.stageSelected.push({ id: c.stageId, text: objStage[0].text });
    this.selectedStage = this.stageSelected[0];
    
    this.customerSelected = [];
    const objcustomerSelected = this.CustomerName.filter(x => x.id == c.customerId);
    this.customerSelected.push({ id: c.customerId, text: objcustomerSelected[0].text });
    this.selectedCustomerName = this.customerSelected[0];

    this.managerSelected = [];
    const objmanagerSelected = this.Manager.filter(x => x.id == c.managerId);
    this.managerSelected.push({ id: c.managerId, text: objmanagerSelected[0].text });
    this.selectedManager = this.managerSelected[0];

    this.employeeSelected = [];
    const objemployeeSelected = this.Employee.filter(x => x.id == c.employeeId);
    this.employeeSelected.push({ id: c.employeeId, text: objemployeeSelected[0].text });
    this.selectedEmployee = this.employeeSelected[0];
    this.courtPlaceSelected = [];
    const objcourtPlaceSelected = this.CourtPlace.filter(x => x.id == c.id);
    this.courtPlaceSelected.push({ id: c.id, text: objcourtPlaceSelected[0].text });
    this.selectedCourtPlace = this.courtPlaceSelected[0];
  
    $("#editCaseModal").modal("show");
  }
  createForm(c) {
    if (c != null) {
      debugger
      // this.recourseId = c.recourseId;
      // this.stageId = c.stageId;
      this.bindStageDDL(c.recourseId,c);

    }





    this.editCaseForm = this.fb.group({


      caseId: [c == null ? null : c.id, Validators.required],

      courtCaseId: [c == null ? null : c.courtCaseId],
      recourse: [c == null ? null : c.recourseId],
      manager: [c == null ? null : c.managerId],
      court: [c == null ? null : c.courtId],
      state: [c == null ? null : c.stateId],
      parentCase: [c == null ? null : c.parentCaseId],
      nextHearingDate: [c == null ? null : this.datePipe.transform(c.nextHearingDate, "yyyy-MM-dd")],
      customerName: [c == null ? null : c.customerId],
      remark: [c == null ? null : c.remark, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [c == null ? null : c.branchId],
      filingdate: [c == null ? null : this.datePipe.transform(c.filingDate, "yyyy-MM-dd")],
      stage: [c == null ? null : c.stageId],
      employee: [c == null ? null : c.employeeId],
      courtplace: [c == null ? null : c.courtId],
      oppLawyer: [c == null ? null : c.oppLawyer],
   
      childCase: [c == null ? null : c.childCase],

      lastHearingDate: [c == null ? null : this.datePipe.transform(c.lastHearingDate, "yyyy-MM-dd")],
      uploadDocument: [],
      completionDate: [c == null ? null : this.datePipe.transform(c.completionDate, "yyyy-MM-dd")]
    });
  }


  //............................................for compliance........................
  bindDataOnEditforCompliance(c) {

    this.recourseSelected = [];

    const objFilter = this.Resource.filter(x => x.id == c[0].legalCase.recourseId);
    this.recourseSelected.push({ id: c[0].legalCase.recourseId, text: objFilter[0].text });
    this.selectedRecourse = this.recourseSelected[0];


    this.courtSelected = [];
    const objCourt = this.Court.filter(x => x.id == c[0].legalCase.courtId);
    this.courtSelected.push({ id: c[0].legalCase.courtId, text: objCourt[0].text });
    this.selectedCourt = this.courtSelected[0];

    this.stateSelected = [];
    const objstate = this.State.filter(x => x.id == c[0].legalCase.stateId);
    this.stateSelected.push({ id: c[0].legalCase.stateId, text: objstate[0].text });
    this.selectedState = this.stateSelected[0];

    this.branchSelected = [];
    const objBranch = this.Branch.filter(x => x.id == c[0].legalCase.branchId);
    this.branchSelected.push({ id: c[0].legalCase.branchId, text: objBranch[0].text });
    this.selectedBranch = this.branchSelected[0];
    this.stageSelected = [];
    const objStage = this.Stage.filter(x => x.id == c[0].legalCase.stageId);
    this.stageSelected.push({ id: c[0].legalCase.stageId, text: objStage[0].text });
    this.selectedStage = this.stageSelected[0];

    this.customerSelected = [];
    const objcustomerSelected = this.CustomerName.filter(x => x.id == c[0].legalCase.customerId);
    this.customerSelected.push({ id: c[0].legalCase.customerId, text: objcustomerSelected[0].text });
    this.selectedCustomerName = this.customerSelected[0];
    this.managerSelected = [];
    const objmanagerSelected = this.Manager.filter(x => x.id == c[0].legalCase.managerId);
    this.managerSelected.push({ id: c[0].legalCase.managerId, text: objmanagerSelected[0].text });
    this.selectedManager = this.managerSelected[0];

    this.employeeSelected = [];
    const objemployeeSelected = this.Employee.filter(x => x.id == c[0].legalCase.employeeId);
    this.employeeSelected.push({ id: c[0].legalCase.employeeId, text: objemployeeSelected[0].text });
    this.selectedEmployee = this.employeeSelected[0];
    this.courtPlaceSelected = [];
    const objcourtPlaceSelected = this.CourtPlace.filter(x => x.id == c[0].legalCase.id);
    this.courtPlaceSelected.push({ id: c[0].legalCase.id, text: objcourtPlaceSelected[0].text });
    this.selectedCourtPlace = this.courtPlaceSelected[0];
  }
  createFormforcompliance(c) {
    this._disabledV = '1';
    this.disabled = true;
    var self = this;
    if (c != null) {
      self.complianceGridData = [];
      this.caseId = c[0].id;
      c.forEach(function (value) {
        self.complianceGridData.push(value.compliance);
      });
      debugger
      this.bindStageDDL(c.recourseId,c);
      // this.complianceGridData=[c[0].compliance];
    
    }





    this.editCaseForm = this.fb.group({


      caseId: [c == null ? null : c[0].legalCase.id, Validators.required],

      courtCaseId: [c == null ? null : c[0].legalCase.courtCaseId],
      recourse: [c == null ? null : c.recourseId],
      manager: [c == null ? null : c.managerId],
      court: [c == null ? null : c.courtId],
      state: [c == null ? null : c.stateId],
      parentCase: [c == null ? null : c.parentCaseId],
      nextHearingDate: [c == null ? null : this.datePipe.transform(c[0].legalCase.nextHearingDate, "yyyy-MM-dd")],
      customerName: [c == null ? null : c.customerId],
      remark: [c == null ? null : c[0].legalCase.remark, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [c == null ? null : c.branchId],
      filingDate: [c == null ? null : this.datePipe.transform(c[0].filingDate, "yyyy-MM-dd")],
      stage: [c == null ? null : c.stageId],
      employee: [c == null ? null : c.employeeId],
      courtplace: [c == null ? null : c.courtId],
      oppLawyer: [c == null ? null : c[0].legalCase.oppLawyer],
      childCase: [c == null ? null : c[0].legalCase.childCase],
      lastHearingDate: [c == null ? null : this.datePipe.transform(c[0].legalCase.lastHearingDate, "yyyy-MM-dd")],
      uploadDocument: [],
      completionDate: [c == null ? null : this.datePipe.transform(c[0].legalCase.completionDate, "yyyy-MM-dd")]
    });
  }


  GetAllCourt() {

    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.getCourtDDL(reqData).subscribe(

      result => {

        result.courts.forEach(function (value) {


          $this.Court.push({ id: value.id, text: value.courtName });

          // $this.CourtPlace.push({ id: value.id, text: value.courtName });
        });

      },
      err => {
        console.log(err);
      });
  }
  GetAllCity() {

    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.GetAllCity(reqData).subscribe(

      result => {

        result.cities.forEach(function (value) {


          $this.CourtPlace.push({ id: value.id, text: value.cityName });

          //$this.CourtPlace.push({ id: value.id, text: value.courtName });
        });

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


        result.recourses.forEach(function (value) {

          $this.Resource.push({ id: value.id, text: value.recourseName });
        });

      },
      err => {
        console.log(err);
      });

  }

  bindStageDDL(a, c) {

    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
      recourseId: a
    };
    this.authService.bindStageDDL(reqData).subscribe(

      result => {
        debugger
        result.stageRecourses.forEach(function (value) {

          $this.Stage.push({ id: value.id, text: value.stageName });
        });
        if (c != null)
          this.bindDataOnEdit(c)
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
            $this.Employee.push({ id: value.id, text: value.firstName });

          }
        });

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
          debugger
          $this.ParentCases.push({ id: value.caseId, text: value.caseId });
        });
        $this.dataService = $this.completerService.local($this.ParentCases, 'id', 'id');
      },
      err => {
        console.log(err);
      });
  }

  compliance() {

    var c = confirm("Do you want to compliance this case?");

    var status = document.getElementById("content");

    if (c == true) {

      var status = document.getElementById("content");

      var reqData = {
        compliance: {
          recourse: {
            id: this.recourseSelected[0].id,
          },

          stage: {
            id: this.stageSelected[0].id,
          }
        },

        legalCase: {
          id: this.caseId,
        },


      };

      this.authService.caseUpdateCompliance(reqData).subscribe(

        result => {

          if (result.body.httpCode == 200) { //success

            $.toaster({ priority: 'success', title: 'Success', message: 'Complaince has been updated successfully' });
            $(window.location.href = "/admin/case");
          }
          else {
            var c = confirm("Case can not be moved under compliance as no compliance mapped against recourse code & stage of this case?");
            var status = document.getElementById("content");

            $('#Compliance').prop('checked', false);
            $('#editCaseModal').modal('hide');
          }
        },
        err => {
          console.log(err);
        });
    }

  }
  closeCase() {

    var id = this.caseId;

    this.authService.closeCase(id).subscribe(

      result => {

        $.toaster({ priority: 'success', title: 'Success', message: 'Complaince has been updated successfully' });
        $('#editCaseModal').modal('hide');
        $(window.location.href = "/admin/case");
        //this.getRunningCase();

        //}

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
    objEditCase.branchId = this.selectedBranch.id;

    objEditCase.stageId = this.selectedStage.id;
    objEditCase.recourseId = this.selectedRecourse.id;
    objEditCase.employeeId = this.selectedEmployee.id;
    objEditCase.courtId = this.selectedCourt.id;
    objEditCase.stateId = this.selectedState.id;
    objEditCase.nextHearingDate = this.datePipe.transform(data.nextHearingDate, "yyyy-MM-dd")
    objEditCase.customerId = this.selectedCustomerName.id;
    objEditCase.managerId = this.selectedManager.id;
    objEditCase.filingDate = this.datePipe.transform(data.filingdate, "yyyy-MM-dd");
    objEditCase.oppLawyer = data.oppLawyer;
    
    var myStringCHILD = data.childCase.substr(data.childCase.lastIndexOf("/")+1)
    objEditCase.childCase = myStringCHILD

   
    objEditCase.lastHearingDate = this.datePipe.transform(data.lastHearingDate, "yyyy-MM-dd");
    objEditCase.remark = data.remark;
    var myString = data.parentCase.substr(data.parentCase.lastIndexOf("/")+1)

     objEditCase.parentCaseId = myString;
    objEditCase.completionDate = this.datePipe.transform(data.completionDate, "yyyy-MM-dd");

    this.authService.updateEditCaseUser(objEditCase).subscribe(

      result => {
debugger
        if (result.body.httpCode == 200) { //success
          this.BindCaseGridOnEdit(data);
          $.toaster({ priority: 'success', title: 'Success', message: 'Case Updated successfully' });
          this.closeModal();
          $('#editCaseModal').modal('hide');

        }
      },
      err => {
        console.log(err);
      });

  }
  BindCaseGridOnEdit(data) {

    this.caseRunning.filter(
      branch => {
        if (branch.id == data.caseId) {
          branch.caseId = data.caseId;
          branch.childCase = data.childCase;

          branch.court = data.court;

          // branch.cityId = data.city;
          // branch.cityName = this.getCityName(data.city);

          branch.recourseCode = this.selectedRecourse.text;
          branch.customerFirstName = this.selectedCustomerName.text;

          branch.employee = this.selectedEmployee.text;


          branch.nextHearingDate = data.nextHearingDate;

          branch.branchName = this.selectedBranch.text;
          branch.stageName = this.selectedStage.text;

        }
      });

  }

  closeModal() {
    $("#closebtn1").click();
  }



}

