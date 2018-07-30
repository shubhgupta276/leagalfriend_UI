import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { parse } from 'url';
import { Jsonp } from '@angular/http/src/http';
import { BillingService } from './billing.service';
import { EditBillingComponent } from './edit-bill/edit-bill.component'
import { RecourseService } from '../master/resource/recourse.service';
import { InstitutionService } from '../master/institution/institution.service';
import { billingTableConfig } from './billing.config';
import { ActionColumnModel } from '../../shared/models/data-table/action-column.model';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { SharedService } from '../../shared/services/shared.service';
import { StorageService } from '../../shared/services/storage.service';
declare var $;

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BillingComponent implements OnInit {
    tableInputData = [];
    actionColumnConfig: ActionColumnModel;
    columns = billingTableConfig;
    rowSelect = true;
    hoverTableRow = true;
    showSearchFilter = false;
    arBillingData: any[] = [];
    arListBanks: any[] = [];
    arListRecourse: any[] = [];
    arListStage: any[] = [];
    arListAmount: any[] = [];
    arListCaseID: any[] = [];
    arListBranch: any[] = [];
    arAllRecourses: any[] = [];
    arAllInstitution: any = [];
    JSON: any;
    $table: any;
    isGenerateInvoice = false;
    isInstitutionalTab: boolean = true;
    hideInstitutional: boolean = false;
    selectedRowsCheckbox: any;
    @ViewChild(EditBillingComponent) editChild: EditBillingComponent;
    @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
    moduleName = 'Billing';
    searchTextbox = '';
    constructor(private _billingservice: BillingService,
        private _institutionService: InstitutionService,
        private _recourseService: RecourseService,
        private _storageService: StorageService,
        private _sharedService: SharedService) {
        this.JSON = JSON;
        if (_storageService.getPermissionLevel() === 'ADMIN_LAWYER') {
            this.clickIndividual();
            this.hideInstitutional = true;
        }
    }
    ngOnInit() {
        this.setActionConfig();
        const self = this;
        this.getAllInstitutions();
        this.getAllRecourses();
        $($.document).ready(function () {
            $('#reservation').daterangepicker({
                autoUpdateInput: false,
                locale: {
                    format: 'DD MMM YYYY'
                }
            }, function (start_date, end_date) {
                $('#reservation').val(start_date.format('DD MMM YYYY') + ' To ' + end_date.format('DD MMM YYYY'));
            });

        });
    }
    setActionConfig() {
        this.actionColumnConfig = new ActionColumnModel();
        this.actionColumnConfig.displayName = 'Action';
        this.actionColumnConfig.showCancel = true;
    }
    formatDate(date) {

        const arDate = date.split('-');
        const dd = arDate[0];
        const mm = arDate[1];
        const yy = arDate[2];
        return (yy + '-' + mm + '-' + dd);
    }
    filterBillingData() {
        const fromToDate = $('#reservation').val().split(' To ');
        if (fromToDate && fromToDate.length > 0) {
            this.dataTableComponent.dateRangeFilter(this._sharedService.convertStrToDate(fromToDate[0]),
                this._sharedService.convertStrToDate(fromToDate[1]), 'billingDate');
        } else {
            this.dataTableComponent.resetDateFilter();
        }

        $('#filterCaseModal').modal('hide');

    }
    clearFilters() {
        this.searchTextbox = '';
        this.dataTableComponent.resetFilters();
    }
    CreateInvoice() {
        this.selectedRowsCheckbox.forEach(item => {
            item.isInvoiceFirstLoad = true;
            item.isFromInvoice = false;
        });

        localStorage.setItem('invoiceDetails', JSON.stringify(this.selectedRowsCheckbox));
    }
    getBillingData() {
        this.tableInputData = [];
        this._billingservice.getBilling(this.isInstitutionalTab).subscribe(
            result => {
                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        const obj = result[i];
                        this.tableInputData.push({
                            id: obj.id,
                            institutionId: obj.institution == null ? null : obj.institution.id,
                            institutionName: obj.institution == null ? null : obj.institution.institutionName,
                            amount: obj.amount,
                            recourseName: obj.recourse.recourseName,
                            recourseId: obj.recourse.id,
                            stageId: obj.stage.id,
                            stageName: obj.stage.stageName,
                            userId: obj.userId,
                            caeId: obj.caseId,
                            billingDate: this._sharedService.convertDateToStr(obj.billingDate)
                        });
                    }
                    this.dataTableComponent.ngOnInit();
                    if (this.arAllInstitution.length > 0) {
                        const defaultInst = this.arAllInstitution.find(x => x.defaultInstitution);
                        const objFindInst = this.tableInputData.find(x => x.institutionName === defaultInst.institutionName);
                        let showInstitution = '';
                        if (objFindInst) {
                            showInstitution = objFindInst.institutionName;
                        } else {
                            showInstitution = this.tableInputData[0].institutionName;
                        }
                        this.dataTableComponent.sortTable(showInstitution, 'institutionName');
                    }
                } else {
                    this.dataTableComponent.ngOnInit();
                    console.log(result);
                }
            },
            err => {
                console.log(err);
                this.arBillingData = [];

            });

    }
    getAllRecourses() {
        this._recourseService.getResources().subscribe(
            result => {
                if (result.httpCode === 200) {
                    result.recourses.forEach(element => {
                        this.arAllRecourses.push(element);
                    });
                }
            });
    }
    getAllInstitutions() {
        this._institutionService.getInstitutions().subscribe(
            result => {
                if (result.httpCode === 200) {
                    result.institutions.forEach(element => {
                        this.arAllInstitution.push(element);
                    });
                    this.getBillingData();
                }
            });
    }
    showEditModal(data) {
        this.editChild.createForm(data);
        // this.editDetails = data;
        $('#editBillModal').modal('show');
    }
    onRowClick(event) {
        if (event) {
            if (confirm('Are you sure you want to delete this record?')) {
                this._billingservice.deleteBilling(event.id, this.isInstitutionalTab).subscribe(
                    (result) => {
                        const deleteIndex = this.tableInputData.findIndex(x => x.id === event.id);
                        this.tableInputData.splice(deleteIndex, 1);
                        this.dataTableComponent.ngOnInit();
                        $.toaster({ priority: 'success', title: 'Success', message: 'Deleted successfully.' });
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        }
    }
    onRowDoubleClick(event) {

    }
    onRowSelect(event) {
        this.selectedRowsCheckbox = event;
        if (this.selectedRowsCheckbox.length > 0) {
            this.isGenerateInvoice = true;
        } else {
            this.isGenerateInvoice = false;
        }
    }
    onActionBtnClick(event) {

    }
    searchFilter(value) {
        this.dataTableComponent.applyFilter(value);
    }
    clickInstitutional() {
        this.showTableColumns(true);
        this.isInstitutionalTab = true;
        this.getBillingData();
    }
    clickIndividual() {
        this.showTableColumns(false);
        this.isInstitutionalTab = false;
        this.getBillingData();
    }
    showTableColumns(show) {
        this.columns.forEach(function (data) {
            if (data.uniqueId === 'institutionName') {
                data.display = show;
            }
        });
    }
}
