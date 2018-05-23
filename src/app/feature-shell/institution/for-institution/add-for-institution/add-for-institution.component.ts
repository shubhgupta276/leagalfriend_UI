import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { debuglog } from 'util';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileValueAccessorDirective } from '../../../../shared/Directives/fileValueAccessor';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { FileValidator } from '../../../../shared/Directives/fileValidator';
import { StorageService } from '../../../../shared/services/storage.service';
import { InstitutionService } from '../../institution.service';
import { Institution } from '../../institution';

declare let $;
@Component({
  selector: "add-for-institution-modal",
  templateUrl: "./add-for-institution.component.html",
  styleUrls: ["./add-for-institution.component.css"]
})
export class AddForInstitutionComponent implements OnInit {
  @Input() arInstitution: Institution[];
  @Input() Institution: any;
  @Input() againstOpen: boolean;
  BranchdrpValue: any;
  ForInstitution: string = "For Institution";
  addForm1: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  arCityData: any[] = [];

  AddForInstitution() {

    this.addForm1 = this.fb.group({
      institutionName: [null],
      branch: [null],
      reportType: [null],
      uploadCases: [null, FileValidator.validate],
      uploadCaseFiles: [null],
    });
  }
  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    this.AddForInstitution();
  }
  submitAddForInstitution(data: any) {

    let fileInfo = data.uploadCases;
    let formdata: FormData = new FormData();
    formdata.append('institutionId', this.Institution.id);
    formdata.append('userId', this._storageService.getUserId());
    formdata.append('isForInstitution', 'Y');
    formdata.append('csvfile', data.uploadCases[0]);

    this._institutionService.addForInstitution(formdata).subscribe(
      result => {
        debugger
        var _result = result.body;

        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.arInstitution.push({
            institutionName: data.institutionName, branch: data.branch, reportType: data.reportType,
            uploadCases: data.uploadCases, uploadCaseFiles: data.uploadCaseFiles, caseId: data.caseId,
            stage: data.stage, courtCaseId: data.courtCaseId, legalCaseId: data.legalCaseId,
            lastHearingDate: data.lastHearingDate, nextHearingDate: data.nextHearingDate,
            loanAccountNumber: data.loanAccountNumber, compliance: data.compliance,
            recourse: data.recourse, region: data.region,
            location: data.location, productGroup: data.productGroup,
            customerName: data.customerName, DPDAsOnFilingDate: data.DPDAsOnFilingDate,
            dateOfFilingCase: data.dateOfFilingCase, courtPlace: data.courtPlace,
            lawyerName: data.lawyerName, stageInCourt: data.stageInCourt,
            orderReceivedDate: data.orderReceivedDate, rOStatus: data.rOStatus,
            arbitrationInitiated: data.arbitrationInitiated, repoFlag: data.repoFlag,
            legalManager: data.legalManager, closureDate: data.closureDate,
            totalAmtRecovered: data.totalAmtRecovered, caseFiledAgainst: data.caseFiledAgainst,
            DPDAsOnCurrentSystemDate: data.DPDAsOnCurrentSystemDate, caseCriticalityLevel: data.caseCriticalityLevel,
            parentID: data.parentID, generatedBy: data.generatedBy,
            uploadDocument: data.uploadDocument, groundForClosingFile: data.groundForClosingFile,
            disposedOffFileNo: data.disposedOffFileNo, state: data.state,
            product: data.product, POSAsOnFilingDate: data.POSAsOnFilingDate,
            NPAStageAsOnFilingDate: data.NPAStageAsOnFilingDate, caseType: data.caseType,
            courtName: data.courtName, caseStage: data.caseStage,
            previousHearingDate: data.previousHearingDate, amountInvolved: data.amountInvolved,
            receiverName: data.receiverName, NDOHNullReason: data.NDOHNullReason,
            ROExecutionDate: data.ROExecutionDate, arbitrationcaseID: data.arbitrationcaseID,
            remarks: data.remarks, caseStatus: data.caseStatus,
            closureReportingDate: data.closureReportingDate, accountStatus: data.accountStatus,
            POSAsOnCurrentSystemDate: data.POSAsOnCurrentSystemDate,
            NPAStageAsOnCurrentSystemDate: data.NPAStageAsOnCurrentSystemDate,
            type: data.type, childCase: data.childCase,
            completionDate: data.completionDate,
            id: _result.id
          });
          
          this.AddForInstitution();
          this.closeModal();
          this.subscriberFields();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
      },
      err => {
        console.log(err);
      });
  }
  closeModal() {
    $('#closebtn').click();
  }

  bindBranch() {
    var branchData = this._storageService.getBranchData();
    if (branchData)
      this.BranchdrpValue = branchData.branchName;
  }

  ngOnInit() {
    $("#ERROR_casefile").hide();
    this.subscriberFields();
  }
  subscriberFields() {
    // this.addForm1.get('institutionName').valueChanges.subscribe(
    //   (e) => {
    //     if (this.arInstitution.filter(x => x.institutionName.toUpperCase() == e.toUpperCase()).length > 0)
    //       this.isInstitutionAlreadyExists = true;
    //     else {
    //       this.isInstitutionAlreadyExists = false;
    //     }
    //   }
    // );
  }
  upload(event: any) {
    $("#ERROR_casefile").hide();
    $("#ERROR_uploadcasefile").hide();
    let files = event.target.files;
    //check file is valid
    if (event.target.id == "casefile") {
      if (!this.validateFile(files[0].name)) {
        $("#ERROR_casefile").show();
        return false;
      }
      else {
        $("#ERROR_casefile").hide();
      }
    }
    else if (event.target.id == "uploadcasefile") {
      if (!this.validateFile(files[0].name)) {
        $("#ERROR_uploadcasefile").show();
        return false;
      }
      else {
        $("#ERROR_uploadcasefile").hide();
      }
    }

  }

  validateFile(name: string) {
    var ext = name.substring(name.lastIndexOf('.'));
    if (ext.toLowerCase() == '.csv') {
      return true;
    }
    else {
      return false;
    }
  }

}