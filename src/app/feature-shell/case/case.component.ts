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
import {MasterTemplateComponentService} from "../master/masterTemplates/masterTemplate.component.service";
import { FileInfo } from "../../shared/models/master/FileInfo";

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.css"]
})
export class CaseComponent implements OnInit {
  caseRunning: Case[];
  caseCompleted: Case[];
  editCaseForm: FormGroup;

  constructor(private fb: FormBuilder,private masterTemplateService :MasterTemplateComponentService) {
    this.caseRunning = CasesRunning;
    this.caseCompleted = CasesCompleted;
    this.updateCheckedOptions( this.caseRunning);
    if(!this.IsPrintable){
    this.updateCheckedOptions(this.caseCompleted)
    }
    this.initCaseForm();
  }

  ngOnInit() {
    // Running Case DataTable
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

    // Completed Case DataTable
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
  IsPrintable = false;
  updateCheckedOptions(items){
    var flagPrint = false;
    for(var i=0;i<items.length;i++)
    {
     if(items[i].IsChecked == true)
     {
      flagPrint = true;
      this.IsPrintable = true;
     }
    }
    if(flagPrint == false)
    {
      this.IsPrintable = false;
    }
 }
lstUploadedDocuments : FileInfo[];
 getUploadedDocuments(){
    this.masterTemplateService.getuploadedFile().subscribe(x=>this.lstUploadedDocuments = x);
 }

 SelectedFileIds = [];
 getSelectedDocument(IsChecked,FileId)
 {
    if(IsChecked.srcElement.checked)
      {
        this.SelectedFileIds.push(FileId);
      }
    else
    {
      this.SelectedFileIds = this.SelectedFileIds.filter(function(i) {
      return i != FileId;
      });
    }
  
 }

 getMappingFilesTodownload()
 {
   
   for(var i=0;i<this.SelectedFileIds.length;i++){
        var data = this.lstUploadedDocuments.find(x => x.Id ===  this.SelectedFileIds[i]);
        var selectedCases = this.caseRunning.filter(function(x) {
          return x.IsChecked == true;})
          var selectedCasescompelted = this.caseCompleted.filter(function(x) {
            return x.IsChecked == true;});
            selectedCases = selectedCases.concat(selectedCasescompelted);

            for(var j= 0;j<selectedCases.length;j++)
            {
              data.Value= data.Value.replace('@CourtCaseId', selectedCases[j].CourtCaseId.toString());
              data.Value= data.Value.replace('@CustomerName',' '+ selectedCases[j].CustomerName.name);

            }
        var blob = new Blob([data.Value], { type: data.FileType });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
   }
}
// Example use:



}
