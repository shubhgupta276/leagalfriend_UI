import { Component, OnInit } from '@angular/core';
declare let $;
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
  constructor() { }

  ngOnInit() {
    this.getBillingData();
    this.setDropdownUniqueValues();

    $($.document).ready(function () {

      var $table = $("#example1").DataTable({
        "bSort": false,
        lengthMenu: [[10, 15, 25, -1], [10, 15, 25, "All"]],
        pageLength: 15,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        }
      });
      // {
      //   columns: [
      //     { name: "#", orderable: false },
      //     { name: "Bank", orderable: false },
      //     { name: "Recourse", orderable: false },
      //     { name: "Stage", orderable: false },
      //     { name: "Amount", orderable: false }
      //   ],
      // }

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

        //start Recourse filter
        $("#ddlRecourse").on("change", function () {
          var status = $(this).val();
          if (status == "All") {
            $table.columns(2).search("").draw();
          }
          else if ($table.columns(2).search() !== this.value) {
            $table.columns(2).search(this.value).draw();
          }
        });
        //end Recourse filter

        //start Stage filter
        $("#ddlStage").on("change", function () {
          var status = $(this).val();
          if (status == "All") {
            $table.columns(3).search("").draw();
          }
          else if ($table.columns(3).search() !== this.value) {
            $table.columns(3).search(this.value).draw();
          }
        });
        //end Stage filter

        //Amount bank filter
        $("#ddlAmount").on("change", function () {
          var status = $(this).val();
          if (status == "All") {
            $table.columns(4).search("").draw();
          }
          else if ($table.columns(4).search() !== this.value) {
            $table.columns(4).search(this.value).draw();
          }
        });
        //end Amount filter

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

    }

  }
  getBillingData() {

    this.arBillingData.push(
      { Bank: "DCB BANK LTD.", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "100" },
      { Bank: "DCB BANK LTD.", Recourse: "CRI_CASE", Stage: "APPLIED FOR VEHICLE CUSTODY", Amount: "11" },
      { Bank: "HDFC BANK Ltd.", Recourse: "SEC_25C", Stage: "CASE FILED", Amount: "300" },
      { Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
      { Bank: "HDFC BANK Ltd.", Recourse: "ARB", Stage: "1ST NOTICE BY ARBITRATOR", Amount: "300" },
      { Bank: "RBS BANK", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "2588" },
      { Bank: "RBS BANK", Recourse: "ARB", Stage: "ARGUMENTS", Amount: "100" },
      { Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "5" },
      { Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
      { Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
      { Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
    );
  }
}
