import { Component, OnInit } from "@angular/core";
import { debuglog } from "util";
declare var $;

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.css"]
})
export class CaseComponent implements OnInit {
  jsonRunning: any;
  jsonCompleted: any;
  constructor() {
    this.jsonRunning = [
      {
        Id: 1,
        CaseId: "I/DRT/3",
        CourtCaseID: "",
        CustomerName: "Anup",
        RecourceType: "DRT",
        CaseStage: "FOR VALUATION OF ASSET",
        NextHearingDate: "22-Dec-2017",
        Branch: "Delhi",
        Employee: "Anup"
      },
      {
        Id: 2,
        CaseId: "I/LKAD/4",
        CourtCaseID: "",
        CustomerName: "Puneet",
        RecourceType: "LOK_ADALATH",
        CaseStage: "FOR SALE PERMISSION OF VEHICLE",
        NextHearingDate: "17-Jan-2018	",
        Branch: "Delhi",
        Employee: "Puneet"
      },
      {
        Id: 3,
        CaseId: "I/LKAD/5",
        CourtCaseID: "",
        CustomerName: "Vipin",
        RecourceType: "LOK_ADALATH",
        CaseStage: "FOR SALE PERMISSION OF VEHICLE",
        NextHearingDate: "17-Jan-2018	",
        Branch: "Delhi",
        Employee: "Vipin"
      },
      {
        Id: 4,
        CaseId: "I/LKAD/6",
        CourtCaseID: "",
        CustomerName: "Anil",
        RecourceType: "LOK_ADALATH",
        CaseStage: "FOR SALE PERMISSION OF VEHICLE",
        NextHearingDate: "17-Jan-2018	",
        Branch: "Delhi",
        Employee: "Anil"
      },
      {
        Id: 5,
        CaseId: "I/LKAD/7",
        CourtCaseID: "",
        CustomerName: "Sourav",
        RecourceType: "LOK_ADALATH",
        CaseStage: "FOR SALE PERMISSION OF VEHICLE",
        NextHearingDate: "17-Jan-2018	",
        Branch: "Delhi",
        Employee: "Sourav"
      }
    ];
    this.jsonCompleted = [
      {
        Id: 1,
        CaseId: "I/DRT/3",
        CourtCaseID: "",
        FillingDate: "2018-01-18",
        CompletionDate: "2018-01-19",
        Branch: "Delhi",
        Court: "",
        Manager: "Anup"
      },
      {
        Id: 2,
        CaseId: "I/LKAD/4",
        CourtCaseID: "",
        FillingDate: "2018-01-19",
        CompletionDate: "2018-01-19",
        Branch: "Mumbai",
        Court: "",
        Manager: "Puneet"
      },
      {
        Id: 3,
        CaseId: "I/LKAD/5",
        CourtCaseID: "",
        FillingDate: "2018-01-21",
        CompletionDate: "2018-01-21",
        Branch: "Banglore",
        Court: "",
        Manager: "Vipin"
      },
      {
        Id: 4,
        CaseId: "I/LKAD/6",
        CourtCaseID: "",
        FillingDate: "2018-01-20",
        CompletionDate: "2018-01-20",
        Branch: "Delhi",
        Court: "",
        Manager: "Anil"
      },
      {
        Id: 5,
        CaseId: "I/LKAD/7",
        CourtCaseID: "",
        FillingDate: "2018-01-24",
        CompletionDate: "2018-01-25",
        Branch: "Delhi",
        Court: "",
        Manager: "Sourav"
      }
    ];
  }

  showEditModal() {
    $("#editCaseModal").modal("show");
  }

  ngOnInit() {
    $($.document).ready(function() {
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
        initComplete: function() {
          var tableid = "example1";
          var $rowSearching = $("#" + tableid + "_wrapper");
          $rowSearching.find(".row:eq(0)").hide();

          for (var i = 0; i < arLengthMenu[0].length; i++) {
            var selectText=(arLengthMenu[0][i]==selectedPageLength)?'selected':'';
            $("#ddlLengthMenu").append(
              "<option " + selectText + " value=" +
                arLengthMenu[0][i] +
                ">" +
                arLengthMenu[1][i] +
                "</option>"
            );
          }
          // $("#ddlLengthMenu").val(selectedPageLength);

          $("#ddlLengthMenu").on("change", function() {
            $rowSearching
              .find(".row:eq(0)")
              .find("select")
              .val($(this).val())
              .change();
          });
        }
      });
      $table.columns().every(function() {
        $("#txtSearch").on("keyup change", function() {
          if ($table.search() !== this.value) {
            $table.search(this.value).draw();
          }
        });
      });
    });

    $($.document).ready(function() {
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
        initComplete: function() {
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

          $("#ddlLengthMenu2").on("change", function() {
            $rowSearching
              .find(".row:eq(0)")
              .find("select")
              .val($(this).val())
              .change();
          });
        }
      });
      $table.columns().every(function() {
        $("#txtSearch2").on("keyup change", function() {
          if ($table.search() !== this.value) {
            $table.search(this.value).draw();
          }
        });
      });
    });
  }

  runningTools(){
    document.getElementById("pageLength1").style.display = "block";
    document.getElementById("pageLength2").style.display = "none";
    document.getElementById("searchBox1").style.display = "block";
    document.getElementById("searchBox2").style.display = "none";
  }

  completedTools(){
    document.getElementById("pageLength2").style.display = "block";
    document.getElementById("pageLength1").style.display = "none";
    document.getElementById("searchBox2").style.display = "block";
    document.getElementById("searchBox1").style.display = "none";
  }
}
