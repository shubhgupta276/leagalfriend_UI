import { Component, OnInit, Input } from '@angular/core';
import { KeyValue, ListBranch } from '../../../shared/Utility/util-common';
import { AddForInstitutionComponent } from './add-for-institution/add-for-institution.component';
import { EditForInstitutionComponent } from './Edit-for-institution/Edit-for-institution.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../../shared/services/storage.service';
import { InstitutionService } from '../institution.service';
import { Institution } from '../institution';
import { window } from 'rxjs/operator/window';

declare let $;
@Component({
    selector: 'app-for-institution',
    templateUrl: './for-institution.component.html',
    styleUrls: ['./for-institution.component.css']
})

export class ForInstitutionComponent implements OnInit {

    arInstitution = [
        { id: 1, institutionName: 'Axis Bank Ltd' },
        { id: 2, institutionName: 'HDFC Bank Ltd' },
    ];
    arListBranch: KeyValue[] = ListBranch;
     InstitutionValue: string = this.arInstitution[0].institutionName;
    BranchValue: string = this.arListBranch[0].name;
    arr: Institution[] = [];
    constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) { }

    ngOnInit() {

        $($.document).ready(function () {

            document.ondragover = document.ondragenter = function (evt) {
                    $('#addForInstitutionModal').modal('show');
                    evt.preventDefault();
            };

            document.getElementById("addForInstitutionModal").ondrop = function (evt) {
                $("#ERROR_casefile").hide();
                if(!validateFile(evt.dataTransfer.files[0].name))
                {
                    $("#ERROR_casefile").show();
                }
                else {
                    $("#casefile")[0].files = evt.dataTransfer.files;
                    $("#ERROR_casefile").hide();
                }
                evt.preventDefault();
            };
            function validateFile(name:string)
            {
             var ext=name.substring(name.lastIndexOf('.'));
             if(ext.toLowerCase()=='.csv')
             {
              return true;
             }
             else 
             {
              return false;
             }
            }
        });
    }
    GetInstitutionDrpValue(data: string) {
        this.InstitutionValue = data;
    }
    GetBranchDrpValue(data: string) {
        this.BranchValue = data;
    }
    showEditInstitutionModal() {
        $('#editForInstitutionModal').modal('show');
    }
    GetAllForIntitution() {

        this._institutionService.getForInstitutions().subscribe(
            result => {
                if (result.httpCode == 200) {
                    // result.foreach(function(value)
                    //     {
                    //         this.arr.push(value);
                    //     })

                    for (var i = 0; i < result.institutions.length; i++) {
                        const obj = result.institutions[i];

                        this.arr.push({
                            institutionName: obj.institutionName,
                            branch: obj.branch,
                            reportType: obj.reportType,
                            uploadCases: obj.uploadCases,
                            uploadCaseFiles: obj.uploadCaseFiles,
                            caseId: obj.caseId,
                            stage: obj.stage,
                            courtCaseId: obj.courtCaseId,
                            legalCaseId: obj.legalCaseId,
                            lastHearingDate: obj.lastHearingDate,
                            nextHearingDate: obj.nextHearingDate,
                            loanAccountNumber: obj.loanAccountNumber,
                            compliance: obj.compliance,
                            recourse: obj.recourse,
                            region: obj.region,
                            location: obj.location,
                            productGroup: obj.productGroup,
                            customerName: obj.customerName,
                            DPDAsOnFilingDate: obj.DPDAsOnFilingDate,
                            dateOfFilingCase: obj.dateOfFilingCase,
                            courtPlace: obj.courtPlace,
                            lawyerName: obj.lawyerName,
                            stageInCourt: obj.stageInCourt,
                            orderReceivedDate: obj.orderReceivedDate,
                            rOStatus: obj.rOStatus,
                            arbitrationInitiated: obj.arbitrationInitiated,
                            repoFlag: obj.repoFlag,
                            legalManager: obj.legalManager,
                            closureDate: obj.closureDate,
                            totalAmtRecovered: obj.totalAmtRecovered,
                            caseFiledAgainst: obj.caseFiledAgainst,
                            DPDAsOnCurrentSystemDate: obj.DPDAsOnCurrentSystemDate,
                            caseCriticalityLevel: obj.caseCriticalityLevel,
                            parentID: obj.parentID,
                            generatedBy: obj.generatedBy,
                            uploadDocument: obj.uploadDocument,
                            groundForClosingFile: obj.groundForClosingFile,
                            disposedOffFileNo: obj.disposedOffFileNo,
                            state: obj.state,
                            product: obj.product,
                            POSAsOnFilingDate: obj.POSAsOnFilingDate,
                            NPAStageAsOnFilingDate: obj.NPAStageAsOnFilingDate,
                            caseType: obj.caseType,
                            courtName: obj.courtName,
                            amountInvolved: obj.amountInvolved,
                            caseStage: obj.caseStage,
                            previousHearingDate: obj.previousHearingDate,
                            NDOHNullReason: obj.NDOHNullReason,
                            receiverName: obj.receiverName,
                            ROExecutionDate: obj.ROExecutionDate,
                            arbitrationcaseID: obj.arbitrationcaseID,
                            remarks: obj.remarks,
                            caseStatus: obj.caseStatus,
                            closureReportingDate: obj.closureReportingDate,
                            accountStatus: obj.accountStatus,
                            POSAsOnCurrentSystemDate: obj.POSAsOnCurrentSystemDate,
                            NPAStageAsOnCurrentSystemDate: obj.NPAStageAsOnCurrentSystemDate,
                            type: obj.type,
                            childCase: obj.childCase,
                            completionDate: obj.completionDate,
                            id: obj.id
                        });

                    }
                    setTimeout(() => {
                        this.bindDatatable();
                    }, 1);

                }
                else {
                    console.log(result);
                }
            },
            err => {
                console.log(err);
                this.arr = [];

            });
    }

    bindDatatable() {
        var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
        var selectedPageLength = 15;

        var $table = $("#example1").DataTable({
            paging: true,
            lengthChange: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            lengthMenu: arLengthMenu,
            pageLength: selectedPageLength,
            oLanguage: {
                sLengthMenu: "Show _MENU_ rows",
                sSearch: "",
                sSearchPlaceholder: "Search..."
            },
            initComplete: function () {
                var tableid = "example1";
                var $rowSearching = $("#" + tableid + "_wrapper");
                $rowSearching.find(".row:eq(0)").hide();

                for (var i = 0; i < arLengthMenu[0].length; i++) {
                    $("#ddlLengthMenu").append("<option value=" + arLengthMenu[0][i] + ">" + arLengthMenu[1][i] + "</option>");
                }
                $("#ddlLengthMenu").val(selectedPageLength);

                $("#ddlLengthMenu").on("change", function () {
                    $rowSearching.find(".row:eq(0)").find("select").val($(this).val()).change();
                });
            }
        });

        $table.columns().every(function () {
            $('#txtSearch').on('keyup change', function () {
                if ($table.search() !== this.value) {
                    $table.search(this.value).draw();
                }
            });

            //start bank filter
            $("#ddlBank").on("change", function () {
                var status = $(this).val();
                if (status == "All") {
                    $table.columns(1).search("").draw();
                }
                else if ($table.columns(1).search() !== this.value) {
                    $table.columns(1).search(this.value).draw();
                }
            });
            //end bank filter

            //start caseid filter
            $("#ddlCaseID").on("change", function () {
                var status = $(this).val();
                if (status == "All") {
                    $table.columns(2).search("").draw();
                }
                else if ($table.columns(2).search() !== this.value) {
                    $table.columns(2).search(this.value).draw();
                }
            });
            //end caseid filter

            //start Recourse filter
            $("#ddlRecourse").on("change", function () {
                var status = $(this).val();
                if (status == "All") {
                    $table.columns(3).search("").draw();
                }
                else if ($table.columns(3).search() !== this.value) {
                    $table.columns(3).search(this.value).draw();
                }
            });
            //end Recourse filter

            //start Stage filter
            $("#ddlStage").on("change", function () {
                var status = $(this).val();
                if (status == "All") {
                    $table.columns(4).search("").draw();
                }
                else if ($table.columns(3).search() !== this.value) {
                    $table.columns(4).search(this.value).draw();
                }
            });
            //end Stage filter

            //Amount bank filter
            $("#ddlAmount").on("change", function () {
                var status = $(this).val();
                if (status == "All") {
                    $table.columns(5).search("").draw();
                }
                else if ($table.columns(5).search() !== this.value) {
                    $table.columns(5).search(this.value).draw();
                }
            });
            //end Amount filter
        });
    }

}



