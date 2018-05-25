import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { EditCase } from '../../../shared/models/auth/editcase.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { StorageService } from "../../../shared/services/storage.service";
import { HttpResponse } from 'selenium-webdriver/http';
import { CompleterService, CompleterData } from 'ng2-completer';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';


declare var $;
@Component({
  selector: 'app-add-case',
  templateUrl: '../add-case/add-case.component.html',
  providers: [StorageService, AuthService, DatePipe],
  styles: [':host(.completer-dropdown-holder) { position: absolute; background-color: red; }']


})
export class AddCaseComponent implements OnInit {
  @Input() caseRunning = [];
  finalData: any = {};
  process: number[] = [];
  fileData: File;
  myDocument: File;
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
  public selectedRecourse1(value: any): void {



    var a = value.id;
    this.selectedRecourse = value;
    //this.bindStageDDL(value);
    this.bindStageDDL(a);


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
  selectedRecourse: any;
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
      parentCase: [null],
      nextHearingDate: [null, Validators.required],
      customerName: [null, Validators.required],
      remark: [null, Validators.required],
      branch: [null, Validators.required],
      filingdate: [null, Validators.required],
      stage: [null, Validators.required],
      employee: [null, Validators.required],
      courtplace: [null],
      oppLawyer: [],
      childCase: [],
      lastHearingDate: [null, Validators.required],
      uploadDocument: null,
      myDocument: null
    });
  }
  public searchStr: string;
  public match: any;
  public captain: string;
  public dataService: CompleterData;
  public searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett'];


  constructor(private Upload: NgxfUploaderService, private completerService: CompleterService, private fb: FormBuilder, private apiGateWay: ApiGateway, private authService: AuthService, private _storageService: StorageService, private datePipe: DatePipe) {
    // this.dataService = completerService.local(this.ParentCases, 'id', 'id');
    this.AddCaseUser();
    this.GetAllCourt();
    this.bindStateDDL();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.getManagers();
    this.getEmployee();
    // this.bindStageDDL();
    this.getRunningCase();
    this.getEmployee();
    this.GetAllCity();

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
  getBranchDDL() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.getBranchDDL(reqData).subscribe(

      result => {

        if (result.branches.length == 0) {
          $("#spnBranch").show();
        }
        result.branches.forEach(function (value) {

          $this.Branch.push({ id: value.id, text: value.branchName });
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

        if (result.length == 0) {
          $("#spnCustomer").show();
          $("#spnManager").show();

        }

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
        if (result == 0) {
          $("#spnEmployee").show();
        }
        result.forEach(function (value) {
          if (value.roles[0].roleName == 'EMPLOYEE') {
            $this.Employee.push({ id: value.id, text: value.firstName, });
          }
          if (value.roles[0].roleName == 'ADMIN') {
            $this.Employee.push({ id: value.id, text: value.firstName, });
          }
          if (value.roles[0].roleName == 'MANAGER') {
            $this.Employee.push({ id: value.id, text: value.firstName, });
          }
        });

      },
      err => {
        console.log(err);
      });
  }

  bindStageDDL(a) {

    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
      recourseId: a
    };
    this.authService.bindStageDDL(reqData).subscribe(

      result => {

        result.stageRecourses.forEach(function (value) {

          $this.Stage.push({ id: value.id, text: value.stageName });
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

          $this.ParentCases.push({ id: value.id, text: value.caseId });
        });

        $this.dataService = $this.completerService.local($this.ParentCases, 'id', 'text');
        
      },
      err => {
        console.log(err);
      });
  }

  onFileChange(event) {
    
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.myDocument = event.target.files[0];
      
    };
  }


submitAddCaseUser(data) {
  
debugger
  let objEditCase: FormData = new FormData();
  const x = {
    "branchId": data.branch[0].id,

    "childCase": (data.childCase == undefined ? null : (data.childCase.substr(data.childCase.lastIndexOf("/") + 1))),
    "courtCaseId": data.courtCaseId,
    "courtId": data.court[0].id,
    "customerId": data.customerName[0].id,
    "employeeId": data.employee[0].id,
    "filingDate": this.datePipe.transform(data.filingdate, "yyyy-MM-dd"),
    "lastHearingDate": this.datePipe.transform(data.lastHearingDate, "yyyy-MM-dd"),
    "managerId": data.manager[0].id,
    "nextHearingDate": this.datePipe.transform(data.nextHearingDate, "yyyy-MM-dd"),
    "oppLawyer": data.oppLawyer,
    "parentCaseId": (data.parentCase == undefined ? null : (data.parentCase.substr(data.parentCase.lastIndexOf("/") + 1))),
    "recourseId": data.recourse[0].id,
    "remark": data.remark,
    "stageId": data.stage[0].id,
    "stateId": data.state[0].id,
    "userId": parseInt(localStorage.getItem('client_id'))
  };
  objEditCase.append('legalCase', JSON.stringify(x));
  
  objEditCase.append('file', this.myDocument);
  this.authService.submitEditCaseUser(objEditCase).subscribe(
    result => {
debugger
      if (result.body.httpCode == 200) { //success
        // this.BindCaseGridOnEdit(data)
        $.toaster({ priority: 'success', title: 'Success', message: 'Case saved successfully' });
        $(window.location.href = "/admin/case");

        $('#addCaseModal').modal('hide');
        this.closeModal();
      }

    },
    err => {
      console.log(err);
    });

}
BindCaseGridOnEdit(data) {
  // debugger
  // this.finalData = {};
  // finalData.branch.caseId = data.caseId;
  // finalData.branch.childCase = data.childCase;
  //       debugger
  //       finalData.branch.recourseCode=data.recourse[0].id
  //       finalData.branch.customerFirstName=data.customerName[0].id;
  //       finalData.branch.stageName=data.stage[0].id;
  //       finalData.branch.nextHearingDate=data.nextHearingDate;
  //       finalData.branch.empFirstName=data.employee[0].id;


}
closeModal() {
  $("#closebtn1").click();
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



