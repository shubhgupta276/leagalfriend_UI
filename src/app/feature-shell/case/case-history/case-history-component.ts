import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Console } from '@angular/core/src/console';
import { AuthService } from '../../../auth-shell/auth-shell.service';
import { debounce } from 'rxjs/operators/debounce';
import { Input } from '@angular/core/src/metadata/directives';
import { CaseService } from '../case.service';
declare var $;

@Component({
  selector: 'app-history-case',
  templateUrl: '../case-history/case-history.component.html',
  providers: [AuthService]
})
export class CaseHistoryComponent implements OnInit {
  myDocument: File;
  htmlToAdd: string;
  arHistoryData: any = [];
  caseData: any;
  public caseHistoryForm: FormGroup;

  constructor(private fb: FormBuilder, private _caseService: CaseService, ) {
    this.creatForm();
  }

  creatForm() {
    this.caseHistoryForm = this.fb.group({
      remarks: [null, Validators.required]
    });
  }

  ngOnInit() {
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
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }

  showHistory(data) {
    this.caseData = data;
    this._caseService.getHistory(data.id).subscribe(
      (result) => {
        this.arHistoryData = result;
      },
      err => {
        console.log(err);
      }
    )
  }
}