import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { Court } from '../../master/court/Court';
import { getCourtsUrl } from '../../master/master.config';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { StorageService } from '../../../shared/services/storage.service';
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { EditCase } from '../../../shared/models/auth/editcase.model';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../shared/services/shared.service';
import { parse } from 'querystring';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
declare var $;
@Component({
  selector: 'app-edit-case',
  templateUrl: '../edit-case/edit-case.component.html',
  providers: [StorageService, AuthService, DatePipe]
})
export class EditCaseComponent implements OnInit {
  myDocument: File;
  @Input() tableInputData = [];
  isRunningCase: boolean = true;
  arCourts: any[] = [];
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
  arr: any = [];
  id: any = [];
  caseId: any;
  isCompliance: boolean;
  complianceGridData = [];
  caseFile: any[] = [];
  public searchStr1: string;
  dataService: CompleterData;
  dataService1: CompleterData;
  isViewOnly = this._sharedService.isViewOnly();
  editCaseForm: FormGroup;
  ChildCases: any = [];
  Resource: Array<any> = [];
  Manager: any = [];
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
  parentcaseSelectedauto: Array<any> = [];
  childcaseSelectedauto: Array<any> = [];
  stageId: any;
  childCaseText: string;
  childParentText: string;
  constructor(private fb: FormBuilder, private apiGateWay: ApiGateway, private _router: Router,
    private authService: AuthService, private completerService: CompleterService, private _activatdRoute: ActivatedRoute,
    private _storageService: StorageService, private _sharedService: SharedService, private datePipe: DatePipe) {
    this.createForm(null);
  }

  ngOnInit() {
    this._activatdRoute.params.subscribe((param) => {
      this.id = param.id;
      this.isCompliance = JSON.parse(param.isCompliance);
      this.isRunningCase = !this.isCompliance;
    });
    const self = this;
    $(document).ready(function () {
      $('.input-group.date').datepicker().on('changeDate', function (ev) {
        const attrName = $(this).find('input').attr('formControlName');
        const attrValue = $(this).find('input').val();

        self.editCaseForm.controls[attrName].setValue(attrValue);
      });
    });
    this.bindAllDropdowns();
  }

  getCaseDetails() {
    const reqData = { caseId: this.id };
    this.authService.getCaseByCaseId(reqData).subscribe(
      result => {
        this.createForm(result);
      },
      err => {
        console.log(err);
      });

    if (this.isCompliance) {
      this.authService.getCaseCompliance(reqData).subscribe(
        result => {
          this.complianceGridData = result;
          this.disabled = true;
          // this.createFormforcompliance(result);
        },
        err => {
          console.log(err);
        });
    }
  }

  bindAllDropdowns() {
    this.bindStateDDL();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.getManagers();
    this.getEmployee();
    this.getRunningCase();
    this.BindCompliance();
    this.getCustomer();
    this.GetAllCourt();
    setTimeout(() => {
      this.getCaseDetails();
    }, 500);
  }

  GetAllCourt() {
    const reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.arCourts = [];
    const $this = this;
    this.authService.getCourtDDL(reqData).subscribe(
      result => {
        result.courts.forEach(function (value) {
          $this.arCourts.push({ id: value.id, text: value.courtName });
        });
      },
      err => {
        console.log(err);
      });
  }

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

    this.bindStageDDL(a, null);
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

  removeRecourse(data) {
    this.selectedRecourse = null;
  }

  removedStage(data) {
    this.selectedStage = null;
  }

  removedBranch(data) {
    this.selectedBranch = null;
  }

  removedManager(data) {
    this.selectedManager = null;
  }

  removedEmployee(data) {
    this.selectedEmployee = null;
  }

  removedCustomer(data) {
    this.selectedCustomerName = null;
  }

  removedState(data) {
    this.selectedState = null;
  }
  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  BindCompliance() {

  }
  bindDataOnEdit(c) {
    this.caseFile = [];
    const $this = this;
    (c.caseFiles.forEach(function (value) {
      $this.caseFile.push(value);
    }));
    this.parentcaseSelectedauto = [];
    this.caseId = c.caseId;
    this.id = c.id;

    this.recourseSelected = [];
    const objFilter = this.Resource.filter(x => x.id === c.recourseId);
    this.recourseSelected.push({ id: c.recourseId, text: objFilter[0].text });
    this.selectedRecourse = this.recourseSelected[0];


    this.courtSelected = [];
    if (c.courtId) {
      const objCourt = this.arCourts.filter(x => x.id === c.courtId);
      this.courtSelected.push({ id: c.courtId, text: objCourt[0].text });
      this.selectedCourt = this.courtSelected[0];
    }
    if (c.stateId != null) {
      this.stateSelected = [];
      const objstate = this.State.filter(x => x.id === c.stateId);
      this.stateSelected.push({ id: c.stateId, text: objstate[0].text });
      this.selectedState = this.stateSelected[0];
    }
    this.branchSelected = [];
    const objBranch = this.Branch.filter(x => x.id === c.branchId);
    this.branchSelected.push({ id: c.branchId, text: objBranch[0].text });
    this.selectedBranch = this.branchSelected[0];
    if (c.stageId != null) {
      this.stageSelected = [];
      const objStage = this.Stage.filter(x => x.id === c.stageId);
      this.stageSelected.push({ id: c.stageId, text: objStage[0].text });
      this.selectedStage = this.stageSelected[0];
    }


    this.customerSelected = [];
    const objcustomerSelected = this.CustomerName.filter(x => x.id === c.customerId);
    this.customerSelected.push({ id: c.customerId, text: objcustomerSelected[0].text });
    this.selectedCustomerName = this.customerSelected[0];

    this.managerSelected = [];
    const objmanagerSelected = this.Manager.filter(x => x.id === c.managerId);
    this.managerSelected.push({ id: c.managerId, text: objmanagerSelected[0].text });
    this.selectedManager = this.managerSelected[0];
    this.employeeSelected = [];
    const objemployeeSelected = this.Employee.filter(x => x.id === c.employeeId);
    this.employeeSelected.push({ id: c.employeeId, text: objemployeeSelected[0].text });
    this.selectedEmployee = this.employeeSelected[0];


    this.courtPlaceSelected = [];
    const objcourtPlaceSelected = this.CourtPlace.filter(x => x.id === c.id);
    if (objcourtPlaceSelected.length > 0) {
      this.courtPlaceSelected.push({ id: c.id, text: objcourtPlaceSelected[0].text });
      this.selectedCourtPlace = this.courtPlaceSelected[0];
    }
    $('#editCaseModal').modal('show');
  }

  createForm(c, isFromOtherPage = false) {
    if (c != null) {
      if (!isFromOtherPage) {
        this.bindStageDDL(c.recourseId, c);
      }
    }
    if (c != null) {
      if (c.completionDate) {
        this.isRunningCase = false;
      }
      if (c.parentCaseId != null) {

        const objparentCase = this.ParentCases.filter(x => x.id == c.parentCaseId);
        this.parentcaseSelectedauto.push({ id: c.parentCaseId, text: objparentCase[0].text });
        this.childCaseText = this.parentcaseSelectedauto[0].text;
      }

      if (c.childCase != null) {
        this.childcaseSelectedauto = [];
        const objchild = this.ChildCases.filter(x => x.id === parseInt(c.childCase));
        this.childcaseSelectedauto.push({ id: parseInt(c.childCase), text: objchild[0].text });
        this.childParentText = this.childcaseSelectedauto[0].text;
      }
    }

    this.editCaseForm = this.fb.group({
      title: [c == null ? null : c.title, Validators.required],
      caseId: [c == null ? null : c.caseId, Validators.required],
      courtCaseId: [c == null ? null : c.courtCaseId],
      recourse: [c == null ? null : c.recourseId],
      manager: [c == null ? null : c.managerId],
      court: [c == null ? null : c.courtId],
      state: [c == null ? null : c.stateId],
      parentCase: [c == null ? null : this.childCaseText],
      nextHearingDate: [c == null ? null : this.datePipe.transform(c.nextHearingDate, 'yyyy-MM-dd')],
      customerName: [c == null ? null : c.customerId],
      remark: [c == null ? null : c.remark, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [c == null ? null : c.branchId],
      filingdate: [c == null ? null : this.datePipe.transform(c.filingDate, 'yyyy-MM-dd')],
      stage: [c == null ? null : c.stageId],
      employee: [c == null ? null : c.employeeId],
      courtplace: [c == null ? null : c.courtId],
      oppLawyer: [c == null ? null : c.oppLawyer],
      childCase: [c == null ? null : this.childParentText],
      lastHearingDate: [c == null ? null : this.datePipe.transform(c.lastHearingDate, 'yyyy-MM-dd')],
      uploadDocument: [],
      completionDate: [c == null ? null : this.datePipe.transform(c.completionDate, 'yyyy-MM-dd')]
    });
    setTimeout(() => {
      if (!this.isRunningCase) {
        this.editCaseForm.disable();
      } else {
        this.editCaseForm.enable();
      }
      if (localStorage.userRole == 'CLIENT') {
        this.editCaseForm.disable();
        this._disabledV = '1';
        this.disabled = true;
        // $('#Compliance').hide();
        $('#btnSubmit').hide();

      }
    }, 200);
  }


  // ............................................for compliance........................
  bindDataOnEditForCompliance(c) {

    this._disabledV = '1';
    this.disabled = true;
    const self = this;
    if (c != null) {
      self.complianceGridData = c;
      this.recourseSelected = [];

      const objFilter = this.Resource.filter(x => x.id === c[0].legalCase.recourseId);
      this.recourseSelected.push({ id: c[0].legalCase.recourseId, text: objFilter[0].text });
      this.selectedRecourse = this.recourseSelected[0];


      this.courtSelected = [];
      const objCourt = this.arCourts.filter(x => x.id === c[0].legalCase.courtId);
      this.courtSelected.push({ id: c[0].legalCase.courtId, text: objCourt[0].text });
      this.selectedCourt = this.courtSelected[0];

      this.stateSelected = [];
      const objstate = this.State.filter(x => x.id === c[0].legalCase.stateId);
      this.stateSelected.push({ id: c[0].legalCase.stateId, text: objstate[0].text });
      this.selectedState = this.stateSelected[0];

      this.branchSelected = [];
      const objBranch = this.Branch.filter(x => x.id === c[0].legalCase.branchId);
      this.branchSelected.push({ id: c[0].legalCase.branchId, text: objBranch[0].text });
      this.selectedBranch = this.branchSelected[0];

      if (c[0].legalCase.stageId != null) {
        this.stageSelected = [];
        const objStage = this.Stage.filter(x => x.id === c[0].legalCase.stageId);
        this.stageSelected.push({ id: c[0].legalCase.stageId, text: objStage[0].text });
        this.selectedStage = this.stageSelected[0];
      }

      this.customerSelected = [];
      const objcustomerSelected = this.CustomerName.filter(x => x.id === c[0].legalCase.customerId);
      this.customerSelected.push({ id: c.customerId, text: objcustomerSelected[0].text });
      this.selectedCustomerName = this.customerSelected[0];

      this.managerSelected = [];
      const objmanagerSelected = this.Manager.filter(x => x.id === c[0].legalCase.managerId);
      this.managerSelected.push({ id: c.managerId, text: objmanagerSelected[0].text });
      this.selectedManager = this.managerSelected[0];
      this.employeeSelected = [];
      const objemployeeSelected = this.Employee.filter(x => x.id === c[0].legalCase.employeeId);
      this.employeeSelected.push({ id: objemployeeSelected[0].id, text: objemployeeSelected[0].text });
      this.selectedEmployee = this.employeeSelected[0];
      this.courtPlaceSelected = [];
      const objcourtPlaceSelected = this.CourtPlace.filter(x => x.id === c[0].legalCase.id);
      if (objcourtPlaceSelected.length > 0) {
        this.courtPlaceSelected.push({ id: c[0].legalCase.id, text: objcourtPlaceSelected[0].text });
        this.selectedCourtPlace = this.courtPlaceSelected[0];
      }
    }
  }
  createFormforcompliance(c) {
    this.bindStageDDL(c[0].legalCase.recourseId, c);
    if (c != null) {
      if (c[0].legalCase.parentCaseId != null) {
        const objparentCase = this.ParentCases.filter(x => x.id == c[0].legalCase.parentCaseId);
        this.parentcaseSelectedauto.push({ id: c[0].legalCase.parentCaseId, text: objparentCase[0].text });
        this.childCaseText = this.parentcaseSelectedauto[0].text;
      }
      if (c[0].legalCase.childCase != null) {
        this.childcaseSelectedauto = [];
        // tslint:disable-next-line:radix
        const objchild = this.ChildCases.filter(x => x.id === parseInt(c[0].legalCase.childCase));
        // tslint:disable-next-line:radix
        this.childcaseSelectedauto.push({ id: parseInt(c[0].legalCase.childCase), text: objchild[0].text });
        this.childParentText = this.childcaseSelectedauto[0].text;
      }
    }
    this.editCaseForm.disable();
    this.editCaseForm = this.fb.group({
      title: [c == null ? null : c[0].legalCase.title, Validators.required],
      caseId: [c == null ? null : c[0].legalCase.caseId, Validators.required],
      courtCaseId: [c == null ? null : c[0].legalCase.courtCaseId],
      recourse: [c == null ? null : c.recourseId],
      manager: [c == null ? null : c.managerId],
      court: [c == null ? null : c.courtId],
      state: [c == null ? null : c.stateId],
      parentCase: [c == null ? null : this.childCaseText],
      nextHearingDate: [c == null ? null : this.datePipe.transform(c[0].legalCase.nextHearingDate, 'yyyy-MM-dd')],
      customerName: [c == null ? null : c.customerId],
      remark: [c == null ? null : c[0].legalCase.remark, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [c == null ? null : c.branchId],
      filingdate: [c == null ? null : c.filingdate],
      stage: [c == null ? null : c.stageId],
      employee: [c == null ? null : c.employeeId],
      courtplace: [c == null ? null : c.courtId],
      oppLawyer: [c == null ? null : c[0].legalCase.oppLawyer],
      childCase: [c == null ? null : this.childParentText],
      lastHearingDate: [c == null ? null : this.datePipe.transform(c[0].legalCase.lastHearingDate, 'yyyy-MM-dd')],
      uploadDocument: [],
      completionDate: [c == null ? null : this.datePipe.transform(c[0].legalCase.completionDate, 'yyyy-MM-dd')],
    });
    if (localStorage.userRole === 'CLIENT') {
      this.editCaseForm.disable();
      this._disabledV = '1';
      this.disabled = true;
      $('#btnSubmit').hide();
    }
  }


  bindStateDDL() {
    const $this = this;
    const reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.bindStateDDL(reqData).subscribe(

      result => {

        result.states.forEach(function (value) {

          $this.State.push({ id: value.id, text: value.stateName });

        });

      },
      err => {
        console.log(err);
      });
  }

  getManagers() {

    var $this = this
    var reqData = {
      userId: this._storageService.getUserId(),
    };

    this.authService.listManager(reqData).subscribe(
      result => {

        if (result.length === 0) {
          $('#spnCustomer').show();
          $('#spnManager').show();

        }

        result.forEach(function (value) {
          $this.Manager.push(
            {
              id: value.id, text: value.name
            }
          );

        });
      },
      err => {
        console.log(err);
      });
  }
  getBranchDDL() {
    const $this = this;
    const reqData = {
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
    const $this = this;
    const reqData = {
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

    const $this = this;

    var recourseId;
    recourseId = a;

    this.authService.bindStageDDL(recourseId).subscribe(

      result => {

        if (result.httpCode === 200 && result.stageRecourses.length > 0) {
          result.stageRecourses.forEach(function (value) {

            $this.Stage.push({ id: value.id, text: value.stageName });
          });


        }
        if (c != null) {

          setTimeout(() => {
            if (c[0] != undefined) {

              this.bindDataOnEditForCompliance(c);
            }
            else {
              this.bindDataOnEdit(c);
            }


          }, 20);

        }
      },
      err => {
        console.log(err);
      });
  }


  getCustomer() {

    var $this = this
    var reqData = {
      userId: this._storageService.getUserId(),
    };
    this.authService.listCustomers(reqData, false).subscribe(

      result => {

        if (result == 0) {
          $('#spnEmployee').show();
        }

        result.forEach(function (value) {

          //  if (value.roles[0].roleName === 'EMPLOYEE') {
          $this.CustomerName.push({ id: value.id, text: value.name, });
          //  }

        });
      }

    );
  }

  getEmployee() {

    var $this = this
    var reqData = {
      userId: this._storageService.getUserId(),
    };
    this.authService.listUsers(reqData).subscribe(

      result => {

        if (result == 0) {
          $('#spnEmployee').show();
        }
        result.forEach(function (value) {

          //  if (value.roles[0].roleName === 'EMPLOYEE') {
          $this.Employee.push({ id: value.id, text: value.name, });
          //  }

        });
      }

    );
  }




  getRunningCase() {

    if (!this._storageService.getBranchData()) {
      b = { id: -1 }

    }
    else {
      var b = this._storageService.getBranchData()
    }

    const $this = this;
    const reqData = {
      userId: this._storageService.getUserId(),
      branchId: b.id
    };
    this.authService.getCaseRunning(reqData).subscribe(

      result => {

        result.forEach(function (value) {
          $this.ParentCases.push({ id: value.id, text: value.caseId });
          $this.ChildCases.push({ id: value.id, text: value.caseId });
        });
        $this.dataService = $this.completerService.local($this.ParentCases, 'text', 'text');
        $this.dataService1 = $this.completerService.local($this.ChildCases, 'text', 'text');

      },
      err => {
        console.log(err);
      });
  }

  compliance() {
    if (confirm('Do you want to compliance this case?')) {
      const reqData = {
        compliance: {
          recourse: {
            id: this.recourseSelected[0].id,
          },

          stage: {
            id: this.stageSelected[0].id,
          }
        },

        legalCase: {
          id: this.id,
        },
      };
      this.authService.caseUpdateCompliance(reqData).subscribe(
        result => {
          console.log(result);
          if (result.body.httpCode === 200) { // success
            $.toaster({ priority: 'success', title: 'Success', message: 'Complaince has been updated successfully' });
            this.editCaseForm.disable();
            this.isCompliance = true;
            this.redirectSamePage();
          } else {
            alert('Case can not be moved under compliance as no compliance mapped against recourse code & stage of this case?');
          }
        },
        err => {
          console.log(err);
        });
    } else {
      $('#Compliance').prop('checked', false);
    }
  }

  redirectSamePage() {
    this.getCaseDetails();
    this.disabled = this.isCompliance;
    this._router.navigate(['/admin/case/editcase/' + this.id + '/' + this.isCompliance]);
  }

  closeCase(data) {
    this.authService.closeCase(data.id).subscribe(
      result => {
        this.complianceGridData.splice(this.complianceGridData.findIndex(x => x.id === data.id), 1);
        $.toaster({ priority: 'success', title: 'Success', message: 'Complaince has been updated successfully' });
        if (this.complianceGridData.length === 0) {
          this.isCompliance = false;
          this.redirectSamePage();
        }
      },
      err => {
        console.log(err);
      });
  }
  onFileChange(event) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.myDocument = event.target.files[0];
    }
  }
  submitEditCaseUser(data) {
    const objEditCase: FormData = new FormData();
    try {
      if (this.editCaseForm.get('remark').invalid) {
        // tslint:disable-next-line:no-string-throw
        throw 'enter remarks';
      }
      const x = {
        'id': this.id,
        'title': data.title,
        'caseId': this.caseId,
        'courtCaseId': data.courtCaseId,
        // tslint:disable-next-line:radix
        'userId': this._storageService.getUserId(),
        'branchId': this.selectedBranch.id,
        'stageId': this.selectedStage.id,
        'recourseId': this.selectedRecourse.id,
        'employeeId': this.selectedEmployee.id,
        'courtId': (this.selectedCourt) ? this.selectedCourt.id : null,
        'stateId': this.selectedState.id,
        'nextHearingDate': this.datePipe.transform(data.nextHearingDate, 'yyyy-MM-dd'),
        'customerId': this.selectedCustomerName.id,
        'managerId': this.selectedManager.id,
        'filingDate': this.datePipe.transform(data.filingdate, 'yyyy-MM-dd'),
        'childCase': (data.childCase == undefined ? null : (data.childCase.substr(data.childCase.lastIndexOf('/') + 1))),
        'oppLawyer': data.oppLawyer,
        'lastHearingDate': this.datePipe.transform(data.lastHearingDate, 'yyyy-MM-dd'),
        'remark': data.remark,
        'parentCaseId': (data.parentCase == undefined ? null : (data.parentCase.substr(data.parentCase.lastIndexOf('/') + 1))),
        'completionDate': this.datePipe.transform(data.completionDate, 'yyyy-MM-dd')
      };
      objEditCase.append('legalCase', JSON.stringify(x));
      objEditCase.append('file', this.myDocument);
      if (this.isValid(data)) {
        if (!x.completionDate) {
          this.updateCase(objEditCase, data);
        } else {
          if (confirm('Are you sure you want to close this case?')) {
            this.updateCase(objEditCase, data);
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
  }

  isValid(data: any): boolean {
    if (!data.title || data.title.length <= 0) {
      return false;
    }
    return true;
  }

  updateCase(objEditCase, data) {
    this.authService.updateEditCaseUser(objEditCase).subscribe(
      result => {

        if (result.body.httpCode === 200) { // success
          $.toaster({ priority: 'success', title: 'Success', message: 'Case Updated successfully' });
          this.back();
        }
      },
      err => {
        console.log(err);
      });
  }

  back() {
    this._router.navigate(['/admin/case']);
  }

  deleteCaseFile(item) {
    if (confirm('Are you sure you want to delete?')) {
      this.authService.deleteCaseById(item.id).subscribe(
        result => {
          $.toaster({ priority: 'success', title: 'Success', message: 'Case File deleted successfully' });
          const deleteIndex = this.caseFile.findIndex(x => x.id === item.id);
          this.caseFile.splice(deleteIndex, 1);
        }
      );
    }
  }

  downloadCaseFile(data) {
    this.authService.downloadFile(data.id).subscribe(
      (result) => {
        const blob = new Blob([result]);
        saveAs(blob, data.fileName);
      },
      err => {
        console.log(err);
      });
  }
}


