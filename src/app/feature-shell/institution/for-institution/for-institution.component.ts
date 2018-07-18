import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { KeyValue, ListBranch } from '../../../shared/Utility/util-common';
import { AddForInstitutionComponent } from './add-for-institution/add-for-institution.component';
import { EditForInstitutionComponent } from './Edit-for-institution/Edit-for-institution.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../../shared/services/storage.service';
import { InstitutionService } from '../institution.service';
import { Institution } from '../institution';
import { window } from 'rxjs/operator/window';
import { RecourseService } from '../../master/resource/recourse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../../shared/services/shared.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { forInstitutionTableConfig } from './for-intitution-config';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';
import { saveAs } from 'file-saver';
import { StageService } from '../../master/stage/stage.service';
import { HistoryForInstitutionComponent } from './history-for-institution/history-for-institution.component';
declare let $;
@Component({
    selector: 'app-for-institution',
    templateUrl: './for-institution.component.html',
    styleUrls: ['./for-institution.component.css'],
    providers: [RecourseService],
    encapsulation: ViewEncapsulation.None
})

export class ForInstitutionComponent implements OnInit {
    tableInputData = [];
    actionColumnConfig: ActionColumnModel;
    columns = forInstitutionTableConfig;
    completeCaseColumns: any;
    rowSelect = true;
    hoverTableRow = true;
    showSearchFilter = false;
    arInstitution = [];
    arRecourse: any[] = [];
    InstitutionValue: any;
    recourseConfig: any;
    institutionConfig: any;
    checkboxCounter: number = 0;
    recourseFilter: any;
    $table: any;
    rowIndex: number;
    arFilterType: any = [];
    showDateFilter: boolean = false;
    filterTypeId: any = 0;
    hoveredIndex: number;
    newHiringdata: any;
    lastHiringdata: any;
    branchData: any;
    branchSubscription: Subscription;
    @ViewChild(AddForInstitutionComponent) _addForInstitution: AddForInstitutionComponent;
    @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
    isPageLoad: boolean = true;
    selectedRowsCheckbox: any;
    isFilterApplied: boolean = false;
    isRunningCaseTabOpen: boolean = true;
    queryInstitutionId: any;
    queryRecourseId: any;
    isViewOnlyForUser: boolean = false;
    @ViewChild(HistoryForInstitutionComponent) historyChild: HistoryForInstitutionComponent;
    constructor(private fb: FormBuilder,
        private _router: Router,
        private _institutionService: InstitutionService,
        private _recourseService: RecourseService,
        private _sharedService: SharedService,
        private _activatedRoute: ActivatedRoute,
        private _storageService: StorageService) {

        this._activatedRoute.params.subscribe((params) => {
            this.queryInstitutionId = params.institutionId;
            this.queryRecourseId = params.recourseId;
        });
        if (_router.url.includes('/againstinstitution')) {
            _institutionService.isAgainstInstitution = true;
        } else {
            _institutionService.isAgainstInstitution = false;
        }
    }

    ngOnInit() {
        this.isViewOnlyForUser = this._sharedService.isViewOnly();
        this.showHideColumns(true);
        this.getRecourse();
        this.setActionConfig();
        this.bindInstitutionBranchAccordingUser();
        this.bindFilterType();
        this.branchSubscription = this._sharedService.getHeaderBranch().subscribe(data => {
            if (this.branchData) {
                this.GetAllForIntitution();
            }
        });

        const selfnew = this;
        $($.document).ready(function () {
            if (!selfnew.isViewOnlyForUser) {
                document.ondragover = document.ondragenter = function (evt) {
                    if (evt.dataTransfer.types[0].indexOf('text/') < 0) {
                        $('#addForInstitutionModal').modal('show');
                    }
                    evt.preventDefault();
                };

                document.getElementById('addForInstitutionModal').ondrop = function (evt) {
                    $('#ERROR_casefile').hide();
                    if (!validateFile(evt.dataTransfer.files[0].name)) {
                        $('#ERROR_casefile').show();
                    } else {
                        $('#casefile')[0].files = evt.dataTransfer.files;
                        $('#ERROR_casefile').hide();
                    }
                    evt.preventDefault();
                };
            }
            function validateFile(name: string) {
                const ext = name.substring(name.lastIndexOf('.'));
                if (ext.toLowerCase() === '.csv') {
                    return true;
                } else {
                    return false;
                }
            }

            $('#txtFromToDate').daterangepicker({
                autoUpdateInput: false,
                locale: {
                    format: 'DD MMM YYYY'
                }
            }, function (start_date, end_date) {
                $('#txtFromToDate').val(start_date.format('DD MMM YYYY') + ' To ' + end_date.format('DD MMM YYYY'));
            });

            $('body').on('change', '.newHiringDate,.lastHiringDate', function (evt) {
                const isNewHearingDate = $(evt.target).hasClass('newHiringDate');
                selfnew.updateNewHearingDate($(this), isNewHearingDate);
            });
        });
    }

    bindInstitutionBranchAccordingUser() {
        if (!this.isViewOnlyForUser) {
            this.getInstitutionList();
        } else {
            const userDetail = this._storageService.getUserDetails();
            if (userDetail.institution) {
                this.InstitutionValue = userDetail.institution;
            }
            if (userDetail.branch) {
                this.branchData = userDetail.branch;
            }
            this.GetAllForIntitution();
        }
    }

    filterTypeChange(id: number) {

        this.filterTypeId = Number(id);
        if (this.filterTypeId === 0) {
            $('#txtFromToDate').val('');
        }
        if (this.filterTypeId === 1 || this.filterTypeId === 2 || this.filterTypeId === 3 || this.filterTypeId === 4) {
            this.showDateFilter = true;
        } else {
            this.showDateFilter = false;
        }
    }

    getInstitutionList() {
        this._institutionService.getInstitutionList().subscribe((result) => {
            if (result.httpCode === 200) {
                this.arInstitution = result.institutions;

                if (this.queryInstitutionId) {
                    this.InstitutionValue = this.arInstitution.find(x => x.id == this.queryInstitutionId);
                } else {
                    this.InstitutionValue = this.arInstitution.find(x => x.defaultInstitution);
                    if (!this.InstitutionValue) {
                        this.InstitutionValue = this.arInstitution[0];
                    }
                }
                this.GetAllForIntitution();

                this.institutionConfig = {
                    displayKey: 'institutionName',
                    showFirstSelected: true,
                    showFirstSelectedValue: this.InstitutionValue,
                    showFirstSelectedKey: 'id',
                    defaultTextAdd: false,
                    showIcon: false,
                    hideWhenOneItem: false
                };
            } else {
                console.log(result);
            }
        });
    }

    showEditInstitutionModal() {
        $('#editForInstitutionModal').modal('show');
    }

    changeInstitution(data: any) {
        this.InstitutionValue = data;
        if (!this.isPageLoad) {
            this.resetAllFilter();
            this.GetAllForIntitution();
        }
    }

    getRecourse() {

        this._recourseService.getResources().subscribe(
            result => {

                if (result != null) {
                    this.arRecourse = result.recourses;
                    if (this.queryRecourseId && this.arRecourse.length > 0) {
                        this.recourseFilter = this.arRecourse.find(x => x.id == this.queryRecourseId);

                        this.recourseConfig = {
                            displayKey: 'recourseName',
                            defaultText: 'All Recourses',
                            defaultTextAdd: true,
                            showIcon: false,
                            hideWhenOneItem: false,
                            showFirstSelected: true,
                            showFirstSelectedValue: this.recourseFilter,
                            showFirstSelectedKey: 'id',
                        };
                    } else {
                        this.recourseConfig = {
                            displayKey: 'recourseName',
                            defaultText: 'All Recourses',
                            defaultTextAdd: true,
                            showIcon: false,
                            hideWhenOneItem: false
                        }
                    }
                } else {
                    console.log(result);
                }
            },
            err => {
                console.log(err);
                this.arRecourse = [];
            });
    }

    bindFilterType() {
        this.arFilterType.push(
            { value: 0, text: 'No Filter' },
            { value: 1, text: 'Next Hearing Date' },
            { value: 2, text: 'Last Hearing Date' },
            { value: 3, text: 'Case Created Date' },
            { value: 4, text: 'Last Update Date' },
            { value: 5, text: 'Compliance' });
    }

    filterTable() {

        this.dataTableComponent.sortTable((this.recourseFilter === undefined || this.recourseFilter === null)
            ? '' : this.recourseFilter.recourseCode, 'recourse');
        if (this.filterTypeId === 0) {
            this.dataTableComponent.resetDateFilter();
        } else {
            const fromToDate = $('#txtFromToDate').val().split(' To ');
            if (this.filterTypeId === 1) { // Next Hearing Date
                this.dataTableComponent.dateRangeFilter(this._sharedService.convertStrToDate(fromToDate[0]),
                    this._sharedService.convertStrToDate(fromToDate[1]), 'nextHearingDate');
            } else if (this.filterTypeId === 2) { // Last Hearing Date
                this.dataTableComponent.dateRangeFilter(this._sharedService.convertStrToDate(fromToDate[0]),
                    this._sharedService.convertStrToDate(fromToDate[1]), 'previousHearingDate');
            } else if (this.filterTypeId === 3) { // Case Created Date
                this.dataTableComponent.dateRangeFilter(this._sharedService.convertStrToDate(fromToDate[0]),
                    this._sharedService.convertStrToDate(fromToDate[1]), 'createdDate');
            } else if (this.filterTypeId === 4) { // Last Update Date
                this.dataTableComponent.dateRangeFilter(this._sharedService.convertStrToDate(fromToDate[0]),
                    this._sharedService.convertStrToDate(fromToDate[1]), 'lastUpdated');
            }
        }
    }

    search() {
        this.filterTable();
        if (this.filterTypeId > 0) {
            this.isFilterApplied = true;
        }
    }

    clickRunningCase() {
        this.showHideColumns(true);
        this.isRunningCaseTabOpen = true;
        this.GetAllForIntitution();
    }

    clickCompletedCase() {
        this.showHideColumns(false);
        this.isRunningCaseTabOpen = false;
        this.GetAllForIntitution();
    }

    showHideColumns(show) {
        this.columns.forEach(function (data) {
            if (data.uniqueId === 'nextHearingDate') {
                data.display = show;
            }
        });
    }

    resetAllFilter() {
        $('#txtFromToDate').val('');
        this.showDateFilter = false;
        this.filterTypeId = 0;
        // this.recourseFilter = null;
    }

    clearFilters() {
        this.isFilterApplied = false;
        this.resetAllFilter();
        this.filterTable();
    }

    changeRecourse(data: any) {
        this.recourseFilter = data;
        this.filterTable();
    }

    checkboxChange(checked) {
        this.checkboxCounter = (checked) ? this.checkboxCounter + 1 : this.checkboxCounter - 1;
    }

    setActionConfig() {
        this.actionColumnConfig = new ActionColumnModel();
        this.actionColumnConfig.displayName = 'Action';
        this.actionColumnConfig.showEdit = true;
        this.actionColumnConfig.showHistory = true;
    }

    GetAllForIntitution() {
        if (!this.isViewOnlyForUser) {
            this.branchData = this._storageService.getBranchData();
        }
        this.tableInputData = [];
        if (this.branchData) {
            this._institutionService.getAllForInstitutions(this.InstitutionValue.id, this.branchData.id).subscribe(
                result => {
                    this.isPageLoad = false;
                    for (let i = 0; i < result.length; i++) {
                        const obj = result[i];

                        if ((this.isRunningCaseTabOpen && !obj.completionDate)
                            || (!this.isRunningCaseTabOpen && obj.completionDate)) {
                            if (obj.compliance == null) {
                                obj.compliance = false;
                            }
                            this.tableInputData.push({
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
                                compliance: obj.compliance,
                                closureReportingDate: obj.closureReportingDate,
                                coolingPeriodNoticeDate: obj.coolingPeriodNoticeDate,
                                courtCaseId: obj.courtCaseId,
                                courtName: obj.courtName,
                                courtPlace: obj.courtPlace,
                                createdDate: obj.createdDate,
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
                                lastUpdated: obj.lastUpdated,
                                lawyerName: obj.lawyerName,
                                legalCaseId: obj.legalCaseId,
                                legalManager: obj.legalManager,
                                loanAccountNumber: obj.loanAccountNumber,
                                loanAmount: obj.loanAmount,
                                location: obj.location,
                                ndohNullReason: obj.ndohNullReason,
                                nextActionDate: obj.nextActionDate,
                                nextActionPlan: obj.nextActionPlan,
                                nextHearingDate: this._sharedService.convertDateToStr(obj.nextHearingDate),
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
                                previousHearingDate: this._sharedService.convertDateToStr(obj.previousHearingDate),
                                product: obj.product,
                                productGroup: obj.productGroup,
                                publicationDatePhysicalPossessionNotice: obj.publicationDatePhysicalPossessionNotice,
                                receiveOrderStatus: obj.receiveOrderStatus,
                                receiverName: obj.receiverName,
                                receiverOrderAppliedDate: obj.receiverOrderAppliedDate,
                                receiverOrderReceivedDate: obj.receiverOrderReceivedDate,
                                recieveOrderApplied: obj.recieveOrderApplied,
                                recourse: obj.recourse,
                                recourseId: obj.recourseId,
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
                    }

                    this.dataTableComponent.ngOnInit();
                    setTimeout(() => {
                        this.filterTable();
                    }, 100);

                },
                err => {
                    console.log(err);
                    this.tableInputData = [];
                });
        }
    }

    applyFilter(filterValue: string) {
        this.dataTableComponent.applyFilter(filterValue);
    }

    onRowClick(event) {
        console.log(event);
    }

    onRowDoubleClick(event) {
        const recourseId = (this.recourseFilter) ? this.recourseFilter.id : '';
        const returnUrl = (this._institutionService.isAgainstInstitution)
            ? '/admin/institution/againstinstitution' : '/admin/institution/forinstitution';
        this._router.navigate(['/admin/institution/editforinstitution/' + event.institutionId
            + '/' + event.id, { recourseId: recourseId, returnUrl: returnUrl }]);
    }

    onRowSelect(event) {
        this.selectedRowsCheckbox = event;
    }

    onActionBtnClick(event) {
        if (event.eventType === 'edit') {
            this.onRowDoubleClick(event.data);
        } else if (event.eventType === 'history') {
            $('#modal-default1').modal('show');
            this.historyChild.showHistory(event.data);
        }
    }

    convertDateToDDMMYYYY(dateStr) {
        return new Date(dateStr.split('-')[2], dateStr.split('-')[1] - 1, dateStr.split('-')[0]);
    }

    openPopup() {
        this._addForInstitution.bindBranch();
    }

    onShowCalendar(items) {
        this.newHiringdata = items;
    }

    updateNewHearingDate(ref, isNewHearingDate) {
        const date = $(ref).val();

        const obj = this.tableInputData.find(x => x.id === this.newHiringdata.id);
        if (isNewHearingDate) {
            obj.nextHearingDate = this._sharedService.convertStrToDate(date);
            obj.previousHearingDate = this._sharedService.convertStrToDate(obj.previousHearingDate);
        } else {
            obj.previousHearingDate = this._sharedService.convertStrToDate(date);
            obj.nextHearingDate = this._sharedService.convertStrToDate(obj.nextHearingDate);
        }

        this._institutionService.updateHearingDate(obj).subscribe(
            (result) => {

                if (result.status === 200) {
                    $(ref).closest('mat-cell').animate({ backgroundColor: '#88d288' }, 100).animate({ backgroundColor: '' }, 2000);
                    if (!isNaN(obj.nextHearingDate.getTime())) {
                        obj.nextHearingDate = this._sharedService.convertDateToStr(obj.nextHearingDate);
                    } else {
                        obj.nextHearingDate = '';
                    }

                    if (!isNaN(obj.previousHearingDate.getTime())) {
                        obj.previousHearingDate = this._sharedService.convertDateToStr(obj.previousHearingDate);
                    } else {
                        obj.previousHearingDate = '';
                    }
                    $.toaster({ priority: 'success', title: 'Success', message: 'Date Update Successfully.' });
                }
            },
            err => {
            });
    }

    OnMouseHover(i) {
        if ($('.datepicker-dropdown').length === 0) {
            $('.newHiringDate').datepicker();
            this.hoveredIndex = i;
        }
    }

    hideCalendar() {
        if ($('.datepicker-dropdown').length === 0) {
            this.hoveredIndex = null;
        }
    }

    caseSaved() {
        this.GetAllForIntitution();
    }

    ExportCase() {
        const arrInsitituionId = [];
        if (this.selectedRowsCheckbox && this.selectedRowsCheckbox.length > 0) {
            this.selectedRowsCheckbox.forEach(item => {
                arrInsitituionId.push(item.id);
            });
        }
        const data = {
            branchId: this.branchData.id,
            institutionId: this.InstitutionValue.id,
            institutionalCaseIds: arrInsitituionId

        };
        this._institutionService.exportCase(data).subscribe(
            (result) => {
                const blob = new Blob([result]);
                saveAs(blob, 'file.csv');
            },
            err => {
                console.log(err);
            });
    }
}

