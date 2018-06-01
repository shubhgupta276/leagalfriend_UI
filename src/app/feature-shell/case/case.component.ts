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
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ActionColumnModel } from '../../shared/models/data-table/action-column.model';
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
  tableInputData = [];
  columns = caseRunningTableConfig;
  @ViewChild('caseRunningTable') runningDataTableComponent: DataTableComponent;
  rowSelect = true;
  hoverTableRow = true;
  showSearchFilter = false;
  actionColumnConfig: ActionColumnModel;
  model: NgbDateStruct;
  date: {year: number, month: number};

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
  @ViewChild(EditCaseComponent) editChild: EditCaseComponent;
  $table: any;
  IsPrintable = false;
  SelectedFileIds = [];
  constructor(private fb: FormBuilder, private authService: AuthService, private _storageService: StorageService) {
    this.caseCompleted = CasesCompleted;
  }

  getRunningCase() {
    var $this = this;
    var reqData = {
      userId: this._storageService.getUserId(),
    };
    this.authService.getCaseRunning(reqData).subscribe(

      result => {
        result.forEach(function (value) {
          $this.caseRunning.push(value);


        });

        setTimeout(() => {
          this.bindDatatable();
        }, 1);
      },
      err => {
        console.log(err);
      });
  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
  getCasesData() {
    const runningCaseModel = {
      userId: this._storageService.getUserId(),
    };
    this.authService.getCaseRunning(runningCaseModel).subscribe(
      result => {
        result.forEach(ele => {
          if (ele.completionDate) {
            this.completedTableInputData.push(ele);
          } else {
            this.tableInputData.push(ele);
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
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.btnText = ['View History'];
    this.actionColumnConfig.moduleName = 'Case';
  }
  ngOnInit() {


    // this.getRunningCase();
    this.setActionConfig();
    this.getCasesData();
    this.getBranchDDL();
    this.bindRecourseDDL();
    this.bindStageDDL();
    // const self = this;
    // this.getBranchDDL();
    // this.bindRecourseDDL();
    // // Running Case DataTable
    // $($.document).ready(function () {
    //   // $(document).on('mouseover', '.rowRunningCase', function () {
    //   //   $(this).find('.divCal').show();
    //   // });
    //   // $(document).on('click', '.rowRunningCase', function () {
    //   //   $('body').find('.divCal').hide();
    //   // });

    //   $('#ddlCaseRecource').change(function () {

    //     if ($('#ddlCaseRecource').val() !== 'All') {
    //       self.bindStageDDL();
    //     }
    //     else {
    //       self.arrListCaseStage = [];
    //     }

    //   });

    //   $('#btnReset').click(function () {


    //     $('#ddlCaseRecource').val('All');
    //     self.$table.columns(3).search('').draw();

    //     $('#ddlCaseStage').val('All');
    //     self.$table.columns(4).search('').draw();

    //     $('#ddlCaseBranch').val('All');

    //     $('#ddlCaseBranch1').val('All');
    //     self.$table.columns(6).search('').draw();

    //     $('#reservation').data('daterangepicker').setStartDate(new Date());
    //     $('#reservation').data('daterangepicker').setEndDate(new Date());

    //     $.fn.dataTableExt.afnFiltering.length = 0;
    //     self.$table.columns(5).search('').draw();
    //   });

    //   $('#btnResetFilter').click(function () {
    //     $('#btnFilter').removeClass('bgColor');

    //     $('#ddlCaseRecource').val('All');
    //     self.$table.columns(3).search('').draw();

    //     $('#ddlCaseStage').val('All');
    //     self.$table.columns(4).search('').draw();

    //     $('#ddlCaseBranch').val('All');
    //     $('#ddlCaseBranch1').val('All');
    //     self.$table.columns(6).search('').draw();

    //     $('#reservation').data('daterangepicker').setStartDate(new Date());
    //     $('#reservation').data('daterangepicker').setEndDate(new Date());

    //     $.fn.dataTableExt.afnFiltering.length = 0;
    //     self.$table.columns(5).search('').draw();
    //   });

    //   $('#reservation').daterangepicker({
    //     autoApply: true,
    //     locale: {
    //       format: 'MM-DD-YYYY'
    //     }

    //   });
    //   // $('#reservation').val('');

    //   //start Branch1 filter
    //   $('#ddlCaseBranch1').on('change', function () {
    //     ;
    //     var status = $(this).val();
    //     if (status == 'All') {
    //       $('#ddlCaseBranch').val('All');
    //       self.$table.columns(6).search('').draw();
    //     }
    //     else if (self.$table.columns(6).search() !== this.value) {
    //       $('#ddlCaseBranch').val($('#ddlCaseBranch1').val());
    //       self.$table.columns(6).search(this.value).draw();
    //     }
    //   });
    //   //end Branch1 filter
    //   $('#btnSearch').click(function () {
    //     $('#btnFilter').addClass('bgColor');
    //     var recourseVal = $('#ddlCaseRecource').val();
    //     var caseStageVal = $('#ddlCaseStage').val();
    //     var caseBranchVal = $('#ddlCaseBranch').val();



    //     // start recourse filter
    //     if (recourseVal == 'All') {
    //       self.$table.columns(3).search('').draw();
    //     }
    //     else if (self.$table.columns(3).search() !== recourseVal) {
    //       self.$table.columns(3).search(recourseVal).draw();
    //     }
    //     //end recourse filter

    //     // start Case stage filter
    //     if (caseStageVal == 'All') {
    //       self.$table.columns(4).search('').draw();
    //     }
    //     else if (self.$table.columns(4).search() !== caseStageVal) {
    //       self.$table.columns(4).search(caseStageVal).draw();
    //     }
    //     //end Case stage filter

    //     // start caseBranchVal filter
    //     if (caseBranchVal == 'All') {
    //       $('#ddlCaseBranch1').val('All');
    //       self.$table.columns(6).search('').draw();
    //     }
    //     else if (self.$table.columns(6).search() !== caseBranchVal) {
    //       $('#ddlCaseBranch1').val(caseBranchVal);
    //       self.$table.columns(6).search(caseBranchVal).draw();
    //     }

    //     $.fn.dataTableExt.afnFiltering.push(
    //       function (oSettings, data, iDataIndex) {

    //         var startDate = new Date($('#reservation').data('daterangepicker').startDate.format('MM-DD-YYYY'));
    //         var endDate = new Date($('#reservation').data('daterangepicker').endDate.format('MM-DD-YYYY'));
    //         var rowDate = new Date(data[5]);

    //         if (rowDate >= startDate && rowDate <= endDate) {
    //           return true;
    //         }
    //         else {
    //           return false;
    //         }

    //       }
    //     );

    //     self.$table.draw();
    //     $('#closebtnFilter').click();

    //   });
    //   setTimeout(() => {


    //   });
    // }, 100)

    // $('body').on('change', '.newHiringDate', function () {
    //   self.updateNewHiringDate($(this).val())
    //   $(this).closest('td')
    //     .animate({ backgroundColor: '#88d288' }, 1000)
    //     .animate({ backgroundColor: '' }, 1000);
    // });
  }

  onRowClick(event) {
    console.log(event);
  }

  onRowDoubleClick(event) {
    console.log(event);
  }

  onRowSelect(event) {
    console.log(event);
  }

  onActionBtnClick(event) {
    console.log('action: ', event);
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

  bindDatatable() {

    var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, 'All']];
    var selectedPageLength = 10;

    this.$table = $('#example1,#example2').DataTable({
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      lengthMenu: arLengthMenu,
      pageLength: selectedPageLength,
      oLanguage: {
        sLengthMenu: 'Show _MENU_ rows',
        sSearch: '',
        sSearchPlaceholder: 'Search...'
      },
      initComplete: function () {
        var tableid = 'example1';
        var $rowSearching = $('#' + tableid + '_wrapper');
        $rowSearching.find('.row:eq(0)').hide();

        for (var i = 0; i < arLengthMenu[0].length; i++) {
          $('#ddlLengthMenu').append('<option value=' + arLengthMenu[0][i] + '>' + arLengthMenu[1][i] + '</option>');
        }
        $('#ddlLengthMenu').val(selectedPageLength);

        $('#ddlLengthMenu').on('change', function () {
          $rowSearching.find('.row:eq(0)').find('select').val($(this).val()).change();
        });
      }
    });

    this.$table.columns().every(function () {


      $('#txtSearch').on('keyup change', function () {

        if (this.$table.search() !== this.value) {
          this.$table.search(this.value).draw();
        }
      });
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
        result.stageRecourses.forEach(function (value) {
          $this.arrListCaseStage.push(value);
        });

      },
      err => {
        console.log(err);
      });
  }

  showEditModal(c) {
    $('#editCaseModal').modal('show');


    var $this = this
    var reqData = {
      caseId: c.id,
    };

    if (c.compliance == false) {
      this.authService.getCaseByCaseId(reqData).subscribe(

        result => {
          $('#caseLi a').click();

          $('#complianceDiv').show();

          $('#compLi').hide();
          this.editChild.createForm(result);

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

  runningTabActive() {
    this.runningCaseTabActive = true;
  }

  completedTabActive() {
    this.runningCaseTabActive = false;
  }

  updateCheckedOptions(items) {
    var flagPrint = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].IsChecked == true) {
        flagPrint = true;
        this.IsPrintable = true;
      }
    }
    if (flagPrint == false) {
      this.IsPrintable = false;
    }
  }

  // getUploadedDocuments() {
  //   this.masterTemplateService.getuploadedFile().subscribe(x => this.lstUploadedDocuments = x);
  // }
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
      var selectedCases = this.caseRunning.filter(function (x) {
        return x.IsChecked == true;
      })
      var selectedCasescompelted = this.caseCompleted.filter(function (x) {
        return x.IsChecked == true;
      });
      selectedCases = selectedCases.concat(selectedCasescompelted);

      for (var j = 0; j < selectedCases.length; j++) {
        let value = localData.Value;
        // value = value.replace('@CourtCaseId', selectedCases[j].courtCaseId.toString());
        // value = value.replace('@CustomerName', ' ' + selectedCases[j].customerFirstName);
        saveAs(new Blob([value], { type: localData.FileType }), localData.FileName);
      }
    }
  }
  ShowCalendar(items) {
    this.newHiringCasedata = items;

  }
  updateNewHiringDate(newHiring) {
    this.caseRunning.forEach(element => {
      if (element.id == this.newHiringCasedata.id) {
        element.nextHearingDate = newHiring;
      }
    })
  }
  OnMouseHover(i) {
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
