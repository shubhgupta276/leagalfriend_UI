import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllCourt();
    $($.document).ready(function() {
      $("#example1").DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        lengthMenu: [[10, 15, 25, -1], [10, 15, 25, "All"]],
        pageLength: 15,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        }
      });
    });
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
  

}
