import { Component, OnInit, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Console } from '@angular/core/src/console';
import { debounce } from 'rxjs/operators/debounce';
import { Input } from '@angular/core/src/metadata/directives';
import { CaseService } from '../../../case/case.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { AuthService } from '../../../../auth-shell/auth-shell.service';
import { InstitutionService } from '../../institution.service';
declare var $;

@Component({
    selector: 'history-for-institution-modal',
    templateUrl: './history-for-institution.component.html',
    styleUrls: ['./history-for-institution.component.css'],
    providers: [AuthService]
})
export class HistoryForInstitutionComponent implements OnInit {
    myDocument: File;
    @ViewChild('inputFileUpload') myFileUpload: any;
    arHistoryData: any[] = [];
    arHistoryFields: any[] = [];
    caseData: any;
    public caseHistoryForm: FormGroup;

    constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _sharedService: SharedService) {
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

            $(".time-label").click(function () {
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
        this._institutionService.addRemarkHistory(objEditCase).subscribe(
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
            { id: 'lastHearingDate', name: 'Last Hearing Date' },
            { id: 'nextHearingDate', name: 'Next Hearing Date' },
            { id: 'groundForClosingFile', name: 'Ground For Closing File' },
        );
    }

    clearForm() {
        this.myFileUpload.nativeElement.value = '';
    }

    showHistory(data) {
        this.clearForm();
        this.creatForm();
        this.arHistoryData = [];
        this.caseData = data;
        const $this = this;
        this._institutionService.getInsittutionCaseHistory(data.id).subscribe(
            (result) => {
                let arDates = [];
                let arDateWiseData = []
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
                                let previousValue = "";
                                if (arDateHistory[index + 1]) {
                                    previousValue = arDateHistory[index + 1][fieldData.id];
                                }

                                if (newValue != previousValue && index != arDateHistory.length - 1) {
                                    $this.arHistoryData.push({
                                        fieldName: fieldData.name,
                                        date: date,
                                        dateTime: data.revTimeStamp,
                                        user: '',
                                        newValue: newValue,
                                        preValue: previousValue, remark: data.remark
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
        );
    }
}