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
import {MasterTemplateComponentService} from "../master/masterTemplates/masterTemplate.component.service";
import { FileInfo } from "../../shared/models/master/FileInfo";
// import { ALPN_ENABLED } from "constants";
declare var $;

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.css"]
})
export class CaseComponent implements OnInit {
  caseRunning: Case[];
  caseCompleted: Case[];f
  editCaseForm: FormGroup;
  arrListCaseRecource: any[] = [];
  arrListCaseStage: any[] = [];
  arrListCaseBranch: any[] = [];
  arrListCaseBranch1: any[] = [];

  constructor(private fb: FormBuilder,private masterTemplateService :MasterTemplateComponentService) {
    this.caseRunning = CasesRunning
    this.caseCompleted = CasesCompleted;
    this.setDropdownUniqueValues();
    this.initCaseForm();
    this.updateCheckedOptions( this.caseRunning);
    if(!this.IsPrintable){
    this.updateCheckedOptions(this.caseCompleted)
    }
  }

  ngOnInit() {
    debugger;
    const self = this;
    // Running Case DataTable
    $($.document).ready(function () {

      $("#ddlCaseRecource").change(function () {
        debugger;
        if($("#ddlCaseRecource").val() !== "All")
        {
          for (var i = 0; i < self.caseRunning.length; i++) {
            var obj = self.caseRunning[i];
            if ($.inArray(obj.CaseStage.name, self.arrListCaseStage) < 0) {
              self.arrListCaseStage.push(obj.CaseStage.name);
            }
          }
        }
        else
        {
          self.arrListCaseStage =[];
        }
        
      });

      $('#btnReset').click(function () {
       debugger;
       
        $('#ddlCaseRecource').val("All");
        $table.columns(4).search("").draw();

        $('#ddlCaseStage').val("All");
        $table.columns(5).search("").draw();

        $('#ddlCaseBranch').val("All");
        $('#ddlCaseBranch1').val("All");
        $table.columns(7).search("").draw();
        // $('#reservation').val('');
        // $('#reservation').data('daterangepicker').setStartDate(new Date('01/01/1999'));
        // $('#reservation').data('daterangepicker').setEndDate(new Date('01/01/2099'));
        $('#reservation').data('daterangepicker').setStartDate(new Date());
        $('#reservation').data('daterangepicker').setEndDate(new Date());
      
        $.fn.dataTableExt.afnFiltering.length = 0;
        $table.columns(6).search("").draw();
        });
     
        $('#reservation').daterangepicker({
          autoApply:true,
          locale: {
            format: 'MM-DD-YYYY'
          }
          // startDate:new Date('01/01/1999'),
          // endDate:new Date('01/01/2099')
        });
        // $('#reservation').val('');
     
       //start Branch1 filter
       $("#ddlCaseBranch1").on("change", function () {
        var status = $(this).val();
        if (status == "All") {
            $('#ddlCaseBranch').val("All");
            $table.columns(7).search("").draw();
        }
        else if ($table.columns(7).search() !== this.value) {
            $('#ddlCaseBranch').val($("#ddlCaseBranch1").val());
            $table.columns(7).search(this.value).draw();
        }
      });
      //end Branch1 filter
      $('#btnSearch').click(function () {
        debugger;
        var recourseVal = $('#ddlCaseRecource').val();
        var caseStageVal = $('#ddlCaseStage').val();
        var caseBranchVal = $('#ddlCaseBranch').val();
        
        

        // start recourse filter
        if (recourseVal == "All") {
          $table.columns(4).search("").draw();
        }
        else if ($table.columns(4).search() !== recourseVal) {
          $table.columns(4).search(recourseVal).draw();
        }
        //end recourse filter

        // start Case stage filter
        if (caseStageVal == "All") {
          $table.columns(5).search("").draw();
        }
        else if ($table.columns(5).search() !== caseStageVal) {
          $table.columns(5).search(caseStageVal).draw();
        }
        //end Case stage filter

        // start caseBranchVal filter
        if (caseBranchVal == "All") {
          $('#ddlCaseBranch1').val("All");
          $table.columns(7).search("").draw();
        }
        else if ($table.columns(7).search() !== caseBranchVal) {
          $('#ddlCaseBranch1').val(caseBranchVal);
          $table.columns(7).search(caseBranchVal).draw();
        }
       
          $.fn.dataTableExt.afnFiltering.push(
            function (oSettings, data, iDataIndex) {
                var startDate =new Date($('#reservation').data('daterangepicker').startDate.format('MM-DD-YYYY')) ;
                var endDate =new Date( $('#reservation').data('daterangepicker').endDate.format('MM-DD-YYYY'));
                var rowDate = new Date(data[6]);
                debugger
                if (rowDate >= startDate && rowDate <= endDate) {
                  return true;
                }
                else{
                  return false;
                }
            
            }
          );
      
        $table.draw();
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
            debugger
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

   

  }
  setDropdownUniqueValues() {

    for (var i = 0; i < this.caseRunning.length; i++) {
      var obj = this.caseRunning[i];
      if ($.inArray(obj.Resource.name, this.arrListCaseRecource) < 0) {
        this.arrListCaseRecource.push(obj.Resource.name);
      }
      if ($.inArray(obj.Branch.name, this.arrListCaseBranch) < 0) {
        this.arrListCaseBranch.push(obj.Branch.name);
      }
      if ($.inArray(obj.Branch.name, this.arrListCaseBranch1) < 0) {
        this.arrListCaseBranch1.push(obj.Branch.name);
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
}
