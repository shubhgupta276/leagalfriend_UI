import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';




declare let $;
@Component({
  selector: "edit-for-institution-modal",
  templateUrl: "./Edit-for-institution.component.html",
  styleUrls: ["./Edit-for-institution.component.css"]
})

export class EditForInstitutionComponent implements OnInit{
    editForInstitutionForm: FormGroup;
    
    EditForInstitutionComponent(){
     this.editForInstitutionForm = this.fb.group({
     compliance: [],
      legalcaseId: [],
      courtCaseId: [],
      recourse: [1],
      manager: [1],
      court: [1],
      state: [1],
      parentCase: [1],
      nextHearingDate: [],
      customerName: [],
      remark: [null],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [1],
      filingdate: [],
      stage: [1],
      employee: [1],
      courtplace: [1],
      oppLawyer: [],
      childCase: [],
      lastHearingDate: [],
      uploadDocument: [],
      completionDate: [],
      region:[],
      location:[],
      product:[],
      productgroup:[],
      loanaccountnumber:[],
      customername:[],
      posasofillingdate:[],
      dpdasonfillingdate:[],
      npastageasonfillingdate:[],
      dateoffillingcase:[],
      casetype:[],
      courtcaseid:[],
      courtname:[],
      OrderreceivedDate:[],
      amountinvolved:[],
      lawyername:[],
      casestage:[],
      stageincourt:[],
      previoushearingdate:[],
      nexthearingdate:[],
      ndohnullreasong:[],
      orderreceiveddate:[],
      receivername:[],
      rostatus:[],
      roexecutiondate:[],
      arbitrationinitiated:[],
      arbitrationcaseid:[],
      repoflag:[],
      legalmanager:[],
      casestatus:[],
      closuredate:[],
      closurereportingdate:[],
      totalamountrecovered:[],
      accountstatus:[],
      casefiledagainst:[],
      posoncurrentdate:[],
      dpdoncurrentdate:[],
      apastagedate:[],
      casecriticalitylevel:[],
      type:[],
      parentid:[],
      childcase:[],
      generatedby:[],
      uploaddocument:[],
      groundforclosingdate:[],
      completiondate:[],
      disposedfileno:[]
});

 
}
constructor(private fb: FormBuilder) {
    this.EditForInstitutionComponent();
  
}
ngOnInit(){
    //     this.EditForInstitutionComponent();
}

  submitEditinstitutionUser(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'Institution updated successfully'});
    // $("#editForInstitutionModal").hide();
  }
}