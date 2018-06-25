import { Component, OnInit, ViewChild } from '@angular/core';
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
declare var $;

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css'],
    // providers: [BillingService]
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
    selectedRowsCheckbox: any;
    @ViewChild(EditBillingComponent) editChild: EditBillingComponent;
    @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
    constructor(private _billingservice: BillingService,
        private _institutionService: InstitutionService,
        private _recourseService: RecourseService,
        private _sharedService: SharedService) {
        this.JSON = JSON;
    }
    ngOnInit() {
        const self = this;
        this.setActionConfig();
        this.getBillingData();
        this.setDropdownUniqueValues();
        this.getAllInstitutions();
        this.getAllRecourses();
        $($.document).ready(function () {
            $('#reservation').daterangepicker({
                autoApply: true,
                locale: {
                    format: 'MM-DD-YYYY'
                }

            });


        });
    }
    SearchFilter() {
        var self = this;
        var bankVal = $('#ddlBank1').val();
        // start recourse filter
        if (bankVal == "All") {
            self.$table.columns(2).search("").draw();
        }
        else if (self.$table.columns(2).search() !== bankVal) {
            self.$table.columns(2).search(bankVal).draw();
        }
        //     //end recourse filter
        $("#chkInvoice").show();
        self.$table.draw();
        $("#closebtnFilter").click();

    }


    CreateInvoice() {
        localStorage.setItem('invoiceDetails', JSON.stringify(this.selectedRowsCheckbox));
    }
    setDropdownUniqueValues() {
        for (var i = 0; i < this.arBillingData.length; i++) {
            var obj = this.arBillingData[i];

            if ($.inArray(obj.Bank, this.arListBanks) < 0)
                this.arListBanks.push(obj.Bank);

            if ($.inArray(obj.Recourse, this.arListRecourse) < 0)
                this.arListRecourse.push(obj.Recourse);

            if ($.inArray(obj.Stage, this.arListStage) < 0)
                this.arListStage.push(obj.Stage);

            if ($.inArray(obj.Amount, this.arListAmount) < 0)
                this.arListAmount.push(obj.Amount);

            if ($.inArray(obj.CaseID, this.arListCaseID) < 0)
                this.arListCaseID.push(obj.CaseID);

            if ($.inArray(obj.Branch, this.arListBranch) < 0)
                this.arListBranch.push(obj.Branch);

        }

    }

    getBillingData() {

        this._billingservice.getBilling().subscribe(
            result => {
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        const obj = result[i];
                        this.tableInputData.push({
                            id: obj.id,
                            institutionId: obj.institution.id,
                            institutionName: obj.institution.institutionName,
                            amount: obj.amount,
                            recourseName: obj.recourse.recourseName,
                            recourseId: obj.recourse.id,
                            stageId: obj.stage.id,
                            stageName: obj.stage.stageName,
                            userId: obj.userId,
                            caseId: obj.caseId,
                            billingDate: this._sharedService.convertDateToStr(obj.billingDate)
                        })
                    }
                    this.dataTableComponent.ngOnInit();
                    this.setDropdownUniqueValues();
                    setTimeout(() => {
                        //this.bindBillingGridPaging();
                        //  this.bindDatatable();
                    }, 1);
                }
                else {
                    console.log(result);
                }
            },
            err => {
                console.log(err);
                this.arBillingData = [];

            });

    }
    setActionConfig() {
        this.actionColumnConfig = new ActionColumnModel();
        this.actionColumnConfig.displayName = 'Action';
        this.actionColumnConfig.showEdit = true;
        this.actionColumnConfig.showHistory = true;
    }
    getAllRecourses() {
        this._recourseService.getResources().subscribe(
            result => {
                if (result.httpCode == 200) {
                    result.recourses.forEach(element => {
                        this.arAllRecourses.push(element);
                    });
                }
            })
    }
    getAllInstitutions() {

        this._institutionService.getInstitutions().subscribe(
            result => {
                if (result.httpCode == 200) {
                    result.institutions.forEach(element => {
                        this.arAllInstitution.push(element);
                    });

                }
            })
    }
    RemoveBilling(item) {
        if (!confirm("Are you sure you want to delete this record?")) {
            return false;
        }
        var billingId = '?billingId =' + item.id;
        this._billingservice.deleteBilling(billingId)
            .map(res => res)
            .subscribe(
                data => {
                    $.toaster({ priority: 'success', title: 'Success', message: "Record deleted successfully." });
                },
                error => console.log(error)
            );

    }
    showEditModal(data) {
        this.editChild.createForm(data);
        // this.editDetails = data;
        $('#editBillModal').modal('show');
    }
    onRowClick(event) {

    }
    onRowDoubleClick(event) {

    }
    onRowSelect(event) {
        this.selectedRowsCheckbox = event;
        if (this.selectedRowsCheckbox.length > 0) {
            this.isGenerateInvoice = true;
        }
        else {
            this.isGenerateInvoice = false;
        }
    }
    onActionBtnClick(event) {

    }
    searchFilter(value) {
        this.dataTableComponent.applyFilter(value);
    }
    resetTableFilter() {
        this.dataTableComponent.resetFilters();
    }
}
