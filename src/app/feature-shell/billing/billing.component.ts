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
    arrInvoiceDetails = [];
    arAllRecourses: any[] = [];
    arAllInstitution: any = [];
    JSON: any;
    $table: any;
    @ViewChild(EditBillingComponent) editChild: EditBillingComponent;
    @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
    constructor(private _billingservice: BillingService, private _institutionService: InstitutionService, private _recourseService: RecourseService, ) {
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
            $('#chkAllInvoice').change(function () {
                $('.chkInvoice').prop("checked", $(this).prop('checked'));
            });

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
    bindDatatable() {
        var self = this;
        var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
        var selectedPageLength = 15;

        this.$table = $("#example1").DataTable({
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

        self.$table.columns().every(function () {
            $('#txtSearch').on('keyup change', function () {
                if (self.$table.search() !== this.value) {
                    self.$table.search(this.value).draw();
                }
            });
        });

    }

    CreateInvoice() {
        var $this = this;
        $("#example1 tr").each(function (i) {
            var $row = $(this);
            if (i > 0) {
                if ($row.find("input[type=checkbox]").prop('checked')) {
                    var item = JSON.parse($row.find('#hfItem').val());
                    $this.arrInvoiceDetails.push(item);

                }
            }

        });

        //this.arrInvoiceNo.push(invoiceNo);
        localStorage.setItem('invoiceDetails', JSON.stringify(this.arrInvoiceDetails));
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
                            billingDate: new Date(obj.billingDate)
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
    onRowClick(event) { }
    onRowDoubleClick(event) { }
    onRowSelect(event) { }
    onActionBtnClick(event) { }
    searchFilter(value) {
        this.dataTableComponent.applyFilter(value);
      }
}
