import { Component, OnInit } from '@angular/core';

declare let $;
@Component({
  selector: 'app-for-institution',
  templateUrl: './for-institution.component.html',
  styleUrls: ['./for-institution.component.css']
})
export class ForInstitutionComponent implements OnInit {
arr:[any]
  constructor() { }

  ngOnInit() {
    this.GetForInstitution();
    $($.document).ready(function () {
      var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
      var selectedPageLength = 15;
      var $table = $("#example1").DataTable({
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

      $table.columns().every(function () {
          $('#txtSearch').on('keyup change', function () {
              if ($table.search() !== this.value) {
                  $table.search(this.value).draw();
              }
          });

          //start bank filter
          $("#ddlBank").on("change", function () {
              var status = $(this).val();
              if (status == "All") {
                  $table.columns(1).search("").draw();
              }
              else if ($table.columns(1).search() !== this.value) {
                  $table.columns(1).search(this.value).draw();
              }
          });
          //end bank filter

          //start caseid filter
          $("#ddlCaseID").on("change", function () {
              var status = $(this).val();
              if (status == "All") {
                  $table.columns(2).search("").draw();
              }
              else if ($table.columns(2).search() !== this.value) {
                  $table.columns(2).search(this.value).draw();
              }
          });
          //end caseid filter

          //start Recourse filter
          $("#ddlRecourse").on("change", function () {
              var status = $(this).val();
              if (status == "All") {
                  $table.columns(3).search("").draw();
              }
              else if ($table.columns(3).search() !== this.value) {
                  $table.columns(3).search(this.value).draw();
              }
          });
          //end Recourse filter

          //start Stage filter
          $("#ddlStage").on("change", function () {
              var status = $(this).val();
              if (status == "All") {
                  $table.columns(4).search("").draw();
              }
              else if ($table.columns(3).search() !== this.value) {
                  $table.columns(4).search(this.value).draw();
              }
          });
          //end Stage filter

          //Amount bank filter
          $("#ddlAmount").on("change", function () {
              var status = $(this).val();
              if (status == "All") {
                  $table.columns(5).search("").draw();
              }
              else if ($table.columns(5).search() !== this.value) {
                  $table.columns(5).search(this.value).draw();
              }
          });
          //end Amount filter

      });

  });
  }

  GetForInstitution()
  {
    this.arr=[
      {CaseId:"O_SEC9_31526",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"16-Jan-2018",LoanAccountNo:"10049575"},
      {CaseId:"O_SEC9_31527",Stage:"ARGUMENTS",CourtCaseId:"",LegalCaseId:"21567835/SEC_138/19092014/S2766/1530552/MIGR_REF",LastHearingDate:"03-Nov-2015",NextHearingDate:"16-Jan-2018",LoanAccountNo:"21567835"},
      {CaseId:"O_SEC9_31528",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"16-Jan-2018",LoanAccountNo:"10049575"},
      {CaseId:"O_SEC9_31529",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"17-Jan-2018",LoanAccountNo:"11049575"},
      {CaseId:"O_SEC9_31530",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"18-Jan-2018",LoanAccountNo:"12049575"},
      {CaseId:"O_SEC9_31531",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"19-Jan-2018",LoanAccountNo:"13049575"},
      {CaseId:"O_SEC9_31532",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"20-Jan-2018",LoanAccountNo:"14049575"},
      {CaseId:"O_SEC9_31533",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"21-Jan-2018",LoanAccountNo:"15049575"},
      {CaseId:"O_SEC9_31534",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"22-Jan-2018",LoanAccountNo:"16049575"},
      {CaseId:"O_SEC9_31535",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"23-Jan-2018",LoanAccountNo:"17049575"},
      {CaseId:"O_SEC9_31536",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"24-Jan-2018",LoanAccountNo:"18049575"},
      {CaseId:"O_SEC9_31537",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"25-Jan-2018",LoanAccountNo:"19049575"},
      {CaseId:"O_SEC9_31538",Stage:"COMPLAINT_RETURNED",CourtCaseId:"9717/14",LegalCaseId:"10049575/SEC_138/14022014/R5780/1352986/MIGR",LastHearingDate:"15-Mar-2016",NextHearingDate:"26-Jan-2018",LoanAccountNo:"20049575"}
    ];
    
  }
  

}
