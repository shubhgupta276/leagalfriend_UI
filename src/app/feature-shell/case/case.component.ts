import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth-shell/auth-shell.service';
import { StorageService } from '../../shared/services/storage.service';
import { saveAs } from 'file-saver/FileSaver.js';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {
  Case,
  CasesCompleted
} from '../../shared/models/case/case';
import { EditCaseComponent } from './edit-case/edit-case.component';
declare var $;

import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { caseRunningTableConfig, caseCompletedTableConfig } from './case.config';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActionColumnModel } from '../../shared/models/data-table/action-column.model';
import { Subscription } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { setTimeout } from 'timers';
import { CaseHistoryComponent } from './case-history/case-history-component';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master/master.service';
import { AddCaseComponent } from './Add-case/Add-case.component';

const now = new Date();


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
  providers: [AuthService, StorageService, MasterService],
  'styles': [
    '../node_modules/ngx-select-dropdown/dist/assets/style.css'
  ],
})
export class CaseComponent implements OnInit, OnDestroy {
  @ViewChild(EditCaseComponent) editChild: EditCaseComponent;
  @ViewChild(AddCaseComponent) addChild: AddCaseComponent;
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
  @ViewChild(CaseHistoryComponent) historyChild: CaseHistoryComponent;
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
  arRecourse: any[] = [];
  isViewOnly = this._sharedService.isViewOnly();
  recourseConfig: any;
  arCourts: any = [];
  constructor(private fb: FormBuilder, private authService: AuthService, private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService, private _sharedService: SharedService, private _router: Router,
    private masterService: MasterService) {
    this.caseCompleted = CasesCompleted;
  }

  ngOnDestroy() {
    this.branchSubscription.unsubscribe();
  }

  ngOnInit() {

    this.GetAllCourt();
    this.rowSelect = !this.isViewOnly;
    this._activatedRoute.params.subscribe((param) => {
      if (param.caseId) {
        const objData = { id: param.caseId, compliance: false };
        this.showEditPop(objData, true);
      }
    })

    this.getCasesData();
    this.branchSubscription = this._sharedService.getHeaderBranch().subscribe(data => {
      this.branchData = this._storageService.getBranchData();
      setTimeout(() => {
        if (this.branchData) {
          if (!this.isLoad) {
            this.getCasesData();
          }
          this.isLoad = false;
        }
      }, 10);

    });

    this.getRecourse();
    this.setActionConfig();
    this.getBranchDDL();
    this.bindRecourseDDL();
    // this.bindStageDDL();

    $('#reservation').daterangepicker({
      autoUpdateInput: false,
      locale: {
        format: 'DD-MM-YYYY'
      }
    }, function (start_date, end_date) {
      $('#reservation').val(start_date.format('DD-MM-YYYY') + ' To ' + end_date.format('DD-MM-YYYY'));
    });
    const self = this;
    $('body').unbind().on('change', '.newHiringDate', function (event) {
      self.updateNewHiringDate($(this));
    });
  }

  GetAllCourt() {

    const $this = this;
    const reqData = {
      email: this._storageService.getUserEmail(),
    };
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

  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
  getCasesData() {
    if (localStorage.branchData == undefined) {
      b = { id: -1 }

    }
    else {
      var a = localStorage.getItem('branchData');
      var b = JSON.parse(a);
    }

    var $this = this;
    const runningCaseModel = {
      userId: this._storageService.getUserId(),
      branchId: b.id
    };
    this.branchData = this._storageService.getBranchData();

    this.tableInputData = [];
    this.completedTableInputData = [];
    this.authService.getCaseRunning(runningCaseModel).subscribe(
      result => {

        if (localStorage.userRole == 'CLIENT') {
          result.forEach(ele => {

            if (ele.completionDate) {
              this.completedTableInputData.push(ele);
            }
            else {
              this.tableInputData.push(ele);
            }
          });
        }
        else {
          result.forEach(ele => {
            if (ele.branchName == $this.branchData.branchName) {
              if (ele.completionDate) {
                this.completedTableInputData.push(ele);
              } else {
                this.tableInputData.push(ele);
              }
            }
          });
        }
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
  showEditPop(data, isFromOtherPage = false) {
    this._router.navigate(['/admin/case/editcase/' + data.id + '/' + data.compliance]);
  }
  onRowDoubleClick(c) {
    this.showEditPop(c);
  }
  onCaseFilterClick(c) {

    $('#filterCaseModal').modal('show');
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
    if (event.eventType === 'history') {
      $('#modal-default1').modal('show');
      this.historyChild.showHistory(event.data);
    } else {
      this.showEditPop(event.data);
    }
  }
  onActionHistoryBtnClick(event) {
    this.showEditPop(event);
  }
  onRowClickCompleted(event) {
    console.log(event);
  }

  onRowDoubleClickCompleted(event) {
    this.showEditPop(event);
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
    let fromToDate = $('#reservation').val();
    if (fromToDate && fromToDate.length > 0) {
      arDates = fromToDate.split(' To ');
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
    const $this = this;
    const reqData = {
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
  // bindStageDDL() {

  //   var $this = this
  //   var reqData = {
  //     email: this._storageService.getUserEmail(),
  //   };
  //   this.authService.bindStageDDL(reqData).subscribe(
  //     result => {
  //       result.stages.forEach(function (value) {
  //         $this.arrListCaseStage.push(value);
  //       });
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }

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
  getRecourse() {

    this.recourseConfig = {
      displayKey: 'recourseName',
      defaultText: 'All Recourses',
      defaultTextAdd: true,
      showIcon: false,
      hideWhenOneItem: false
    }

    this.authService.getResources().subscribe(
      result => {
        if (result != null) {
          this.arRecourse = result.recourses;
        } else {
          console.log(result);
        }
      },
      err => {
        console.log(err);
        this.arRecourse = [];
      });
  }
  changeRecourse(data: any) {


    if (data == undefined) {
      this.runningDataTableComponent.sortTable((data === undefined || data === null) ? '' : data.recourseCode, 'recourseCode');
    }
    else {
      this.runningDataTableComponent.sortTable(data.recourseCode, 'recourseCode');
    }

  }
  getUploadedDocuments() {
    this.tableInputData = [];
    this.masterService.getDocumentTemplatesList().subscribe(
      result => {
        console.log(result);
        if (result && result.length > 0) {
          this.lstUploadedDocuments = result;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  base64ToBlob(b64Data, contentType, sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  getSelectedDocument(IsChecked, FileId) {
    if (IsChecked.srcElement.checked) {
      this.SelectedFileIds.push(FileId);
    } else {
      this.SelectedFileIds = this.SelectedFileIds.filter(function (i) {
        return i !== FileId;
      });
    }

  }
  getMappingFilesTodownload() {
    for (let i = 0; i < this.SelectedFileIds.length; i++) {
      const data = this.lstUploadedDocuments.find(x => x.id === this.SelectedFileIds[i]);
      const localData = JSON.parse(JSON.stringify(data));
      let selectedCases = this.selectedRowsCheckbox.filter(function (x) {
        return true;
      });
      const selectedCasescompelted = this.caseCompleted.filter(function (x) {
        return x.IsChecked === true;
      });
      selectedCases = selectedCases.concat(selectedCasescompelted);

      for (let j = 0; j < selectedCases.length; j++) {
        let value = atob(localData.document);
        if (selectedCases[j].id) {
          value = value.replace('@CustomRecordId', selectedCases[j].id.toString());
        }
        if (selectedCases[j].parentCaseId) {
          value = value.replace('@ParentCaseId', selectedCases[j].parentCaseId.toString());
        }
        if (selectedCases[j].groundForClosingFile) {
          value = value.replace('@GroundForClosingFile', selectedCases[j].groundForClosingFile.toString());
        }
        if (selectedCases[j].empLastName) {
          value = value.replace('@EmpLastName', selectedCases[j].empLastName.toString());
        }
        if (selectedCases[j].customerLastName) {
          value = value.replace('@CustomerLastName', selectedCases[j].customerLastName.toString());
        }
        if (selectedCases[j].compliance.toString()) {
          value = value.replace('@Compliance', selectedCases[j].compliance.toString());
        }
        if (selectedCases[j].completionDate) {
          value = value.replace('@CompletionDate', selectedCases[j].completionDate.toString());
        }
        if (selectedCases[j].empFirstName) {
          value = value.replace('@EmpFirstName', selectedCases[j].empFirstName.toString());
        }
        if (selectedCases[j].branchName) {
          value = value.replace('@BranchName', selectedCases[j].branchName.toString());
        }
        if (selectedCases[j].nextHearingDate) {
          value = value.replace('@NextHearingDate', selectedCases[j].nextHearingDate.toString());
        }
        if (selectedCases[j].stageName) {
          value = value.replace('@StageName', selectedCases[j].stageName.toString());
        }
        if (selectedCases[j].caseId) {
          value = value.replace('@CaseId', selectedCases[j].caseId.toString());
        }
        if (selectedCases[j].courtCaseId) {
          value  = value.replace('@CourtCaseId', selectedCases[j].courtCaseId.toString());
        }
        if (selectedCases[j].customerFirstName) {
          value = value.replace('@CustomerName', selectedCases[j].customerFirstName.toString());
        }
        if (selectedCases[j].recourseCode) {
          value = value.replace('@RecourseCode', selectedCases[j].recourseCode.toString());
        }
        saveAs(new Blob([value], { type: 'application/rtf' }), localData.description);
      }
    }
    $('#lstUploadedDocument').modal('hide');
    this.runningDataTableComponent.selection.clear();
    this.SelectedFileIds = [];
  }

  onShowCalendar(items) {
    this.newHiringCasedata = items;

  }
  updateNewHiringDate(ref) {
    try {
      const newHiring = $(ref).val();
      this.newHiringCasedata.nextHearingDate = newHiring;
      this.caseRunning.forEach(data => {
        if (data.id === this.newHiringCasedata.id) {
          data.nextHearingDate = newHiring;
          return false;
        }
      });
      this.authService.updateCaseHearingDate(this.newHiringCasedata).subscribe(
        result => {
          $(ref).closest('mat-cell').animate({ backgroundColor: '#88d288' }, 100).animate({ backgroundColor: '' }, 1500);
          $.toaster({ priority: 'success', title: 'Success', message: 'Date Update Successfully.' });
        },
        err => {
          console.log(err);
        });
    } catch (err) {

    }

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

  caseSaved() {
    this.getCasesData();
  }

  resetGrid() {
    this.getCasesData();
  }

  addCase() {
    this._router.navigate(['/admin/case/addcase']);
  }
}
