import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-against-institution',
  templateUrl: './against-institution.component.html',
  styleUrls: ['./against-institution.component.css']
})
export class AgainstInstitutionComponent implements OnInit {
arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetForInstitution();
    $($.document).ready(function(){
     
      $('#example1').DataTable();
    }
  );
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
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
