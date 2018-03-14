import { Component, OnInit } from "@angular/core";
import { debuglog } from "util";
import { AuthService } from '../../auth-shell/auth-shell.service';
import { Branch } from '../../shared/models/auth/case.model';
import { StorageService } from '../../shared/services/storage.service';
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
// import { ALPN_ENABLED } from "constants";
declare var $;

@Component({
  selector: "app-case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.css"],
  providers: [AuthService,StorageService]
})
export class CaseComponent implements OnInit {
  caseRunning: Case[];
  caseCompleted: Case[];
  editCaseForm: FormGroup;
  arrListCaseRecource: any[] = [];
  arrListCaseStage: any[] = [];
  arrListCaseBranch: any[] = [];
  arrListCaseBranch1: any[] = [];

  constructor(private fb: FormBuilder,private authService: AuthService,private _storageService: StorageService) {
    this.caseRunning = CasesRunning
    this.caseCompleted = CasesCompleted;
    this.setDropdownUniqueValues();
    this.initCaseForm();

  

  }

  getRunningCase(){
    debugger
        var $this = this 
        var reqData = {
          userId: this._storageService.getUserId(),
        };
        this.authService.getCaseRunning(reqData).subscribe(
    
          result => {
            debugger
              result.forEach(function (value) {
                
               
               
                $this.caseRunning.push(value);
            });
              console.log(result);
          },
          err => {
              console.log(err);
          });
        }

  ngOnInit() {
this.getRunningCase();
    const self = this;
    this.getBranchDDL();
    // Running Case DataTable
    $($.document).ready(function () {

      $("#ddlCaseRecource").change(function () {
      
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
    
       
        $('#ddlCaseRecource').val("All");
        $table.columns(3).search("").draw();

        $('#ddlCaseStage').val("All");
        $table.columns(4).search("").draw();

        $('#ddlCaseBranch').val("All");
        
        $('#ddlCaseBranch1').val("All");
        $table.columns(6).search("").draw();
        // $('#reservation').val('');
        // $('#reservation').data('daterangepicker').setStartDate(new Date('01/01/1999'));
        // $('#reservation').data('daterangepicker').setEndDate(new Date('01/01/2099'));
        $('#reservation').data('daterangepicker').setStartDate(new Date());
        $('#reservation').data('daterangepicker').setEndDate(new Date());
      
        $.fn.dataTableExt.afnFiltering.length = 0;
        $table.columns(5).search("").draw();
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
            $table.columns(6).search("").draw();
        }
        else if ($table.columns(6).search() !== this.value) {
            $('#ddlCaseBranch').val($("#ddlCaseBranch1").val());
            $table.columns(6).search(this.value).draw();
        }
      });
      //end Branch1 filter
      $('#btnSearch').click(function () {
        
        var recourseVal = $('#ddlCaseRecource').val();
        var caseStageVal = $('#ddlCaseStage').val();
        var caseBranchVal = $('#ddlCaseBranch').val();
        
        

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
          $('#ddlCaseBranch1').val("All");
          $table.columns(6).search("").draw();
        }
        else if ($table.columns(6).search() !== caseBranchVal) {
          $('#ddlCaseBranch1').val(caseBranchVal);
          $table.columns(6).search(caseBranchVal).draw();
        }
       
          $.fn.dataTableExt.afnFiltering.push(
            function (oSettings, data, iDataIndex) {
                var startDate =new Date($('#reservation').data('daterangepicker').startDate.format('MM-DD-YYYY')) ;
                var endDate =new Date( $('#reservation').data('daterangepicker').endDate.format('MM-DD-YYYY'));
                var rowDate = new Date(data[5]);
                
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
debugger
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
          });
            console.log(result);
        },
        err => {
            console.log(err);
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

  createForm(c) {
    debugger
      this.editCaseForm = this.fb.group({
        
       // compliance: [c == null ? null : c.Compliance],
      caseId: [c == null ? null : c.id, Validators.required],
      
     courtCaseId: [c == null ? null : c.courtCaseId],
     recourseId: [c == null ? null : c.recourseId],
       // manager: [c == null ? null : c.Manager.id],
       courtId: [c == null ? null : c.courtId],
       stateId: [c == null ? null : c.stateId],
      parentCase: [c == null ? null : c.parentCase],
      nextHearingDate: [c == null ? null : c.nextHearingDate],
       customerId: [c == null ? null : c.customerId],
      remark: [c == null ? null : c.remark, Validators.required],
       groundforclosingfile: [],
        disposedoffFileNo: [],
      branchId: [c == null ? null : c.branchId],
       filingdate: [c == null ? null : c.filingdate],
       stageId: [c == null ? null : c.stageId],
        //employee: [c == null ? null : c.Employee.id],
       // courtplace: [c == null ? null : c.CourtePlace.id],
       oppLawyer: [c == null ? null : c.oppLawyer],
       childCase: [c == null ? null : c.childCase],
       lastHearingDate: [c == null ? null : c.lastHearingDate],
       uploadDocument: [],
       completionDate: [c == null ? null : c.completionDate]
      });
  }

  showEditModal(c) {
    debugger
    
    var $this = this
    var reqData = {
      caseId: c.caseId,
      };
    this.authService.getCaseByCaseId(reqData).subscribe(

        result => {
          debugger
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
}
