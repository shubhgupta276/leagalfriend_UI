import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../../shared/services/storage.service';
import { InstitutionService } from '../../institution.service';
import { Institution } from '../../institution';
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { saveAs } from 'file-saver';
import { StageService } from "../../../master/stage/stage.service";
declare let $;

@Component({
  selector: "edit-for-institution-modal",
  templateUrl: "./Edit-for-institution.component.html",
  styleUrls: ["./Edit-for-institution.component.css"]
})

export class EditForInstitutionComponent implements OnInit {
  editForInstitutionForm: FormGroup;
  institutionId: number;
  recourseId: any;
  institutionalCaseId: number;
  editData: any;
  caseFiles: any;
  arStage: any = [];
  isCompliance: boolean;
  isCaseComplete: boolean = false;
  isCaseCompletedOpen;
  isFileUploading: boolean = false;
  arCompliances: any[];
  @ViewChild('inputFileUpload') myFileUpload: any;
  isPageLoad: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _institutionService: InstitutionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _datePipe: DatePipe,
    private _stageService: StageService,
    private _storageService: StorageService) {

    this._activatedRoute.params.subscribe((params) => {
      this.institutionalCaseId = params.id;
      this.institutionId = params.institutionId;
      this.recourseId = params.recourseId;
      this.getInstitutionDetail();
    })
  }

  ngOnInit() {
    this.createForm(null);
    const self = this;
    $(document).ready(function () {
      $('.input-group.date').datepicker().on('changeDate', function (ev) {
        const attrName = $(this).find('input').attr('formControlName');
        const attrValue = $(this).find('input').val();
        self.editForInstitutionForm.controls[attrName].setValue(attrValue);
      });
      $('body').on('change', '#txtCompletionDate', function (evt) {
        self.changeCompletionDate($(this).val());
      });
    });
  }

  getStages(recourseId) {
    this._stageService.getRecourseStages(recourseId).subscribe(
      result => {
        if (result.httpCode === 200) {
          result.stageRecourses.forEach(element => {
            this.arStage.push(element);
          });
        }
      });
  }

  createForm(obj) {
    if (obj !== null) {
      this.editData = obj;
      this.getStages(obj.recourseId);
    }
    this.editForInstitutionForm = this.fb.group({
      accountStatus: obj == null ? null : obj.accountStatus,
      advocateofEp: obj == null ? null : obj.advocateofEp,
      amountInvolved: obj == null ? null : obj.amountInvolved,
      appealUs34Filed: obj == null ? null : obj.appealUs34Filed,
      arbitrationCaseId: obj == null ? null : obj.arbitrationCaseId,
      arbitrationInitiated: obj == null ? null : obj.arbitrationInitiated,
      arbitratorAppointed: obj == null ? null : obj.arbitratorAppointed,
      assetDetails: obj == null ? null : obj.assetDetails,
      auctionDate: obj == null ? null : obj.auctionDate,
      awardAmount: obj == null ? null : obj.awardAmount,
      awardCopyProvided: obj == null ? null : obj.awardCopyProvided,
      awardDate: obj == null ? null : obj.awardDate,
      bankName: obj == null ? null : obj.bankName,
      branchId: obj == null ? null : obj.branchId,
      caseCriticalityLevel: obj == null ? null : obj.caseCriticalityLevel,
      caseFiledAgainst: obj == null ? null : obj.caseFiledAgainst,
      caseId: obj == null ? null : obj.caseId,
      caseStage: [obj == null ? null : obj.caseStage, Validators.required],
      caseStatus: obj == null ? null : obj.caseStatus,
      caseType: obj == null ? null : obj.caseType,
      childCase: obj == null ? null : obj.childCase,
      chqNo1: obj == null ? null : obj.chqNo1,
      chqNo2: obj == null ? null : obj.chqNo2,
      chqNo3: obj == null ? null : obj.chqNo3,
      closureDate: obj == null ? null : this._datePipe.transform(obj.closureDate, "yyyy-MM-dd"),
      closureReportingDate: obj == null ? null : this._datePipe.transform(obj.closureReportingDate, "yyyy-MM-dd"),
      completionDate: obj == null ? null : this._datePipe.transform(obj.completionDate, "yyyy-MM-dd"),
      compliance: obj == null ? false : obj.compliance == false ? this.isCompliance : obj.compliance,
      coolingPeriodNoticeDate: obj == null ? null : obj.coolingPeriodNoticeDate,
      courtCaseId: obj == null ? null : obj.courtCaseId,
      courtName: obj == null ? null : obj.courtName,
      courtPlace: obj == null ? null : obj.courtPlace,
      customerName: obj == null ? null : obj.customerName,
      dateOfConduct: obj == null ? null : obj.dateOfConduct,
      disbursalDate: obj == null ? null : obj.disbursalDate,
      disposedOffFileNo: obj == null ? null : obj.disposedOffFileNo,
      dpdOnCurrentDate: obj == null ? null : obj.dpdOnCurrentDate,
      dpdOnEpFilingDate: obj == null ? null : obj.dpdOnEpFilingDate,
      dpdOnFilingDate: obj == null ? null : obj.dpdOnFilingDate,
      dpdOnNoticeDate: obj == null ? null : obj.dpdOnNoticeDate,
      ePCourtName: obj == null ? null : obj.ePCourtName,
      ePCourtPlace: obj == null ? null : obj.ePCourtPlace,
      executionCaseNo: obj == null ? null : obj.executionCaseNo,
      executionFiled: obj == null ? null : obj.executionFiled,
      executionFilingDate: obj == null ? null : obj.executionFilingDate,
      fileName: obj == null ? null : obj.fileName,
      filingDate: obj == null ? null : this._datePipe.transform(obj.filingDate, "yyyy-MM-dd"),
      generatedBy: obj == null ? null : obj.generatedBy,
      groundForClosingFile: obj == null ? null : obj.groundForClosingFile,
      guarantorsName: obj == null ? null : obj.guarantorsName,
      id: obj == null ? null : obj.id,
      institutionId: obj == null ? null : obj.institutionId,
      lawyerName: obj == null ? null : obj.lawyerName,
      legalCaseId: obj == null ? null : obj.legalCaseId,
      legalManager: obj == null ? null : obj.legalManager,
      loanAccountNumber: obj == null ? null : obj.loanAccountNumber,
      loanAmount: obj == null ? null : obj.loanAmount,
      location: obj == null ? null : obj.location,
      ndohNullReason: obj == null ? null : obj.ndohNullReason,
      nextActionDate: obj == null ? null : obj.nextActionDate,
      nextActionPlan: obj == null ? null : obj.nextActionPlan,
      nextHearingDate: obj == null ? null : this._datePipe.transform(obj.nextHearingDate, "yyyy-MM-dd"),
      noticeAmount: obj == null ? null : obj.noticeAmount,
      noticeDate: obj == null ? null : obj.noticeDate,
      noticeDateAppointmentArbitrator: obj == null ? null : obj.noticeDateAppointmentArbitrator,
      noticePostalRemarks: obj == null ? null : obj.noticePostalRemarks,
      noticeReferenceNumber: obj == null ? null : obj.noticeReferenceNumber,
      noticeSentDate: obj == null ? null : obj.noticeSentDate,
      noticeType: obj == null ? null : obj.noticeType,
      npaStageOnCurrentDate: obj == null ? null : obj.npaStageOnCurrentDate,
      npaStageOnEpFilingDate: obj == null ? null : obj.npaStageOnEpFilingDate,
      npaStageOnFilingDate: obj == null ? null : obj.npaStageOnFilingDate,
      npaStageOnNoticeDate: obj == null ? null : obj.npaStageOnNoticeDate,
      orderReceivedDate: obj == null ? null : this._datePipe.transform(obj.orderReceivedDate, "yyyy-MM-dd"),
      overdueAmtOnNoticeDate: obj == null ? null : obj.overdueAmtOnNoticeDate,
      parentId: obj == null ? null : obj.parentId,
      peacefulPossessionNoticeDate: obj == null ? null : obj.peacefulPossessionNoticeDate,
      physicalPossessionDate: obj == null ? null : obj.physicalPossessionDate,
      policeComplaintFiledDate: obj == null ? null : obj.policeComplaintFiledDate,
      posOnCurrentDate: obj == null ? null : obj.posOnCurrentDate,
      posOnEpFilingDate: obj == null ? null : obj.posOnEpFilingDate,
      posOnFilingDate: obj == null ? null : obj.posOnFilingDate,
      posOnNoticeDate: obj == null ? null : obj.posOnNoticeDate,
      previousHearingDate: obj == null ? null : this._datePipe.transform(obj.previousHearingDate, "yyyy-MM-dd"),
      product: obj == null ? null : obj.product,
      productGroup: obj == null ? null : obj.productGroup,
      publicationDatePhysicalPossessionNotice: obj == null ? null : obj.publicationDatePhysicalPossessionNotice,
      receiveOrderStatus: obj == null ? null : obj.receiveOrderStatus,
      receiverName: obj == null ? null : obj.receiverName,
      receiverOrderAppliedDate: obj == null ? null : this._datePipe.transform(obj.receiverOrderAppliedDate, "yyyy-MM-dd"),
      receiverOrderReceivedDate: obj == null ? null : obj.receiverOrderReceivedDate,
      recieveOrderApplied: obj == null ? null : obj.recieveOrderApplied,
      recourse: [obj == null ? null : obj.recourse, Validators.required],
      region: obj == null ? null : obj.region,
      remarks: obj == null ? null : obj.remarks,
      repoFlag: obj == null ? null : obj.repoFlag,
      reservePrice: obj == null ? null : obj.reservePrice,
      saleDate: obj == null ? null : obj.saleDate,
      saleNoticeDate: obj == null ? null : obj.saleNoticeDate,
      saleNoticePublicationDate: obj == null ? null : obj.saleNoticePublicationDate,
      sec9Applied: obj == null ? null : obj.sec9Applied,
      sec9LegalCaseId: obj == null ? null : obj.sec9LegalCaseId,
      sec14FilingDate: obj == null ? null : obj.sec14FilingDate,
      sec17OrderApplied: obj == null ? null : obj.sec17OrderApplied,
      sec17OrderAppliedDate: obj == null ? null : obj.sec17OrderAppliedDate,
      sec17OrderReceivedDate: obj == null ? null : obj.sec17OrderReceivedDate,
      sec17OrderStatus: obj == null ? null : obj.sec17OrderStatus,
      sec132NoticeDate: obj == null ? null : obj.sec132NoticeDate,
      sec132NoticePostalRemarks: obj == null ? null : obj.sec132NoticePostalRemarks,
      sec132PublicationDate: obj == null ? null : obj.sec132PublicationDate,
      sec134NoticePostalRemarks: obj == null ? null : obj.sec134NoticePostalRemarks,
      sec134PublicationDate: obj == null ? null : obj.sec134PublicationDate,
      serveDate: obj == null ? null : obj.serveDate,
      settlementAmt: obj == null ? null : obj.settlementAmt,
      spdcNoticeAckRemarks: obj == null ? null : obj.spdcNoticeAckRemarks,
      spdcNoticeServiceDate: obj == null ? null : obj.spdcNoticeServiceDate,
      stageInCourt: obj == null ? null : obj.stageInCourt,
      state: obj == null ? null : obj.state,
      symbolicPossessionDate: obj == null ? null : obj.symbolicPossessionDate,
      totalAmtRecovered: obj == null ? null : obj.totalAmtRecovered,
      transmissionRequired: obj == null ? null : obj.transmissionRequired,
      type: obj == null ? null : obj.type,
      valuationAmount: obj == null ? null : obj.valuationAmount,
      valuationDate: obj == null ? null : obj.valuationDate,
      whetherCustomerAttended: obj == null ? null : obj.whetherCustomerAttended,
      uploadFile: null
    });

    if (obj != null) {
      this.isCompliance = obj == null ? false : obj.compliance;
      if (this.isPageLoad) {
        if (this.isCompliance) {
          this.openComplianceTab();
        }
        else {
          this.openCaseDetailTab();
        }
        this.isPageLoad = false;
      }
      setTimeout(() => {
        this.isCaseComplete = (obj.completionDate) ? true : false;
        if (this.isCompliance || this.isCaseComplete) {
          this.disableForm(true);
        }
      }, 10);
    }
  }

  getInstitutionDetail() {
    let branchData = this._storageService.getBranchData();
    if (branchData) {
      this._institutionService.getForInstitution(this.institutionId, branchData.id, this.institutionalCaseId).
        subscribe((result) => {

          if (result) {
            this.caseFiles = result.caseFiles;
            this.createForm(result);
          }
        },
          err => {
            console.log(err);
          })
    }
  }

  submitEditinstitutionUser(data: any) {
    console.log(this.editForInstitutionForm.valid);
    if (this.editForInstitutionForm.valid) {
      data.userId = this._storageService.getUserId();

      let document = (data.uploadFile) ? data.uploadFile[0] : null
      let formdata: FormData = new FormData();
      formdata.append('file', document);
      delete data.uploadFile;
      formdata.append('forInstitutionalCase', JSON.stringify(data));

      this._institutionService.updateForInstitution(formdata).subscribe(

        result => {
          this.isFileUploading = false;
          result = result.body;
          if (result.httpCode == 200) {
            $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
            this.getInstitutionDetail();
          }
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.validateForm();
    }
  }

  validateForm() {
    const controls = this.editForInstitutionForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.editForInstitutionForm.get(name).markAsTouched();
      }
    }
  }

  uploadFile($event) {
    const file = this.editForInstitutionForm.get('uploadFile').value;
    if (file) {
      this.isFileUploading = true;
      this.editData.uploadFile = file;
      this.submitEditinstitutionUser(this.editData);
      this.myFileUpload.nativeElement.value = '';
    }
    else {
      this.isFileUploading = false;
    }
  }

  disableForm(isDisable) { // disable form if compliance is true
    if (isDisable) {
      this.editForInstitutionForm.disable();
    }
    else {
      this.editForInstitutionForm.enable();
    }
    this.myFileUpload.nativeElement.disabled = isDisable;
  }

  changeCompliance(isChecked) {
    this.isCompliance = isChecked;
    if (isChecked) {
      if (confirm("Do you want to put this case into compliance?")) {
        this.updateCaseToCompliance();
      }
    }
    else {
      this.disableForm(isChecked);
    }
  }

  updateCaseToCompliance() {
    const stageData = this.arStage.find(x => x.stageCode == this.editData.caseStage);
    const stageId = (stageData) ? stageData.id : 0;
    const reqData = {
      compliance: {
        id: this.editData.id,
        recourse: {
          id: this.editData.recourseId
        },
        stage: {
          id: stageId
        }
      },
      legalCase: {
        id: this.editData.id
      }
    }
    this._institutionService.updateToCompliance(reqData).subscribe(
      (result) => {
        result = result.body;
        if (result.httpCode === 200) {
          this.editData.compliance = true;
          // this.submitEditinstitutionUser(this.editData);
          $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
          this.disableForm(true);
        }
        else if (result.httpCode === 500) {
          $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
        }
      },
      err => {
        console.log(err);
      })
  }

  getCompliances() {
    this.arCompliances = [];
    this._institutionService.GetCompliances(this.institutionalCaseId).subscribe(
      (result) => {
        if (result && result.length > 0) {
          this.arCompliances = result;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  closeCompliance(data) {

    this._institutionService.closeCompliances(data.id).subscribe(
      (result) => {
        result = result.body;
        if (result.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });

          const index = this.arCompliances.findIndex(x => x.id == data.id);
          this.arCompliances.splice(index, 1);
          if (this.arCompliances.length == 0) {
            this.isCaseCompletedOpen = false;
            this.getInstitutionDetail();
          }
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  changeCompletionDate(val) {
    if (val && val.length > 0) {
      this.editForInstitutionForm.controls['groundForClosingFile'].setValidators(Validators.required);
      this.editForInstitutionForm.controls['groundForClosingFile'].updateValueAndValidity();
    }
  }

  openCaseDetailTab() {
    this.isCaseCompletedOpen = false;
  }

  openComplianceTab() {
    this.isCaseCompletedOpen = true;
    this.getCompliances();
  }

  deleteFile(data) {

    this._institutionService.deleteFile(data.id).subscribe(
      (result) => {
        this.caseFiles = this.caseFiles.filter(x => x.id != data.id);
      },
      err => {
        console.log(err);
      })
  }

  downloadFile(data) {
    this._institutionService.downloadFile(data.id).subscribe(
      (result) => {
        let blob = new Blob([result]);
        saveAs(blob, data.fileName);
      },
      err => {
        console.log(err);
      })
  }

  back() {
    this._router.navigate(['/admin/institution/forinstitution', { institutionId: this.institutionId, recourseId: this.recourseId }]);
  }
}