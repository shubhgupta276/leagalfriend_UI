import { Component, OnInit } from '@angular/core';
import { AddCourtMasterComponent } from "./add-court/add-court.component";
import { EditCourtMasterComponent } from "./edit-court/edit-court.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
    declarations: [
      CourtComponent,
      AddCourtMasterComponent,
      EditCourtMasterComponent,
    ]
  }
)
@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
arr:[any];
  constructor(private fb: FormBuilder) { 
    this.EditCourtMaster(null);
  }
  editCourtMasterForm: FormGroup;
  ngOnInit() {
    this.GetAllCourt();
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
      });

    });
  }

  showEditModal(data){
    $('#editCourtMasterModal').modal('show');
    this.EditCourtMaster(data);
    }
  GetAllCourt()
  {
       this.arr=[
        {CourtName:"10TH_ACJ",CourtDesc:"10TH ADDITIONAL CIVIL JUDGE"},
        {CourtName:"10TH_ACJ_CCC",CourtDesc:"10TH ADDITIONAL CIVIL JUDGE, CITY CIVIL COURT"},
        {CourtName:"10TH_ACJ_JD",CourtDesc:"10TH ADDITIONAL CIVIL JUDGE, JUNIOR DIVISION"},
        {CourtName:"10TH_ACJ_JD_MM",CourtDesc:"10TH ADDITIONAL CIVIL JUDGE (JUNIOR DIVISION) & METROPOLITAN MAGISTRATE"},
        {CourtName:"10TH_ACJ_SD_ACJM",CourtDesc:"10TH ADDITIONAL CIVIL JUDGE (SENIOR DIVISION) & ADDITIONAL CHIEF JUDICIAL MAGISTRATE"},
        {CourtName:"10TH_ACJ_SD_ACMM",CourtDesc:"10TH ADDITIONAL CIVIL JUDGE (SENIOR DIVISION) & ADDITIONAL CHIEF METROPOLITAN MAGISTRATE"},
        {CourtName:"10TH_ACJM",CourtDesc:"10TH ADDITIONAL CHIEF JUDICIAL MAGISTRATE"},
        {CourtName:"10TH_ACMM",CourtDesc:"10TH ADDITIONAL CHIEF METROPOLITAN MAGISTRATE"},
        {CourtName:"10TH_ADJ",CourtDesc:"10TH ADDITIONAL DISTRICT JUDGE"},
        {CourtName:"10TH_ADSJ",CourtDesc:"10TH ADDITIONAL DISTRICT & SESSIONS JUDGE"},
        {CourtName:"10TH_ASS_CCC",CourtDesc:"10TH ASSISTANT CITY CIVIL COURT"},
        {CourtName:"10TH_BENCH_CCC",CourtDesc:"10TH BENCH, CITY CIVIL COURT"},
        {CourtName:"10TH_CCC",CourtDesc:"10TH CITY CIVIL COURT"},
        {CourtName:"10TH_CCH",CourtDesc:"10TH CIVIL COURT HALL"},
        {CourtName:"10TH_CHIEF_JD",CourtDesc:"10TH CHIEF JUDGE"},
        {CourtName:"10TH_JDG_CCC",CourtDesc:"10TH JUDGE, CITY CIVIL COURT"},
      ];
  }
  EditCourtMaster(data) {
    this.editCourtMasterForm = this.fb.group({
      court: [data==null?null:data.CourtName, Validators.required],
      courtdesc: [data==null?null:data.CourtDesc, Validators.required]
    });
  }

}
