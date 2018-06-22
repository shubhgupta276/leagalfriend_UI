import { Component, OnInit, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { AuthService } from '../../auth-shell/auth-shell.service';
import { Branch } from '../../shared/models/auth/case.model';
import { StorageService } from '../../shared/services/storage.service';
import { saveAs } from 'file-saver/FileSaver.js';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  Case,
  CasesRunning,
  CasesCompleted
} from '../../shared/models/case/case';
import { forEach } from '@angular/router/src/utils/collection';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { Compliance } from '../master/compliance/compliance';
import { debounce } from 'rxjs/operators/debounce';
// import { ALPN_ENABLED } from "constants";
declare var $;

import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { caseRunningTableConfig, caseCompletedTableConfig } from './case.config';
import { element } from 'protractor';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActionColumnModel } from '../../shared/models/data-table/action-column.model';
import { Subscription } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { MasterTemplatesComponent } from '../master/masterTemplates/masterTemplate.component';
import { MasterTemplateService } from '../master/masterTemplates/masterTemplate.component.service';
const now = new Date();


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
  providers: [AuthService, StorageService],
  'styles': [
    '../node_modules/ngx-select-dropdown/dist/assets/style.css'
  ],
})
export class CaseComponent implements OnInit {
  @ViewChild(EditCaseComponent) editChild: EditCaseComponent;
  tableInputData = [];
  columns = caseRunningTableConfig;
  @ViewChild('caseRunningTable') runningDataTableComponent: DataTableComponent;
  rowSelect = true;
  hoverTableRow = true;
  showSearchFilter = false;
  moduleName = 'Case';
  actionColumnConfig: ActionColumnModel;
  model: NgbDateStruct;
  date: { year: number, month: number };
  selectedRowsCheckbox: any;
  completedTableInputData = [];
  completedColumns = caseCompletedTableConfig;
  @ViewChild('caseCompletedTable') completedDataTableComponent: DataTableComponent;

  runningCaseTabActive: boolean = true;

  lstUploadedDocuments: any;
  caseRunning: any[] = [];
  caseCompleted: Case[];
  editCaseForm: FormGroup;
  arrListCaseRecource: any[] = [];
  arrListCaseStage: any[] = [];
  arrListCaseBranch: any[] = [];
  arrListCaseBranch1: any[] = [];
  hoveredIndex: number = null;
  isCalendarOpen = false;
  newHiringCasedata: any;
  $table: any;
  IsPrintable = false;
  SelectedFileIds = [];
  branchSubscription: Subscription;
  branchData: any;
  isLoad = true;
  constructor(private masterTemplateService: MasterTemplateService, private fb: FormBuilder, private authService: AuthService, private _storageService: StorageService, private _sharedService: SharedService) {
    this.caseCompleted = CasesCompleted;
  }

  ngOnInit() {
    debugger
    this.getCasesData();
    this.branchSubscription = this._sharedService.getHeaderBranch().subscribe(data => {
      this.branchData = this._storageService.getBranchData();
      if (this.branchData) {
        if (this.isLoad) {
          //alert(this.isLoad)
          this.getCasesData();
        }
      }
    });
    // this.getRunningCase();
    this.setActionConfig();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.bindStageDDL();

    $('#reservation').daterangepicker({
      autoUpdateInput: false,
      locale: {
        format: 'DD-MM-YYYY'
      }
    }, function (start_date, end_date) {
      $('#reservation').val(start_date.format('DD-MM-YYYY') + ' To ' + end_date.format('DD-MM-YYYY'));
    });
    var self = this;
    $('body').on('change', '.newHiringDate', function () {
      self.updateNewHiringDate($(this).val())
      $(this).closest('mat-cell')
        .animate({ backgroundColor: '#88d288' }, 1000)
        .animate({ backgroundColor: '' }, 2000);
    });

  }

  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
  getCasesData() {
    
    this.isLoad = false;
    
    var $this = this;
    const runningCaseModel = {
      userId: this._storageService.getUserId(),
    };
    this.branchData = this._storageService.getBranchData();
    debugger
    this.tableInputData = [];
    this.completedTableInputData = [];
    this.authService.getCaseRunning(runningCaseModel).subscribe(
      result => {
        debugger
        result.forEach(ele => {
          if (ele.branchName == $this.branchData.branchName) {
            if (ele.completionDate) {
              this.completedTableInputData.push(ele);
            } else {
              this.tableInputData.push(ele);
            }
          }
        });

        this.runningDataTableComponent.ngOnInit();
        this.completedDataTableComponent.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.showHistory = true;
    this.actionColumnConfig.showEdit = true;
    this.actionColumnConfig.displayName = 'Action';
  }

  onRowClick(event) {
    console.log(event);
  }
  showEditPop(c) {
    $('#editCaseModal').modal('show');
    var $this = this
    var reqData = {
      caseId: c.id,
    };

    if (c.compliance == false) {
      this.authService.getCaseByCaseId(reqData).subscribe(

        result => {
          
          $this.editChild.createForm(result);
          $('#caseLi a').click();

          $('#complianceDiv').show();

          $('#compLi').hide();

        },
        err => {
          console.log(err);
        });
    }
    else {

      this.authService.getCaseCompliance(reqData).subscribe(

        result => {

          $('#compLi a').click();

          $('#form1 input,textarea').attr('readonly', 'readonly');
          // $('#divRecourse').attr('disabled','disabled');


          $('#complianceDiv').hide();
          $('#compLi').show();
          this.editChild.createFormforcompliance(result);

        },
        err => {
          console.log(err);
        });
    }
  }
  onRowDoubleClick(c) {
    this.showEditPop(c);
  }
  onCaseFilterClick(c)
  {
    debugger
    $('#filterCaseModal').modal("show");
  }

  onRowSelect(event) {
    var flagPrint = false;
    this.selectedRowsCheckbox = event;
    if (this.selectedRowsCheckbox.length > 0) {
      flagPrint = true;
      this.IsPrintable = true;
    }
    if (flagPrint == false) {
      this.IsPrintable = false;
    }
  }

  onActionBtnClick(event) {
    if (event.eventType === "history")
      $('#modal-default1').modal('show');
    else
      this.showEditPop(event.data);
  }
  onActionHistoryBtnClick(event) {
    this.showEditPop(event);
  }
  onRowClickCompleted(event) {
    console.log(event);
  }

  onRowDoubleClickCompleted(event) {
    console.log(event);
  }

  onRowSelectCompleted(event) {
    console.log(event);
  }

  onActionBtnClickCompleted(event) {
    console.log('action: ', event);
  }

  filterTable(data) {
    this.runningDataTableComponent.sortTable('SBI', 'branchName');
    this.runningDataTableComponent.sortTable('WINDING_UP', 'recourseCode');
    this.runningDataTableComponent.dateRangeFilter('2018-05-28', '2018-5-30', 'nextHearingDate');
  }

  resetTableFilter() {
    this.runningDataTableComponent.resetFilters();
  }

  searchFilterRunning(value) {
    this.runningDataTableComponent.applyFilter(value);
  }

  filterTableCompleted(data) {
    this.completedDataTableComponent.sortTable('SBI', 'branchName');
    this.completedDataTableComponent.sortTable('WINDING_UP', 'recourseCode');
    this.completedDataTableComponent.dateRangeFilter('2018-05-28', '2018-5-30', 'nextHearingDate');
  }

  resetTableFilterCompleted() {
    this.completedDataTableComponent.resetFilters();
  }

  searchFilterCompleted(value) {
    this.completedDataTableComponent.applyFilter(value);
  }
  formatDate(date) {

    var arDate = date.split('-');
    var dd = arDate[0];
    var mm = arDate[1];
    var yy = arDate[2];
    return (yy + '-' + mm + '-' + dd);
  }
  filterCaseData() {
    var arDates;
    let fromToDate = $("#reservation").val();
    if (fromToDate && fromToDate.length > 0) {
      arDates = fromToDate.split(" To ");
      arDates[0] = this.formatDate(arDates[0]);
      arDates[1] = this.formatDate(arDates[1]);
    }

    this.runningDataTableComponent.sortTable($('#ddlCaseRecource').val(), 'recourseCode');
    this.runningDataTableComponent.sortTable($('#ddlCaseStage').val(), 'stageName');
    if (fromToDate.length > 0) {
      this.runningDataTableComponent.dateRangeFilter(arDates[0], arDates[1], 'nextHearingDate');
    }
    else {
      this.runningDataTableComponent.resetDateFilter();
    }

    $('#filterCaseModal').modal('hide');

  }


  getBranchDDL() {
    var $this = this
    var reqData = {
      email: this._storageService.getUserEmail(),
    };
    this.authService.getBranchDDL(reqData).subscribe(

      result => {
        result.branches.forEach(function (value) {

          $this.arrListCaseBranch1.push(value);
          $this.arrListCaseBranch.push(value);
        });

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
          $this.arrListCaseRecource.push(value);
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
        result.stages.forEach(function (value) {
          $this.arrListCaseStage.push(value);
        });
      },
      err => {
        console.log(err);
      });
  }

  runningTabActive() {
    this.runningCaseTabActive = true;
  }

  completedTabActive() {
    this.runningCaseTabActive = false;
  }

  // updateCheckedOptions(items) {
  //   var flagPrint = false;
  //   for (var i = 0; i < items.length; i++) {
  //     if (items[i].IsChecked == true) {
  //       flagPrint = true;
  //       this.IsPrintable = true;
  //     }
  //   }
  //   if (flagPrint == false) {
  //     this.IsPrintable = false;
  //   }
  // }

  getUploadedDocuments() {
    this.masterTemplateService.getuploadedFile().subscribe(x => this.lstUploadedDocuments = x);
  }
  getSelectedDocument(IsChecked, FileId) {
    if (IsChecked.srcElement.checked) {
      this.SelectedFileIds.push(FileId);
    }
    else {
      this.SelectedFileIds = this.SelectedFileIds.filter(function (i) {
        return i != FileId;
      });
    }

  }
  getMappingFilesTodownload() {
    for (var i = 0; i < this.SelectedFileIds.length; i++) {
      var data = this.lstUploadedDocuments.find(x => x.Id === this.SelectedFileIds[i]);
      const localData = JSON.parse(JSON.stringify(data))
      var selectedCases = this.selectedRowsCheckbox.filter(function (x) {
        return true;
      })
      var selectedCasescompelted = this.caseCompleted.filter(function (x) {
        return x.IsChecked == true;
      });
      selectedCases = selectedCases.concat(selectedCasescompelted);

      for (var j = 0; j < selectedCases.length; j++) {
        let value = localData.Value;
        value = value.replace('@CourtCaseId', selectedCases[j].courtCaseId.toString());
        value = value.replace('@CustomerName', + selectedCases[j].customerFirstName);
        saveAs(new Blob([value], { type: localData.FileType }), localData.FileName);
      }
    }
  }

  onShowCalendar(items) {
    this.newHiringCasedata = items;

  }
  updateNewHiringDate(newHiring) {
    this.newHiringCasedata.nextHearingDate = newHiring;
    this.caseRunning.forEach(element => {
      if (element.id == this.newHiringCasedata.id) {
        element.nextHearingDate = newHiring;
        return false;
      }
    })
    this.authService.updateCaseHearingDate(this.newHiringCasedata).subscribe(
      result => {
      },
      err => {
        console.log(err);
      });

  }
  onMouseHover(i) {
    if ($('.datepicker-dropdown').length == 0) {
      $('.newHiringDate').datepicker();
      this.hoveredIndex = i;
    }
  }

  hideCalendar() {
    if ($('.datepicker-dropdown').length == 0)
      this.hoveredIndex = null;

  }

}
