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
     compliance: [null],
      legalcaseId: [null, Validators.required],
      courtCaseId: [],
      recourse: [1],
      manager: [null],
      court: [null],
      state: [null, Validators.required],
      parentCase: [1],
      nextHearingDate: [],
      customerName: [],
      remark: [null, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [1],
      filingdate: [null],
      stage: [1],
      employee: [1],
      courtplace: [null, Validators.required],
      oppLawyer: [],
      childCase: [],
      lastHearingDate: [],
      uploadDocument: [],
      completionDate: [],
      region:[],
      location:[null, Validators.required],
      product:[],
      productgroup:[],
      loanaccountnumber:[],
      customername:[null, Validators.required],
      posasofillingdate:[],
      dpdasonfillingdate:[],
      npastageasonfillingdate:[],
      dateoffillingcase:[null, Validators.required],
      casetype:[],
      courtcaseid:[],
      courtname:[null, Validators.required],
      OrderreceivedDate:[null],
      amountinvolved:[],
      lawyername:[],
      casestage:[],
      stageincourt:[],
      previoushearingdate:[null],
      nexthearingdate:[null, Validators.required],
      ndohnullreasong:[],
      orderreceiveddate:[null],
      receivername:[],
      rostatus:[],
      roexecutiondate:[],
      arbitrationinitiated:[],
      arbitrationcaseid:[],
      repoflag:[],
      legalmanager:[],
      casestatus:[null, Validators.required],
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
     const self = this;
    $(document).ready(function () {
      $('.input-group.date').datepicker().on('changeDate', function (ev) {
        const attrName = $(this).find('input').attr('formControlName');
        const attrValue = $(this).find('input').val();
        self.editForInstitutionForm.controls[attrName].setValue(attrValue);
      });
    });
}

  submitEditinstitutionUser(data) {
    debugger;
    $.toaster({ priority : 'success', title : 'Success', message : 'Institution updated successfully'});
    $("#editForInstitutionModal").hide();
    $(".modal-backdrop").hide();
  }
}