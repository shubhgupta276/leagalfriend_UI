import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
    arBillingData: any[] = [];
    arListBanks: any[] = [];
    arListRecourse: any[] = [];
    arListStage: any[] = [];
    arListAmount: any[] = [];
    arListCaseID: any[] = [];
    arListBranch: any[] = [];
    constructor() { }

    ngOnInit() {

        this.getBillingData();
        this.setDropdownUniqueValues();
        $($.document).ready(function() {
          
            var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
            var selectedPageLength = 15;
            const $table = $("#example1").DataTable({
               columns: [
                { name: "#", orderable: true },
                { name: "Bank", orderable: false },
                { name: "CaseID", orderable: false },
                { name: "Recourse", orderable: false },
                { name: "Stage", orderable: false },
                { name: "Amount", orderable: true },
                { name: "BillingDate", orderable: true },
                { name: "Action", orderable: false },
                { name: "Branch", orderable: false },
                { name: "Billed", orderable: false },
                { name: "InvoiceNumber", orderable: false }
              ],
              lengthMenu: arLengthMenu,
              pageLength: selectedPageLength,
              oLanguage: {
                sLengthMenu: "Show _MENU_ rows",
                sSearch: "",
                sSearchPlaceholder: "Search..."
              },
              initComplete: function() {
                var tableid = "example1";
                var $rowSearching = $("#" + tableid + "_wrapper");
                $rowSearching.find(".row:eq(0)").hide();
      
                for (var i = 0; i < arLengthMenu[0].length; i++) {
                  var selectText=(arLengthMenu[0][i]==selectedPageLength)?'selected':'';
                  
                  $("#ddlLengthMenu").append(
                   
      
                    "<option "+ selectText  +" value=" +
                      arLengthMenu[0][i] +
                      ">" +
                      arLengthMenu[1][i] +
                      "</option>"
                  );
                }
                // $("#ddlLengthMenu").val(selectedPageLength);
      
                $("#ddlLengthMenu").on("change", function() {
                  $rowSearching
                    .find(".row:eq(0)")
                    .find("select")
                    .val($(this).val())
                    .change();
                });
              }
            });

            $table.columns().every(function() {
              
                $("#txtSearch").on("keyup change", function() {
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
                 //Branch filter
                 $("#ddlBillingBranch").on("change", function () {
                    var status = $(this).val();
                    if (status == "All") {
                        $table.columns(8).search("").draw();
                    }
                    else if ($table.columns(8).search() !== this.value) {
                        $table.columns(8).search(this.value).draw();
                    }
                });
                //end Branch filter

            });

        });

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

        this.arBillingData.push(
            { Bank: "DCB BANK LTD.", CaseID: "O_SEC9_31527", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "100",Billed:"Yes",Branch:"Mumbai",BillingDate:"12-02-2018",InvoiceNumber:"180213-002" },
            { Bank: "DCB BANK LTD.", CaseID: "O_SEC9_31527", Recourse: "CRI_CASE", Stage: "APPLIED FOR VEHICLE CUSTODY", Amount: "11",Billed:"Yes",Branch:"Delhi",BillingDate:"10-03-2018",InvoiceNumber:"180215-002" },
            { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC_25C", Stage: "CASE FILED", Amount: "300",Billed:"No",Branch:"Delhi",BillingDate:"23-04-2018",InvoiceNumber:"170213-002" },
            { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100",Billed:"No",Branch:"Mumbai",BillingDate:"12-06-2018",InvoiceNumber:"180223-002" },
            { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "ARB", Stage: "1ST NOTICE BY ARBITRATOR", Amount: "300",Billed:"Yes",Branch:"Mumbai",BillingDate:"12-08-2018",InvoiceNumber:"160213-002" },
            { Bank: "RBS BANK", CaseID: "O_SEC9_31527", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "2588",Billed:"Yes",Branch:"Delhi",BillingDate:"12-08-2018",InvoiceNumber:"180883-002" },
            { Bank: "RBS BANK", CaseID: "O_SEC9_31527", Recourse: "ARB", Stage: "ARGUMENTS", Amount: "100",Billed:"No",Branch:"Mumbai",BillingDate:"12-09-2018",InvoiceNumber:"177213-002" },
            { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "5",Billed:"Yes",Branch:"Gujrat",BillingDate:"12-10-2018",InvoiceNumber:"180255-002" },
            { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100",Billed:"Yes",Branch:"Delhi",BillingDate:"12-10-2018",InvoiceNumber:"180266-002" },
            { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100",Billed:"No",Branch:"Mumbai",BillingDate:"12-11-2018",InvoiceNumber:"180277-002" },
            { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100",Billed:"Yes",Branch:"Pune",BillingDate:"12-10-2018",InvoiceNumber:"180223-002" },
        );
    }

}
