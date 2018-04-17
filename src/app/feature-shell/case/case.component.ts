import { Component, OnInit } from "@angular/core";
import { debuglog } from "util";
import { AuthService } from '../../auth-shell/auth-shell.service';
import { Branch } from '../../shared/models/auth/case.model';
import { StorageService } from '../../shared/services/storage.service';
import { saveAs } from 'file-saver/FileSaver.js';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import {
  Case,
  CasesRunning,
  CasesCompleted
} from "../../shared/models/case/case";
import { forEach } from "@angular/router/src/utils/collection";
import { MasterTemplateComponentService } from "../master/masterTemplates/masterTemplate.component.service";
// import { ALPN_ENABLED } from "constants";
declare var $;

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.css"],
  providers: [AuthService, StorageService],
  "styles": [
    "../node_modules/ngx-select-dropdown/dist/assets/style.css"
  ],
})
export class CaseComponent implements OnInit {
  lstUploadedDocuments: any;
  caseRunning = [];
  caseCompleted = []; f
  editCaseForm: FormGroup;
  arrListCaseRecource: any[] = [];
  arrListCaseStage: any[] = [];
  arrListCaseBranch: any[] = [];
  arrListCaseBranch1: any[] = [];
  $table: any;
  constructor(private fb: FormBuilder, private authService: AuthService, private _storageService: StorageService, private masterTemplateService: MasterTemplateComponentService) {
    this.caseRunning = CasesRunning;
    this.caseCompleted = CasesCompleted;
    //this.setDropdownUniqueValues();
    this.initCaseForm();
    this.updateCheckedOptions(this.caseRunning);
    if (!this.IsPrintable) {
      this.updateCheckedOptions(this.caseCompleted);
    }
  }

  getRunningCase() {

    var $this = this
    var reqData = {
      userId: this._storageService.getUserId(),
    };
    this.authService.getCaseRunning(reqData).subscribe(

      result => {

        result.forEach(function (value) {

          $this.caseRunning.push(value);


        });
        console.log(result);
        setTimeout(() => {
          this.bindDatatable();
        }, 1);
      },
      err => {
        console.log(err);
      });
  }


  ngOnInit() {
    this.getRunningCase();
    const self = this;
    this.getBranchDDL();
    this.bindRecourseDDL();
    // Running Case DataTable
    $($.document).ready(function () {

      $("#ddlCaseRecource").change(function () {

        if ($("#ddlCaseRecource").val() !== "All") {
          self.bindStageDDL();
        }
        else {
          self.arrListCaseStage = [];
        }

      });

      $('#btnReset').click(function () {


        $('#ddlCaseRecource').val("All");
        self.$table.columns(3).search("").draw();

        $('#ddlCaseStage').val("All");
        self.$table.columns(4).search("").draw();

        $('#ddlCaseBranch').val("All");

        $('#ddlCaseBranch1').val("All");
        self.$table.columns(6).search("").draw();
        // $('#reservation').val('');
        // $('#reservation').data('daterangepicker').setStartDate(new Date('01/01/1999'));
        // $('#reservation').data('daterangepicker').setEndDate(new Date('01/01/2099'));
        $('#reservation').data('daterangepicker').setStartDate(new Date());
        $('#reservation').data('daterangepicker').setEndDate(new Date());

        $.fn.dataTableExt.afnFiltering.length = 0;
        self.$table.columns(5).search("").draw();
      });
      //Button Reset FrontEnd
      $('#btnResetFilter').click(function () {
        $('#btnFilter').removeClass("bgColor");

        $('#ddlCaseRecource').val("All");
        self.$table.columns(3).search("").draw();

        $('#ddlCaseStage').val("All");
        self.$table.columns(4).search("").draw();

        $('#ddlCaseBranch').val("All");
        $('#ddlCaseBranch1').val("All");
        self.$table.columns(6).search("").draw();
        // $('#reservation').val('');
        // $('#reservation').data('daterangepicker').setStartDate(new Date('01/01/1999'));
        // $('#reservation').data('daterangepicker').setEndDate(new Date('01/01/2099'));
        $('#reservation').data('daterangepicker').setStartDate(new Date());
        $('#reservation').data('daterangepicker').setEndDate(new Date());

        $.fn.dataTableExt.afnFiltering.length = 0;
        self.$table.columns(5).search("").draw();
      });

      $('#reservation').daterangepicker({
        autoApply: true,
        locale: {
          format: 'MM-DD-YYYY'
        }
        // startDate:new Date('01/01/1999'),
        // endDate:new Date('01/01/2099')
      });
      // $('#reservation').val('');

      //start Branch1 filter
      $("#ddlCaseBranch1").on("change", function () {
        ;
        var status = $(this).val();
        if (status == "All") {
          $('#ddlCaseBranch').val("All");
          self.$table.columns(6).search("").draw();
        }
        else if (self.$table.columns(6).search() !== this.value) {
          $('#ddlCaseBranch').val($("#ddlCaseBranch1").val());
          self.$table.columns(6).search(this.value).draw();
        }
      });
      //end Branch1 filter
      $('#btnSearch').click(function () {
        $('#btnFilter').addClass("bgColor");
        var recourseVal = $('#ddlCaseRecource').val();
        var caseStageVal = $('#ddlCaseStage').val();
        var caseBranchVal = $('#ddlCaseBranch').val();



        // start recourse filter
        if (recourseVal == "All") {
          self.$table.columns(3).search("").draw();
        }
        else if (self.$table.columns(3).search() !== recourseVal) {
          self.$table.columns(3).search(recourseVal).draw();
        }
        //end recourse filter

        // start Case stage filter
        if (caseStageVal == "All") {
          self.$table.columns(4).search("").draw();
        }
        else if (self.$table.columns(4).search() !== caseStageVal) {
          self.$table.columns(4).search(caseStageVal).draw();
        }
        //end Case stage filter

        // start caseBranchVal filter
        if (caseBranchVal == "All") {
          $('#ddlCaseBranch1').val("All");
          self.$table.columns(6).search("").draw();
        }
        else if (self.$table.columns(6).search() !== caseBranchVal) {
          $('#ddlCaseBranch1').val(caseBranchVal);
          self.$table.columns(6).search(caseBranchVal).draw();
        }

        $.fn.dataTableExt.afnFiltering.push(
          function (oSettings, data, iDataIndex) {
            debugger
            var startDate = new Date($('#reservation').data('daterangepicker').startDate.format('MM-DD-YYYY'));
            var endDate = new Date($('#reservation').data('daterangepicker').endDate.format('MM-DD-YYYY'));
            var rowDate = new Date(data[5]);

            if (rowDate >= startDate && rowDate <= endDate) {
              return true;
            }
            else {
              return false;
            }

          }
        );

        self.$table.draw();
        $("#closebtnFilter").click();

      });
      setTimeout(() => {

        // var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
        // var selectedPageLength = 15;
        // self.$table = $("#example1").DataTable({
        //   lengthMenu: arLengthMenu,
        //   pageLength: selectedPageLength,
        //   oLanguage: {
        //     sLengthMenu: "Show _MENU_ rows",
        //     sSearch: "",
        //     sSearchPlaceholder: "Search..."
        //   },
        //   initComplete: function () {
        //     var tableid = "example1";
        //     var $rowSearching = $("#" + tableid + "_wrapper");
        //     $rowSearching.find(".row:eq(0)").hide();

        //     for (var i = 0; i < arLengthMenu[0].length; i++) {

        //       var selectText =
        //         arLengthMenu[0][i] == selectedPageLength ? "selected" : "";
        //       $("#ddlLengthMenu").append(
        //         "<option " +
        //         selectText +
        //         " value=" +
        //         arLengthMenu[0][i] +
        //         ">" +
        //         arLengthMenu[1][i] +
        //         "</option>"
        //       );
        //     }

        //     $("#ddlLengthMenu").on("change", function () {
        //       $rowSearching
        //         .find(".row:eq(0)")
        //         .find("select")
        //         .val($(this).val())
        //         .change();
        //     });
        //   }
        // });
        // self.$table.columns().every(function () {
        //   $("#txtSearch").on("keyup change", function () {
        //     if (self.$table.search() !== this.value) {
        //       self.$table.search(this.value).draw();
        //     }
        //   });
        // });
      });
    }, 1000)

    // Completed Case DataTable
    $($.document).ready(function () {
      var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
      var selectedPageLength = 15;

      const $table = $("#example2").DataTable({
        lengthMenu: arLengthMenu,
        pageLength: selectedPageLength,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        },
        initComplete: function () {
          var tableid = "example2";
          var $rowSearching = $("#" + tableid + "_wrapper");
          $rowSearching.find(".row:eq(0)").hide();

          for (var i = 0; i < arLengthMenu[0].length; i++) {
            $("#ddlLengthMenu2").append(
              "<option value=" +
              arLengthMenu[0][i] +
              ">" +
              arLengthMenu[1][i] +
              "</option>"
            );
          }
          $("#ddlLengthMenu2").val(selectedPageLength);

          $("#ddlLengthMenu2").on("change", function () {
            $rowSearching
              .find(".row:eq(0)")
              .find("select")
              .val($(this).val())
              .change();
          });
        }
      });
      $table.columns().every(function () {
        $("#txtSearch2").on("keyup change", function () {
          if ($table.search() !== this.value) {
            $table.search(this.value).draw();
          }
        });
      });
    });



  }



  bindDatatable() {

    var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
    var selectedPageLength = 15;

    this.$table = $("#example1").DataTable({
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      lengthMenu: arLengthMenu,
      pageLength: selectedPageLength,
      oLanguage: {
        sLengthMenu: "Show _MENU_ rows",
        sSearch: "",
        sSearchPlaceholder: "Search..."
      },
      initComplete: function () {
        var tableid = "example1";
        var $rowSearching = $("#" + tableid + "_wrapper");
        $rowSearching.find(".row:eq(0)").hide();

        for (var i = 0; i < arLengthMenu[0].length; i++) {
          $("#ddlLengthMenu").append("<option value=" + arLengthMenu[0][i] + ">" + arLengthMenu[1][i] + "</option>");
        }
        $("#ddlLengthMenu").val(selectedPageLength);

        $("#ddlLengthMenu").on("change", function () {
          $rowSearching.find(".row:eq(0)").find("select").val($(this).val()).change();
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
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }

  initCaseForm() {
    this.createForm(null);
  }

  createForm(c) {

    this.editCaseForm = this.fb.group({

      // Compliance: [c == null ? null : c.Compliance],
      caseId: [c == null ? null : c.id, Validators.required],

      courtCaseId: [c == null ? null : c.courtCaseId],
      recourse: [c == null ? null : c.recourseId],
      manager: [c == null ? null : c.managerId],
      court: [c == null ? null : c.courtId],
      state: [c == null ? null : c.stateId],
      parentCase: [c == null ? null : c.parentCaseId],
      nextHearingDate: [c == null ? null : c.nextHearingDate],
      customerName: [c == null ? null : c.customerId],
      remark: [c == null ? null : c.remark, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [c == null ? null : c.branchId],
      filingdate: [c == null ? null : c.filingdate],
      stage: [c == null ? null : c.stageId],
      employee: [c == null ? null : c.employeeId],
      courtplace: [c == null ? null : c.courtId],
      oppLawyer: [c == null ? null : c.oppLawyer],
      childCase: [c == null ? null : c.childCase],
      lastHearingDate: [c == null ? null : c.lastHearingDate],
      uploadDocument: [],
      completionDate: [c == null ? null : c.completionDate]
    });
  }

  showEditModal(c) {

    var $this = this
    var reqData = {
      caseId: c.id,
    };
    this.authService.getCaseByCaseId(reqData).subscribe(

      result => {

        this.createForm(result);
        $("#editCaseModal").modal("show");
        console.log(result);
      },
      err => {
        console.log(err);
      });

  }

  runningTools() {
    document.getElementById("pageLength1").style.display = "block";
    document.getElementById("pageLength2").style.display = "none";
    document.getElementById("searchBox1").style.display = "block";
    document.getElementById("searchBox2").style.display = "none";
  }

  completedTools() {
    document.getElementById("pageLength2").style.display = "block";
    document.getElementById("pageLength1").style.display = "none";
    document.getElementById("searchBox2").style.display = "block";
    document.getElementById("searchBox1").style.display = "none";
  }


  IsPrintable = false;
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

  getUploadedDocuments() {
    this.masterTemplateService.getuploadedFile().subscribe(x => this.lstUploadedDocuments = x);
  }
  SelectedFileIds = [];
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
        value = value.replace('@CourtCaseId', selectedCases[j].courtCaseId.toString());
        value = value.replace('@CustomerName', ' ' + selectedCases[j].customerFirstName);
        saveAs(new Blob([value], { type: localData.FileType }), localData.FileName);
      }
    }
  }
}
