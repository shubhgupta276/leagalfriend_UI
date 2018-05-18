import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
import { RecourseService } from '../../master/resource/recourse.service';

declare let $;
@Component({
    selector: 'app-for-institution',
    templateUrl: './for-institution.component.html',
    styleUrls: ['./for-institution.component.css'],
    providers: [RecourseService]
})

export class ForInstitutionComponent implements OnInit {

    arInstitution = [];
    arRecourse: any[] = [];
    InstitutionValue: any;
    recourseConfig: any;
    arr = [];
    checkboxCounter: number = 0;
    recourseFitler: any;
    $table: any;
    @ViewChild(AddForInstitutionComponent) _addForInstitution: AddForInstitutionComponent;
    constructor(private fb: FormBuilder,
        private _institutionService: InstitutionService, private _recourseService: RecourseService,
        private _storageService: StorageService) { }

    ngOnInit() {
        this.getInstitutionList();
        this.getRecourse();

        $($.document).ready(function () {

            document.ondragover = document.ondragenter = function (evt) {
                $('#addForInstitutionModal').modal('show');
                evt.preventDefault();
            };

            document.getElementById("addForInstitutionModal").ondrop = function (evt) {
                $("#ERROR_casefile").hide();
                if (!validateFile(evt.dataTransfer.files[0].name)) {
                    $("#ERROR_casefile").show();
                }
                else {
                    $("#casefile")[0].files = evt.dataTransfer.files;
                    $("#ERROR_casefile").hide();
                }
                evt.preventDefault();
            };
            function validateFile(name: string) {
                var ext = name.substring(name.lastIndexOf('.'));
                if (ext.toLowerCase() == '.csv') {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    }

    getInstitutionList() {

        this._institutionService.getInstitutionList().subscribe((result) => {

            if (result.httpCode == 200) {
                this.arInstitution = result.institutions;
                this.InstitutionValue = this.arInstitution[0];
                this.GetAllForIntitution();
            }
            else
                console.log(result);
        })
    }

    showEditInstitutionModal() {
        $('#editForInstitutionModal').modal('show');
    }

    changeInstitution() {
        this.GetAllForIntitution();
    }

    getRecourse() {

        this.recourseConfig = {
            displayKey: "recourseName",
            defaultText: "All Recourses",
            defaultTextAdd: true,
            showIcon: false,
            hideWhenOneItem: false
        }

        this._recourseService.getResources().subscribe(
            result => {

                if (result != null) {
                    this.arRecourse = result.recourses;
                }
                else
                    console.log(result);
            },
            err => {
                console.log(err);
                this.arRecourse = [];
            });
    }

    changeRecourse(data: any) {
        this.recourseFitler = data;
        this.filterDatatableData();

    }

    checkboxChange(checked) {
        this.checkboxCounter = (checked) ? this.checkboxCounter + 1 : this.checkboxCounter - 1;
    }

    GetAllForIntitution() {

        this._institutionService.getForInstitutions(this.InstitutionValue.id).subscribe(
            result => {

                for (var i = 0; i < result.length; i++) {
                    const obj = result[i];

                    this.arr.push({
                        accountStatus: obj.accountStatus,
                        advocateofEp: obj.advocateofEp,
                        amountInvolved: obj.amountInvolved,
                        appealUs34Filed: obj.appealUs34Filed,
                        arbitrationCaseId: obj.arbitrationCaseId,
                        arbitrationInitiated: obj.arbitrationInitiated,
                        arbitratorAppointed: obj.arbitratorAppointed,
                        assetDetails: obj.assetDetails,
                        auctionDate: obj.auctionDate,
                        awardAmount: obj.awardAmount,
                        awardCopyProvided: obj.awardCopyProvided,
                        awardDate: obj.awardDate,
                        bankName: obj.bankName,
                        caseCriticalityLevel: obj.caseCriticalityLevel,
                        caseFiledAgainst: obj.caseFiledAgainst,
                        caseId: obj.caseId,
                        caseStage: obj.caseStage,
                        caseStatus: obj.caseStatus,
                        caseType: obj.caseType,
                        chqNo1: obj.chqNo1,
                        chqNo2: obj.chqNo2,
                        chqNo3: obj.chqNo3,
                        closureDate: obj.closureDate,
                        closureReportingDate: obj.closureReportingDate,
                        coolingPeriodNoticeDate: obj.coolingPeriodNoticeDate,
                        courtCaseId: obj.courtCaseId,
                        courtName: obj.courtName,
                        courtPlace: obj.courtPlace,
                        customerName: obj.customerName,
                        dateOfConduct: obj.dateOfConduct,
                        disbursalDate: obj.disbursalDate,
                        dpdOnCurrentDate: obj.dpdOnCurrentDate,
                        dpdOnEpFilingDate: obj.dpdOnEpFilingDate,
                        dpdOnFilingDate: obj.dpdOnFilingDate,
                        dpdOnNoticeDate: obj.dpdOnNoticeDate,
                        ePCourtName: obj.ePCourtName,
                        ePCourtPlace: obj.ePCourtPlace,
                        executionCaseNo: obj.executionCaseNo,
                        executionFiled: obj.executionFiled,
                        executionFilingDate: obj.executionFilingDate,
                        fileName: obj.fileName,
                        filingDate: obj.filingDate,
                        generatedBy: obj.generatedBy,
                        guarantorsName: obj.guarantorsName,
                        id: obj.id,
                        institutionId: obj.institutionId,
                        lawyerName: obj.lawyerName,
                        legalCaseId: obj.legalCaseId,
                        legalManager: obj.legalManager,
                        loanAccountNumber: obj.loanAccountNumber,
                        loanAmount: obj.loanAmount,
                        location: obj.location,
                        ndohNullReason: obj.ndohNullReason,
                        nextActionDate: obj.nextActionDate,
                        nextActionPlan: obj.nextActionPlan,
                        nextHearingDate: obj.nextHearingDate,
                        noticeAmount: obj.noticeAmount,
                        noticeDate: obj.noticeDate,
                        noticeDateAppointmentArbitrator: obj.noticeDateAppointmentArbitrator,
                        noticePostalRemarks: obj.noticePostalRemarks,
                        noticeReferenceNumber: obj.noticeReferenceNumber,
                        noticeSentDate: obj.noticeSentDate,
                        noticeType: obj.noticeType,
                        npaStageOnCurrentDate: obj.npaStageOnCurrentDate,
                        npaStageOnEpFilingDate: obj.npaStageOnEpFilingDate,
                        npaStageOnFilingDate: obj.npaStageOnFilingDate,
                        npaStageOnNoticeDate: obj.npaStageOnNoticeDate,
                        orderReceivedDate: obj.orderReceivedDate,
                        overdueAmtOnNoticeDate: obj.overdueAmtOnNoticeDate,
                        parentId: obj.parentId,
                        peacefulPossessionNoticeDate: obj.peacefulPossessionNoticeDate,
                        physicalPossessionDate: obj.physicalPossessionDate,
                        policeComplaintFiledDate: obj.policeComplaintFiledDate,
                        posOnCurrentDate: obj.posOnCurrentDate,
                        posOnEpFilingDate: obj.posOnEpFilingDate,
                        posOnFilingDate: obj.posOnFilingDate,
                        posOnNoticeDate: obj.posOnNoticeDate,
                        previousHearingDate: obj.previousHearingDate,
                        product: obj.product,
                        productGroup: obj.productGroup,
                        publicationDatePhysicalPossessionNotice: obj.publicationDatePhysicalPossessionNotice,
                        receiveOrderStatus: obj.receiveOrderStatus,
                        receiverName: obj.receiverName,
                        receiverOrderAppliedDate: obj.receiverOrderAppliedDate,
                        receiverOrderReceivedDate: obj.receiverOrderReceivedDate,
                        recieveOrderApplied: obj.recieveOrderApplied,
                        recourse: obj.recourse,
                        region: obj.region,
                        remarks: obj.remarks,
                        repoFlag: obj.repoFlag,
                        reservePrice: obj.reservePrice,
                        saleDate: obj.saleDate,
                        saleNoticeDate: obj.saleNoticeDate,
                        saleNoticePublicationDate: obj.saleNoticePublicationDate,
                        sec9Applied: obj.sec9Applied,
                        sec9LegalCaseId: obj.sec9LegalCaseId,
                        sec14FilingDate: obj.sec14FilingDate,
                        sec17OrderApplied: obj.sec17OrderApplied,
                        sec17OrderAppliedDate: obj.sec17OrderAppliedDate,
                        sec17OrderReceivedDate: obj.sec17OrderReceivedDate,
                        sec17OrderStatus: obj.sec17OrderStatus,
                        sec132NoticeDate: obj.sec132NoticeDate,
                        sec132NoticePostalRemarks: obj.sec132NoticePostalRemarks,
                        sec132PublicationDate: obj.sec132PublicationDate,
                        sec134NoticePostalRemarks: obj.sec134NoticePostalRemarks,
                        sec134PublicationDate: obj.sec134PublicationDate,
                        serveDate: obj.serveDate,
                        settlementAmt: obj.settlementAmt,
                        spdcNoticeAckRemarks: obj.spdcNoticeAckRemarks,
                        spdcNoticeServiceDate: obj.spdcNoticeServiceDate,
                        stageInCourt: obj.stageInCourt,
                        state: obj.state,
                        symbolicPossessionDate: obj.symbolicPossessionDate,
                        totalAmtRecovered: obj.totalAmtRecovered,
                        transmissionRequired: obj.transmissionRequired,
                        type: obj.type,
                        valuationAmount: obj.valuationAmount,
                        valuationDate: obj.valuationDate,
                        whetherCustomerAttended: obj.whetherCustomerAttended,
                    });
                }

                setTimeout(() => {
                    this.bindDatatable();
                }, 100);
            },
            err => {
                console.log(err);
                this.arr = [];

            });
    }

    bindDatatable() {
        var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
        var selectedPageLength = 15;


        let $table = $("#example1").DataTable({
            "bDestroy": true,
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
        this.$table = $table;
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

    filterDatatableData() {
        let $table = this.$table;
        let $this = this;
        $table.columns().every(function () {
            // start recourse filter
            if ($this.recourseFitler == null || $this.recourseFitler == undefined) {
                $table.columns(9).search("").draw();
            }
            else if ($table.columns(9).search() !== $this.recourseFitler.recourseCode) {
                $table.columns(9).search($this.recourseFitler.recourseCode).draw();
            }
            //end recourse filter
        });
    }

    resetAllFilter() {
        this.recourseFitler = null;
    }
    openPopup() {
        this._addForInstitution.bindBranch();
    }
}



