import { Component, OnInit,Input } from "@angular/core";
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../../shared/services/storage.service';
import { InstitutionService } from '../../institution.service';
import { Institution } from '../../institution';

declare let $;

@Component({
  selector: "edit-for-institution-modal",
  templateUrl: "./Edit-for-institution.component.html",
  styleUrls: ["./Edit-for-institution.component.css"]
})

export class EditForInstitutionComponent implements OnInit{
     @Input() arInstitution: Institution[];
     editDetails: Institution;
     editForInstitutionForm: FormGroup;
     isInstitutionNameAlreadyExists: boolean = false;

     constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) { 
      this.createForm(null);
     }

  submitEditinstitutionUser(data : Institution) {
    
    var reqData = {
      institutionName:data.institutionName,
      branch:data.branch,
      reportType:data.reportType,
      uploadCases:data.uploadCases,
      uploadCaseFiles:data.uploadCaseFiles,
      caseId: data.caseId,
      stage:data.stage,
      courtCaseId:data.courtCaseId,
      legalCaseId:data.legalCaseId,
      lastHearingDate:data.lastHearingDate,
      nextHearingDate:data.nextHearingDate,
      loanAccountNumber:data.loanAccountNumber,
      compliance : data.compliance,
      recourse : data.recourse,
      region : data.region,
      location : data.location,
      productGroup : data.productGroup,
      customerName : data.customerName,
      DPDAsOnFilingDate : data.DPDAsOnFilingDate,
      dateOfFilingCase : data.dateOfFilingCase,
      courtPlace : data.courtPlace,
      lawyerName : data.lawyerName,
      stageInCourt : data.stageInCourt,
      orderReceivedDate : data.orderReceivedDate,
      rOStatus : data.rOStatus,
      arbitrationInitiated : data.arbitrationInitiated,
      repoFlag : data.repoFlag,
      legalManager : data.legalManager,
      closureDate : data.closureDate,
      totalAmtRecovered : data.totalAmtRecovered,
      caseFiledAgainst : data.caseFiledAgainst,
      DPDAsOnCurrentSystemDate : data.DPDAsOnCurrentSystemDate,
      caseCriticalityLevel : data.caseCriticalityLevel,
      parentID : data.parentID,
      generatedBy : data.generatedBy,
      uploadDocument : data.uploadDocument,
      groundForClosingFile : data.groundForClosingFile,
      disposedOffFileNo : data.disposedOffFileNo,
      state : data.state,
      product : data.product,
      POSAsOnFilingDate : data.POSAsOnFilingDate,
      NPAStageAsOnFilingDate : data.NPAStageAsOnFilingDate,
      caseType : data.caseType,
      courtName : data.courtName,
      amountInvolved : data.amountInvolved,
      caseStage : data.caseStage,
      previousHearingDate : data.previousHearingDate,
      NDOHNullReason : data.NDOHNullReason,
      receiverName : data.receiverName,
      ROExecutionDate : data.ROExecutionDate,
      arbitrationcaseID : data.arbitrationcaseID,
      remarks : data.remarks,
      caseStatus : data.caseStatus,
      closureReportingDate : data.closureReportingDate,
      accountStatus : data.accountStatus,
      POSAsOnCurrentSystemDate : data.POSAsOnCurrentSystemDate,
      NPAStageAsOnCurrentSystemDate : data.NPAStageAsOnCurrentSystemDate,
      type : data.type,
      childCase : data.childCase,
      completionDate : data.completionDate,
      id: data.id,
      userId: this._storageService.getUserId()

    };

  this._institutionService.updateForInstitution(reqData).subscribe(

    result => {
      var _result = result.body;
      if (_result.httpCode == 200) { //success
        $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
        this.closeModal();

        const objFind = this.arInstitution.find(x => x.id == this.editDetails.id);
        objFind.courtName = data.courtName;
        objFind.institutionName = data.institutionName;
        objFind.branch = data.branch;
        objFind.reportType = data.reportType;
        objFind.uploadCases = data.uploadCases;
        objFind.uploadCaseFiles = data.uploadCaseFiles;
        objFind.caseId = data.caseId;
        objFind.stage = data.stage;
        objFind.courtCaseId = data.courtCaseId;
        objFind.legalCaseId = data.legalCaseId;
        objFind.lastHearingDate = data.lastHearingDate;
        objFind.nextHearingDate = data.nextHearingDate;
        objFind.loanAccountNumber = data.loanAccountNumber;
        objFind.compliance  = data.compliance;
        objFind.recourse = data.recourse;
        objFind.region = data.region;
        objFind.location = data.location;
        objFind.productGroup = data.productGroup;
        objFind.customerName = data.customerName;
        objFind.DPDAsOnFilingDate  + data.DPDAsOnFilingDate;
        objFind.dateOfFilingCase = data.dateOfFilingCase;
        objFind.courtPlace = data.courtPlace;
        objFind.lawyerName = data.lawyerName;
        objFind.stageInCourt = data.stageInCourt;
        objFind.orderReceivedDate = data.orderReceivedDate;
        objFind.rOStatus = data.rOStatus;
        objFind.arbitrationInitiated = data.arbitrationInitiated;
        objFind.repoFlag = data.repoFlag;
        objFind.legalManager = data.legalManager;
        objFind.closureDate = data.closureDate;
        objFind.totalAmtRecovered = data.totalAmtRecovered;
        objFind.caseFiledAgainst = data.caseFiledAgainst;
        objFind.DPDAsOnCurrentSystemDate = data.DPDAsOnCurrentSystemDate;
        objFind.caseCriticalityLevel = data.caseCriticalityLevel;
        objFind.parentID = data.parentID;
        objFind.generatedBy = data.generatedBy;
        objFind.uploadDocument = data.uploadDocument;
        objFind.groundForClosingFile = data.groundForClosingFile;
        objFind.disposedOffFileNo = data.disposedOffFileNo;
        objFind.state = data.state;
        objFind.product = data.product;
        objFind.POSAsOnFilingDate = data.POSAsOnFilingDate;
        objFind.NPAStageAsOnFilingDate = data.NPAStageAsOnFilingDate;
        objFind.caseType = data.caseType;
        objFind.courtName = data.courtName;
        objFind.amountInvolved = data.amountInvolved;
        objFind.caseStage = data.caseStage;
        objFind.previousHearingDate = data.previousHearingDate;
        objFind.NDOHNullReason = data.NDOHNullReason;
        objFind.receiverName = data.receiverName;
        objFind.ROExecutionDate = data.ROExecutionDate;
        objFind.arbitrationcaseID = data.arbitrationcaseID;
        objFind.remarks = data.remarks;
        objFind.caseStatus = data.caseStatus;
        objFind.closureReportingDate = data.closureReportingDate;
        objFind.accountStatus = data.accountStatus;
        objFind.POSAsOnCurrentSystemDate = data.POSAsOnCurrentSystemDate;
        objFind.NPAStageAsOnCurrentSystemDate = data.NPAStageAsOnCurrentSystemDate;
        objFind.type = data.type;
        objFind.childCase = data.childCase;
        objFind.completionDate = data.completionDate;
      }
      else
        $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });

    },
    err => {
      console.log(err);
    });
  }

  closeModal() {
    $("#closebtn1").click();
  }

  ngOnInit(){
      //  const self = this;
      // $(document).ready(function () {
      //   $('.input-group.date').datepicker().on('changeDate', function (ev) {
      //     const attrName = $(this).find('input').attr('formControlName');
      //     const attrValue = $(this).find('input').val();
      //     self.editForInstitutionForm.controls[attrName].setValue(attrValue);
      //   });
      // });
  }

  
  subscriberFields() {
    this.editForInstitutionForm.get('courtName').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.courtName.toUpperCase() != fieldValue && this.arInstitution.filter(x => x.courtName.toUpperCase() == fieldValue).length > 0)
          this.isInstitutionNameAlreadyExists = true;
        else {
          this.isInstitutionNameAlreadyExists = false;
        }
      }
    );
  }

  createForm(data: Institution) {
    this.editForInstitutionForm = this.fb.group({
      institutionName:[data == null ? null : data.institutionName],
      branch:[data == null ? null : data.branch],
      reportType:[data == null ? null : data.reportType],
      uploadCases:[data == null ? null : data.uploadCases],
      uploadCaseFiles:[data == null ? null : data.uploadCaseFiles],
      caseId:[data == null ? null : data.caseId],
      stage:[data == null ? null : data.stage],
      courtCaseId:[data == null ? null : data.courtCaseId],
      legalCaseId:[data == null ? null : data.legalCaseId, Validators.required],
      lastHearingDate:[data == null ? null : data.lastHearingDate],
      nextHearingDate:[data == null ? null : data.nextHearingDate, Validators.required],
      loanAccountNumber:[data == null ? null : data.loanAccountNumber],
      compliance : [data == null ? null : data.compliance],
      recourse: [data == null ? null : data.recourse],
      region : [data == null ? null : data.region],
      location : [data == null ? null : data.location, Validators.required],
      productGroup : [data == null ? null : data.productGroup],
      customerName :[data == null ? null : data.customerName, Validators.required],
      DPDAsOnFilingDate : [data == null ? null : data.DPDAsOnFilingDate],
      dateOfFilingCase : [data == null ? null : data.dateOfFilingCase, Validators.required],
      courtPlace : [data == null ? null : data.courtPlace, Validators.required],
      lawyerName : [data == null ? null : data.lawyerName],
      stageInCourt : [data == null ? null : data.stageInCourt],
      orderReceivedDate : [data == null ? null : data.orderReceivedDate],
      rOStatus : [data == null ? null : data.rOStatus],
      arbitrationInitiated : [data == null ? null : data.arbitrationInitiated],
      repoFlag : [data == null ? null : data.repoFlag],
      legalManager : [data == null ? null : data.legalManager],
      closureDate : [data == null ? null : data.closureDate],
      totalAmtRecovered : [data == null ? null : data.totalAmtRecovered],
      caseFiledAgainst : [data == null ? null : data.caseFiledAgainst],
      DPDAsOnCurrentSystemDate : [data == null ? null : data.DPDAsOnCurrentSystemDate],
      caseCriticalityLevel : [data == null ? null : data.caseCriticalityLevel],
      parentID : [data == null ? null : data.parentID],
      generatedBy : [data == null ? null : data.generatedBy],
      uploadDocument : [data == null ? null : data.uploadDocument],
      groundForClosingFile : [data == null ? null : data.groundForClosingFile],
      disposedOffFileNo : [data == null ? null : data.disposedOffFileNo],
      state : [data == null ? null : data.state, Validators.required],
      product : [data == null ? null : data.product],
      POSAsOnFilingDate : [data == null ? null : data.POSAsOnFilingDate],
      NPAStageAsOnFilingDate : [data == null ? null : data.NPAStageAsOnFilingDate],
      caseType : [data == null ? null : data.caseType],
      courtName : [data == null ? null : data.courtName, Validators.required],
      amountInvolved : [data == null ? null : data.amountInvolved],
      caseStage : [data == null ? null : data.caseStage],
      previousHearingDate : [data == null ? null : data.previousHearingDate],
      NDOHNullReason : [data == null ? null : data.NDOHNullReason],
      receiverName : [data == null ? null : data.receiverName],
      ROExecutionDate : [data == null ? null : data.ROExecutionDate],
      arbitrationcaseID : [data == null ? null : data.arbitrationcaseID],
      remarks : [data == null ? null : data.remarks, Validators.required],
      caseStatus : [data == null ? null : data.caseStatus, Validators.required],
      closureReportingDate : [data == null ? null : data.closureReportingDate],
      accountStatus : [data == null ? null : data.accountStatus],
      POSAsOnCurrentSystemDate : [data == null ? null : data.POSAsOnCurrentSystemDate],
      NPAStageAsOnCurrentSystemDate : [data == null ? null : data.NPAStageAsOnCurrentSystemDate],
      type : [data == null ? null : data.type],
      childCase : [data == null ? null : data.childCase],
      completionDate: [data == null ? null : data.completionDate],
      id: [data == null ? null : data.id]
    });
    if (data != null) {
      this.isInstitutionNameAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}