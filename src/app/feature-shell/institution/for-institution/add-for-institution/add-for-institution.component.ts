import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from "@angular/core";
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
  @Input() arInstitution: Institution[] = [];
  @Input() Institution: any;
  @Input() againstOpen: boolean;
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter();

  branchData: any;
  ForInstitution: string = "For Institution";
  addForm1: FormGroup;
  isInstitutionAlreadyExists: boolean = false;
  arCityData: any[] = [];
  showZipError: boolean = false;
  showCsvError: boolean = false;

  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    this.AddForInstitution();
    this.bindBranch();
  }

  AddForInstitution() {

    this.addForm1 = this.fb.group({
      institutionName: [null],
      branch: [null],
      reportType: [null],
      uploadCases: [null, FileValidator.validate],
      uploadCaseFiles: [null],
    });
  }

  submitAddForInstitution(data: any) {

    let fileInfo = data.uploadCases;
    let formdata: FormData = new FormData();
    formdata.append('institutionId', this.Institution.id);
    formdata.append('userId', this._storageService.getUserId());
    formdata.append('isForInstitution', 'Y');
    formdata.append('branchId', this.branchData.id);
    formdata.append('csvfile', data.uploadCases[0]);
    formdata.append('zipFile', (data.uploadCaseFiles) ? data.uploadCaseFiles[0] : null);
    
    this._institutionService.addForInstitution(formdata).subscribe(
      result => {

        var _result = result.body;

        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.saveSuccess.emit();
          this.AddForInstitution();
          this.closeModal();
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
    let data = this._storageService.getBranchData();
    if (data)
      this.branchData = data;
  }

  ngOnInit() {
    $("#ERROR_casefile").hide();
    this.subscriberFields();
  }

  subscriberFields(){
    //
  }

  upload(event: any) {

    let files = event.target.files;
    if (files.length > 0) {
      if (event.target.id == "casefile")
        this.showCsvError = !this.validateFile(files[0].name, false);
      else
        this.showZipError = !this.validateFile(files[0].name, true);
    }
    else {
      if (event.target.id == "casefile")
        this.showCsvError = false;
      else
        this.showZipError = false;
    }
  }

  validateFile(name: string, isZipFile: boolean = false): boolean {

    var ext = name.substring(name.lastIndexOf('.'));
    if (isZipFile && ext.toLowerCase() == '.zip')
      return true;
    else if (!isZipFile && ext.toLowerCase() == '.csv')
      return true;
    else
      return false;
  }
}