import { Component, OnInit } from '@angular/core';
import { RecourseService } from '../../master/resource/recourse.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { InstitutionService } from '../../master/institution/institution.service';
declare let $;
@Component({
    selector: 'app-against-institution',
    templateUrl: './against-institution.component.html',
    styleUrls: ['./against-institution.component.css'],
    providers: [RecourseService, InstitutionService]
})
export class AgainstInstitutionComponent implements OnInit {
    arr = [];
    arInstitutions: any[] = [];
    arNextHearingDate: any[] = [];
    arLastHearingDate: any[] = [];
    arrInvoiceDetails = [];
    arRecourse: any[] = [];
    recourseFitlerId: any;
    institutionFilterId: any;
    branchData: any;
    branchSubscription: Subscription;
    recourseConfig: any;
    institutionConfig: any;
    $table: any;
    isRowSelected: boolean = false;
    checkboxCounter: number = 0;
    againstOpen: boolean = false;
    constructor(private _recourseService: RecourseService, private _sharedService: SharedService,
        private _institutionService: InstitutionService, private _storageService: StorageService) { }

    ngOnInit() {
        this.recourseConfig = {
            displayKey: "recourseName",
            defaultText: "All Recourses",
            defaultTextAdd: true,
            showIcon: false,
            hideWhenOneItem: false
        }

        this.institutionConfig = {
            displayKey: "institutionName",
            defaultTextAdd: false,
            showFirstSelected: true,
            showIcon: false,
            hideWhenOneItem: false
        }

        this.branchSubscription = this._sharedService.getHeaderBranch().subscribe(message => {
            $("#btnSearch").click();
        });

        this.getRecourse();
        this.GetForInstitution();
        this.setFilterDropdowns();
        this.getInstitutions();
        var $this = this;
        $($.document).ready(function () {
            var $table = $this.$table;
            var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
            var selectedPageLength = 15;
            $this.$table = $("#example1").DataTable({
                columns: [
                    { name: "", orderable: false },
                    { name: "CaseId", orderable: true },
                    { name: "Stage", orderable: true },
                    { name: "CourtCaseId", orderable: true },
                    { name: "LegalCaseId", orderable: true },
                    { name: "LastHearingDate", orderable: false },
                    { name: "NextHearingDate", orderable: false },
                    { name: "LoanAccountNo", orderable: true },
                    { name: "Action", orderable: false },
                    { name: "RecourseId", orderable: false },
                    { name: "BranchId", orderable: false },
                    { name: "institutionId", orderable: false },
                ],
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

            $this.filterDatatableData();

            $('#btnClearFilter,#btnReset').click(function () {
                $('#txtLastHearingDateFilter').val("");
                $('#txtNextHearingDateFilter').val("");
                $this.filterDatatableData();
                //$table.columns(9).search("").draw();
            });

            $('#txtLastHearingDateFilter').daterangepicker({
                autoUpdateInput: false
            }, function (start_date, end_date) {
                $('#txtLastHearingDateFilter').val(start_date.format('MM-DD-YYYY') + ' - ' + end_date.format('MM-DD-YYYY'));
            });

            $('#txtNextHearingDateFilter').daterangepicker({
                autoUpdateInput: false
            }, function (start_date, end_date) {
                $('#txtNextHearingDateFilter').val(start_date.format('MM-DD-YYYY') + ' - ' + end_date.format('MM-DD-YYYY'));
            });

        });
    }

    filterDatatableData() {
        var $table = this.$table;
        var $this = this;
        $table.columns().every(function () {
            $('#txtSearch').on('keyup change', function () {
                if ($table.search() !== this.value) {
                    $table.search(this.value).draw();
                }
            });

            //start LastHearingDate filter
            $("#ddlLastHearingDate").on("change", function () {

                var status = $(this).val();
                if (status == "All") {
                    $table.columns(5).search("").draw();
                }
                else if ($table.columns(5).search() !== this.value) {
                    $table.columns(5).search(this.value).draw();
                }
            });
            //end LastHearingDate filter

            //start NextHearingDate filter
            $("#ddlNextHearingDate").on("change", function () {

                var status = $(this).val();
                if (status == "All") {
                    $table.columns(6).search("").draw();
                }
                else if ($table.columns(6).search() !== this.value) {
                    $table.columns(6).search(this.value).draw();
                }
            });
            //end NextHearingDate filter
        });

        filterTable();

        function filterTable() {
            // start recourse filter
            if ($this.recourseFitlerId == undefined) {
                $table.columns(9).search("").draw();
            }
            else if ($table.columns(9).search() !== $this.recourseFitlerId) {
                $table.columns(9).search($this.recourseFitlerId).draw();
            }
            //end recourse filter
            
            if ($this.institutionFilterId == undefined) {
                $table.columns(11).search("").draw();
            }
            else if ($table.columns(11).search() !== $this.institutionFilterId) {
                $table.columns(11).search($this.institutionFilterId).draw();
            }

            $this.branchData = $this._storageService.getBranchData();
            //start branch fitler

            if ($this.branchData == null) {
                $table.columns(10).search("").draw();
            }
            else if ($table.columns(10).search() !== $this.branchData.id) {
                $table.columns(10).search($this.branchData.id).draw();
            }
            //end branch fitler

            $.fn.dataTableExt.afnFiltering.push(
                function (oSettings, data, iDataIndex) {

                    if ($("#filterInstitutionModal").is(":visible")) {
                        var arLastDate = $("#txtLastHearingDateFilter").val().split(" - ");
                        var lastHearingStartDate = null, lastHearingEndDate = null;
                        var lastHearingDate = new Date(data[5]);
                        if (arLastDate.length > 1) {
                            lastHearingStartDate = new Date(arLastDate[0]);
                            lastHearingEndDate = new Date(arLastDate[1]);
                        }

                        // var nextHearingStartDate = new Date($('#txtNextHearingDateFilter').data('daterangepicker').startDate.format('MM-DD-YYYY'));
                        // var nextHearingEndDate = new Date($('#txtNextHearingDateFilter').data('daterangepicker').endDate.format('MM-DD-YYYY'));


                        var nextHearingDate = new Date(data[6]);
                        var arNextDate = $("#txtNextHearingDateFilter").val().split(" - ");
                        var nextHearingStartDate = null, nextHearingEndDate = null;
                        if (arNextDate.length > 1) {
                            nextHearingStartDate = new Date(arNextDate[0]);
                            nextHearingEndDate = new Date(arNextDate[1]);
                        }

                        if ((arLastDate.length <= 1 && arNextDate.length <= 1) ||
                            (lastHearingDate >= lastHearingStartDate && lastHearingDate <= lastHearingEndDate) ||
                            (nextHearingDate >= nextHearingStartDate && nextHearingDate <= nextHearingEndDate)
                        ) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else
                        return true;

                }
            );

            $table.draw();
            $("#closebtnFilter").click();
        }
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.branchSubscription.unsubscribe();
    }

    GetForInstitution() {
        this.arr = [
            { institutionId: 1, branchId: 1, recourseId: 23, CaseId: "O_SEC9_31526", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "16-Jan-2018", LoanAccountNo: "10049575" },
            { institutionId: 1, branchId: 1, recourseId: 23, CaseId: "O_SEC9_31527", Stage: "ARGUMENTS", CourtCaseId: "", LegalCaseId: "21567835/SEC_138/19092014/S2766/1530552/MIGR_REF", LastHearingDate: "03-Nov-2015", NextHearingDate: "16-Jan-2018", LoanAccountNo: "21567835" },
            { institutionId: 2, branchId: 3, recourseId: 14, CaseId: "O_SEC9_31528", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "16-Jan-2018", LoanAccountNo: "10049575" },
            { institutionId: 3, branchId: 3, recourseId: 14, CaseId: "O_SEC9_31529", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "17-Jan-2018", LoanAccountNo: "11049575" },
            { institutionId: 3, branchId: 4, recourseId: 14, CaseId: "O_SEC9_31530", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "18-Jan-2018", LoanAccountNo: "12049575" },
            { institutionId: 3, branchId: 4, recourseId: 15, CaseId: "O_SEC9_31531", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "19-Jan-2018", LoanAccountNo: "13049575" },
            { institutionId: 3, branchId: 4, recourseId: 15, CaseId: "O_SEC9_31532", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "20-Jan-2018", LoanAccountNo: "14049575" },
            { institutionId: 4, branchId: 4, recourseId: 4, CaseId: "O_SEC9_31533", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "21-Jan-2018", LoanAccountNo: "15049575" },
            { institutionId: 4, branchId: 5, recourseId: 4, CaseId: "O_SEC9_31534", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "22-Jan-2018", LoanAccountNo: "16049575" },
            { institutionId: 4, branchId: 5, recourseId: 7, CaseId: "O_SEC9_31535", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "15-Mar-2016", NextHearingDate: "23-Jan-2018", LoanAccountNo: "17049575" },
            { institutionId: 4, branchId: 5, recourseId: 7, CaseId: "O_SEC9_31536", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "11-Mar-2016", NextHearingDate: "24-Jan-2018", LoanAccountNo: "18049575" },
            { institutionId: 4, branchId: 6, recourseId: 7, CaseId: "O_SEC9_31537", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "11-Mar-2016", NextHearingDate: "25-Jan-2018", LoanAccountNo: "19049575" },
            { institutionId: 4, branchId: 6, recourseId: 7, CaseId: "O_SEC9_31538", Stage: "COMPLAINT_RETURNED", CourtCaseId: "9717/14", LegalCaseId: "10049575/SEC_138/14022014/R5780/1352986/MIGR", LastHearingDate: "13-Mar-2016", NextHearingDate: "26-Jan-2018", LoanAccountNo: "20049575" }
        ];

    }

    setFilterDropdowns() {
        // for (var i = 0; i < this.arr.length; i++) {
        //     var obj = this.arr[i];

        //     if ($.inArray(obj.LastHearingDate, this.arLastHearingDate) < 0)
        //         this.arLastHearingDate.push(obj.LastHearingDate);

        //     if ($.inArray(obj.NextHearingDate, this.arNextHearingDate) < 0)
        //         this.arNextHearingDate.push(obj.NextHearingDate);
        // }
    }

    checkboxChange(data) {
        this.checkboxCounter = (data) ? this.checkboxCounter + 1 : this.checkboxCounter - 1;
        this.isRowSelected = !this.isRowSelected;
    }

    addClick() {
        this.againstOpen = !this.againstOpen;
    }

    changeRecourse(data: any) {
        this.recourseFitlerId = (data == undefined) ? data : data.id;
        this.filterDatatableData();
    }

    changeInstitution(data: any) {
        this.institutionFilterId = (data == undefined) ? data : data.id;
        this.filterDatatableData();
    }

    getRecourse() {

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

    getInstitutions() {

        this._institutionService.getInstitutions().subscribe(
            result => {

                if (result.httpCode == 200) {
                    result.institutions.forEach(element => {
                        this.arInstitutions.push(element);
                    });
                }
                else
                    console.log(result);
            },
            err => {
                console.log(err);
            }
        );
    }
}