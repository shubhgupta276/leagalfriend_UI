import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../../shared/services/shared.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { forInstitutionTableConfig } from './for-intitution-config';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';
import { saveAs } from 'file-saver';
import { StageService } from '../../master/stage/stage.service';
declare let $;
@Component({
    selector: 'app-for-institution',
    templateUrl: './for-institution.component.html',
    styleUrls: ['./for-institution.component.css'],
    providers: [RecourseService]
})

export class ForInstitutionComponent implements OnInit {
    tableInputData = [];
    actionColumnConfig: ActionColumnModel;
    columns = forInstitutionTableConfig;
    rowSelect = true;
    hoverTableRow = true;
    showSearchFilter = true;
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
    filterTypeId: any;
    hoveredIndex: number;
    newHiringdata: any;
    lastHiringdata: any;
    branchData: any;
    branchSubscription: Subscription;
    @ViewChild(AddForInstitutionComponent) _addForInstitution: AddForInstitutionComponent;
    @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
    isPageLoad: boolean = true;
    selectedRowsCheckbox: any;
    constructor(private fb: FormBuilder,
        private _router: Router,
        private _institutionService: InstitutionService,
        private _recourseService: RecourseService,
        private _sharedService: SharedService,
        private _storageService: StorageService) { }

    ngOnInit() {
        this.setActionConfig();
        this.getInstitutionList();
        this.bindFilterType();
        this.branchSubscription = this._sharedService.getHeaderBranch().subscribe(data => {
            if (!this.isPageLoad) {
                this.GetAllForIntitution();
            }
            this.isPageLoad = false;
        });
        this.getRecourse();
        const selfnew = this;
        $($.document).ready(function () {

            document.ondragover = document.ondragenter = function (evt) {
                $('#addForInstitutionModal').modal('show');
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
                selfnew.updateNewHearingDate($(this).val(), isNewHearingDate);
            });
        });
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
                this.InstitutionValue = this.arInstitution.find(x => x.defaultInstitution);
                this.GetAllForIntitution();

                this.institutionConfig = {
                    displayKey: 'institutionName',
                    showFirstSelected: true,
                    showFirstSelectedValue: this.InstitutionValue,
                    showFirstSelectedKey: "id",
                    defaultTextAdd: false,
                    showIcon: false,
                    hideWhenOneItem: false
                }
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
        this.resetAllFilter();
        this.GetAllForIntitution();
    }

    getRecourse() {

        this.recourseConfig = {
            displayKey: 'recourseName',
            defaultText: 'All Recourses',
            defaultTextAdd: true,
            showIcon: false,
            hideWhenOneItem: false
        }

        this._recourseService.getResources().subscribe(
            result => {

                if (result != null) {
                    this.arRecourse = result.recourses;
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
        this.dataTableComponent.sortTable((this.recourseFilter === undefined) ? '' : this.recourseFilter.recourseCode, 'recourse');
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
        this.branchData = this._storageService.getBranchData();
        this.tableInputData = [];
        if (this.branchData) {
            this._institutionService.getAllForInstitutions(this.InstitutionValue.id, this.branchData.id).subscribe(
                result => {
                    for (let i = 0; i < result.length; i++) {
                        const obj = result[i];
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

                    this.dataTableComponent.ngOnInit();
                },
                err => {
                    console.log(err);
                    this.tableInputData = [];
                });
        }
    }

    onRowClick(event) {
        console.log(event);
    }

    onRowDoubleClick(event) {
        this._router.navigate(['/admin/institution/editforinstitution/' + event.institutionId + '/' + event.id]);
    }

    onRowSelect(event) {
        this.selectedRowsCheckbox = event;
    }

    onActionBtnClick(event) {
        if (event.eventType === 'edit') {
            this._router.navigate(['/admin/institution/editforinstitution/' + event.data.institutionId + '/' + event.data.id]);
        }
    }

    bindDatatable() {

        const arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, 'All']];
        const selectedPageLength = 15;

        const $table = $('#example1').DataTable({
            destroy: true,
            paging: true,
            lengthChange: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            lengthMenu: arLengthMenu,
            pageLength: selectedPageLength,
            oLanguage: {
                sLengthMenu: 'Show _MENU_ rows',
                sSearch: '',
                sSearchPlaceholder: 'Search...'
            },
            initComplete: function () {
                const tableid = 'example1';
                const $rowSearching = $('#' + tableid + '_wrapper');
                $rowSearching.find('.row:eq(0)').hide();

                for (let i = 0; i < arLengthMenu[0].length; i++) {
                    $('#ddlLengthMenu').append('<option value=' + arLengthMenu[0][i] + '>' + arLengthMenu[1][i] + '</option>');
                }
                $('#ddlLengthMenu').val(selectedPageLength);

                $('#ddlLengthMenu').on('change', function () {
                    $rowSearching.find('.row:eq(0)').find('select').val($(this).val()).change();
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

            // start Recourse filter
            $('#ddlRecourse').on('change', function () {
                const status = $(this).val();
                if (status === 'All') {
                    $table.columns(3).search('').draw();
                } else if ($table.columns(3).search() !== this.value) {
                    $table.columns(3).search(this.value).draw();
                }
            });
            // end Recourse filter
        });
    }

    filterDatatableData() {
        const $table = this.$table;
        const $this = this;

        let dateColFilter = null;

        $table.columns().every(function () {
            // start recourse filter
            if ($this.recourseFilter == null || $this.recourseFilter == undefined) {
                $table.columns(9).search('').draw();
            } else if ($table.columns(9).search() !== $this.recourseFilter.recourseCode) {
                $table.columns(9).search($this.recourseFilter.recourseCode).draw();
            }
            // end recourse filter
        });
        setTimeout(() => {
            filterDates();
        }, 200);


        function filterDates() {

            $.fn.dataTableExt.afnFiltering.push(
                function (oSettings, data, iDataIndex) {

                    if ($this.filterTypeId && $this.filterTypeId > 0) {

                        if ($this.filterTypeId === 1) { // Next Hearing Date
                            dateColFilter = 6;
                        } else if ($this.filterTypeId === 2) { // Last Hearing Date
                            dateColFilter = 5;
                        } else if ($this.filterTypeId === 3) { // Case Created Date
                            dateColFilter = 10;
                        } else if ($this.filterTypeId === 4) { // Last Updated Date
                            dateColFilter = 11;
                        }

                        const fromToDate = $('#txtFromToDate').val();
                        if (dateColFilter && fromToDate && fromToDate.length > 0) {
                            const arDates = fromToDate.split(' To ');

                            let _startDate = null, _endDate = null;
                            let _filterDate = data[dateColFilter];

                            if (_filterDate && _filterDate.trim().length > 0) {
                                _filterDate = $this.convertDateToDDMMYYYY(data[dateColFilter]);

                                if (arDates.length > 1) {
                                    _startDate = $this.convertDateToDDMMYYYY(arDates[0]);
                                    _endDate = $this.convertDateToDDMMYYYY(arDates[1]);
                                }

                                if ((_filterDate >= _startDate && _filterDate <= _endDate)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        }
                        return true;
                    } else {
                        return true;
                    }
                }
            );

            $table.draw();
        }

    }

    convertDateToDDMMYYYY(dateStr) {
        return new Date(dateStr.split('-')[2], dateStr.split('-')[1] - 1, dateStr.split('-')[0]);
    }

    resetAllFilter() {
        $('#txtFromToDate').val('');
        this.showDateFilter = false;
        this.filterTypeId = 0;
        this.recourseFilter = null;
    }

    openPopup() {
        this._addForInstitution.bindBranch();
    }

    onShowCalendar(items) {
        this.newHiringdata = items;
    }

    updateNewHearingDate(date, isNewHearingDate) {
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
                    obj.nextHearingDate = this._sharedService.convertDateToStr(obj.nextHearingDate);
                    obj.previousHearingDate = this._sharedService.convertDateToStr(obj.previousHearingDate);
                    $.toaster({ priority: 'success', title: 'Success', message: "Date Update Successfully." });
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
        var arrInsitituionId = [];
        if (this.selectedRowsCheckbox.length > 0) {
            this.selectedRowsCheckbox.forEach(item => {
                arrInsitituionId.push(item.id);
            });
        }
        var data = {
            branchId: this.branchData.id,
            institutionId: this.InstitutionValue.id,
            institutionalCaseIds: arrInsitituionId

        };
        this._institutionService.exportCase(data).subscribe(
            (result) => {
                let blob = new Blob([result]);
                saveAs(blob, "file.csv");
            },
            err => {
                console.log(err);
            })


    }
}

