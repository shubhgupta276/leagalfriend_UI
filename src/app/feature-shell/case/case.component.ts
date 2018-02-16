import { Component, OnInit } from "@angular/core";
import { debuglog } from "util";
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
declare var $;

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.css"]
})
export class CaseComponent implements OnInit {
  caseRunning: Case[];
  caseCompleted: Case[];
  editCaseForm: FormGroup;
  arrListCaseRecource: any[] = [];
  arrListCaseStage: any[] = [];
  arrListCaseBranch: any[] = [];

  constructor(private fb: FormBuilder) {
    this.caseRunning = CasesRunning
    this.caseCompleted = CasesCompleted;
    this.setDropdownUniqueValues();
    this.initCaseForm();
  }

  ngOnInit() {
    const self = this;
    // Running Case DataTable
    $($.document).ready(function () {

      $('#btnReset').click(function () {
        $('#ddlCaseRecource').val("All");
        $table.columns(3).search("").draw();

        $('#ddlCaseStage').val("All");
        $table.columns(4).search("").draw();

        $('#ddlCaseBranch').val("All");
        $table.columns(6).search("").draw();
        $('#txtstartDate').val("");
        $('#txtEndDate').val("");
        $table.draw();
      });

      $('#btnSearch').click(function () {
        debugger;
        var recourseVal = $('#ddlCaseRecource').val();
        var caseStageVal = $('#ddlCaseStage').val();
        var caseBranchVal = $('#ddlCaseBranch').val();
        var startDate = $('#txtstartDate').val();
        var endDate = $('#txtEndDate').val();

        // start recourse filter
        if (recourseVal == "All") {
          $table.columns(3).search("").draw();
        }
        else if ($table.columns(3).search() !== recourseVal) {
          $table.columns(3).search(recourseVal).draw();
        }
        //end recourse filter

        // start Case stage filter
        if (caseStageVal == "All") {
          $table.columns(4).search("").draw();
        }
        else if ($table.columns(4).search() !== caseStageVal) {
          $table.columns(4).search(caseStageVal).draw();
        }
        //end Case stage filter

        // start caseBranchVal filter
        if (caseBranchVal == "All") {
          $table.columns(6).search("").draw();
        }
        else if ($table.columns(6).search() !== caseBranchVal) {
          $table.columns(6).search(caseBranchVal).draw();
        }
        //end caseBranchVal filter
        //filter by date 

        if (startDate != "" && endDate != "") {
          //alert(startDate);
          //self.filterByDate(5, startDate, endDate);
          $table.draw();


        }
        $("#closebtnFilter").click();

      });
      var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
      var selectedPageLength = 15;
      const $table = $("#example1").DataTable({
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
            var selectText =
              arLengthMenu[0][i] == selectedPageLength ? "selected" : "";
            $("#ddlLengthMenu").append(
              "<option " +
              selectText +
              " value=" +
              arLengthMenu[0][i] +
              ">" +
              arLengthMenu[1][i] +
              "</option>"
            );
          }

          $("#ddlLengthMenu").on("change", function () {
            $rowSearching
              .find(".row:eq(0)")
              .find("select")
              .val($(this).val())
              .change();
          });
        }
      });
      $table.columns().every(function () {
        $("#txtSearch").on("keyup change", function () {
          if ($table.search() !== this.value) {
            $table.search(this.value).draw();
          }
        });
      });
    });

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

    $.fn.dataTableExt.afnFiltering.push(
      function (oSettings, data, iDataIndex) {
        //var rowDate = this.caseRunning.nextHearingDate;
        var sDate = $('#txtstartDate').val();
        var eDate = $('#txtEndDate').val();
        if (sDate != "" && eDate != "") {
          var startDate = new Date($('#txtstartDate').val());
          var endDate = new Date($('#txtEndDate').val());
          var rowDate = new Date(data[5]);

          if (rowDate >= startDate && rowDate <= endDate) {
            return true;
          }
          return false;

        }
        return true;
      }
    );
  }
  setDropdownUniqueValues() {

    for (var i = 0; i < this.caseRunning.length; i++) {
      var obj = this.caseRunning[i];
      if ($.inArray(obj.Resource.name, this.arrListCaseRecource) < 0) {
        this.arrListCaseRecource.push(obj.Resource.name);
      }
      if ($.inArray(obj.CaseStage.name, this.arrListCaseStage) < 0) {
        this.arrListCaseStage.push(obj.CaseStage.name);
      }
      if ($.inArray(obj.Branch.name, this.arrListCaseBranch) < 0) {
        this.arrListCaseBranch.push(obj.Branch.name);
      }
    }

  }

  //Filter by date ends
  initCaseForm() {
    this.createForm(null);
  }

  createForm(c: Case) {
    this.editCaseForm = this.fb.group({
      compliance: [c == null ? null : c.Compliance],
      caseId: [c == null ? null : c.CaseId, Validators.required],
      courtCaseId: [c == null ? null : c.CourtCaseId],
      recourse: [c == null ? null : c.Resource.id],
      manager: [c == null ? null : c.Manager.id],
      court: [c == null ? null : c.Court.id],
      state: [c == null ? null : c.State.id],
      parentCase: [c == null ? null : c.ParentCase],
      nextHearingDate: [c == null ? null : c.NextHearingDate],
      customerName: [c == null ? null : c.CustomerName.id],
      remark: [c == null ? null : c.Remark, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [c == null ? null : c.Branch.id],
      filingdate: [c == null ? null : c.FillingDate],
      stage: [c == null ? null : c.CaseStage.id],
      employee: [c == null ? null : c.Employee.id],
      courtplace: [c == null ? null : c.CourtePlace.id],
      oppLawyer: [c == null ? null : c.OppLawyer],
      childCase: [c == null ? null : c.ChaildCase],
      lastHearingDate: [c == null ? null : c.LastHearingDate],
      uploadDocument: [],
      completionDate: [c == null ? null : c.CompletionDate]
    });
  }

  showEditModal(c) {
    this.createForm(c);
    $("#editCaseModal").modal("show");
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
}
