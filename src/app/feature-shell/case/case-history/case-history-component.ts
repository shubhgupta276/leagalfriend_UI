import { Component, OnInit, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Console } from '@angular/core/src/console';
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { debounce } from 'rxjs/operators/debounce';
import { Input } from '@angular/core/src/metadata/directives';
import { CaseService } from '../case.service';
import { SharedService } from '../../../shared/services/shared.service';
import { saveAs } from 'file-saver';
declare var $;

@Component({
  selector: 'app-history-case',
  templateUrl: '../case-history/case-history.component.html',
  styleUrls: ['../case-history/case-history-component.css'],
  providers: [AuthService]
})
export class CaseHistoryComponent implements OnInit {
  myDocument: File;
  @ViewChild('inputFileUpload') myFileUpload: any;
  arHistoryData: any[] = [];
  arHistoryFields: any[] = [];
  caseData: any;
  public caseHistoryForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService,
    private _caseService: CaseService, private _sharedService: SharedService) {
    this.creatForm();
  }

  creatForm() {
    this.caseHistoryForm = this.fb.group({
      remarks: [null, Validators.required]
    });
    this.myDocument = null;
  }

  ngOnInit() {
    this.setShowFieldArray();
    $(document).ready(function () {

      $("#dvHistory").click(function () {
        $("#dvHistoryRemark").toggle("Slow");
        if ($("#dvHistory").find("span").hasClass("glyphicon-plus")) {
          $("#dvHistory").find("span.clssign").addClass("glyphicon-minus");
          $("#dvHistory").find("span.clssign").removeClass("glyphicon-plus");
        }
        else {
          $("#dvHistory").find("span.clssign").addClass("glyphicon-plus");
          $("#dvHistory").find("span.clssign").removeClass("glyphicon-minus");
        }
      });
      $("#closebtn").click(function () {

        $("#dvHistoryRemark").hide();
      });

      $(".toggleCaseHistory").click(function () {
        if ($(".clsListDetails").hasClass("in")) {
          $(this).find("span.clssign").addClass("glyphicon-plus");
          $(this).find("span.clssign").removeClass("glyphicon-minus");
        }
        else {
          $(this).find("span.clssign").addClass("glyphicon-minus");
          $(this).find("span.clssign").removeClass("glyphicon-plus");
        }
      });
    });
  }

  showHideToggleIcon($event) {
    let $child = $($event.target);
    if (!$child.hasClass('clssign')) {
      $child = $child.find('.clssign');
    }
    if ($child.hasClass('glyphicon-plus')) {
      $child.removeClass("glyphicon-plus");
      $child.addClass("glyphicon-minus");
    }
    else {
      $child.removeClass("glyphicon-minus");
      $child.addClass("glyphicon-plus");
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.myDocument = event.target.files[0];
    };
  }

  SubmitRemarks(data) {
    let objEditCase: FormData = new FormData();
    objEditCase.append('caseId', this.caseData.id);
    objEditCase.append('remark', data.remarks);
    objEditCase.append('file', this.myDocument);
    this._caseService.addRemarkHistory(objEditCase).subscribe(
      result => {
        result = result.body;
        if (result.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
          this.showHistory(this.caseData);
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }

  setShowFieldArray() {
    this.arHistoryFields.push(
      { id: 'stage', name: 'Stage', },
      { id: 'remark', name: 'Remark', },
      { id: 'lastHearingDate', name: 'Last Hearing Date' },
      { id: 'nextHearingDate', name: 'Next Hearing Date' },
      { id: 'groundForClosingFile', name: 'Ground For Closing File' },
    );
  }

  clearForm() {
    this.myFileUpload.nativeElement.value = '';
  }

  downloadFile(data) {
    const file = data.file.split('~');
    this._authService.downloadFile(file[1]).subscribe(
      (result) => {
        const blob = new Blob([result]);
        saveAs(blob, file[0]);
      },
      err => {
        console.log(err);
      });
  }

  showHistory(historyData) {
    this.clearForm();
    this.creatForm();
    this.arHistoryData = [];
    this.caseData = historyData;
    const $this = this;
    this._caseService.getHistory(historyData.id).subscribe(
      (result) => {
        const arDates = [];
        const arDateWiseData = [];
        if (result && result.length > 0) {
          result = $this._sharedService.reverseArray(result);
          result.forEach(function (data, index) { // get all distinct dates & fill date wise data
            const date = $this._sharedService.convertDateToStr(data.revTimeStamp);
            if (arDates.indexOf(date) < 0) {
              arDates.push(date);
              arDateWiseData[date] = [];
            }
            arDateWiseData[date].push(data);
          });

          arDates.forEach(function (date) {

            const arDateHistory = arDateWiseData[date];
            arDateHistory.forEach(function (data, index) {

              $this.arHistoryFields.forEach(function (fieldData) {
                const newValue = data[fieldData.id];
                let previousValue = '';
                if (arDateHistory[index + 1]) {
                  previousValue = arDateHistory[index + 1][fieldData.id];
                }

                if (newValue !== previousValue && index !== arDateHistory.length - 1) {
                  $this.arHistoryData.push({
                    fieldName: fieldData.name,
                    date: date,
                    dateTime: data.revTimeStamp,
                    user: data.firstName + ' ' + data.lastName,
                    newValue: newValue,
                    preValue: previousValue,
                    remark: data.remark,
                    file: data.remarkFile
                  });
                }
              });
            });
          });
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}