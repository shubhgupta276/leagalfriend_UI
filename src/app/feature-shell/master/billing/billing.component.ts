import { Component, OnInit } from '@angular/core';
import { AddBillingComponent } from "./add-bill/add-bill.component";
import { EditBillingComponent } from "./edit-bill/edit-bill.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      BillingComponent,
      AddBillingComponent,
      EditBillingComponent,
    ]
  }
)
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
  editForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.addBillForm(null);
  }

  ngOnInit() {
    this.getBillingData();
    this.setDropdownUniqueValues();

    $($.document).ready(function () {

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

  showEditModal(data) {
    $('#editBillModal').modal('show');
    this.addBillForm(data);
  }
  addBillForm(data) {
    this.editForm = this.fb.group({
      bank: [data == null ? null : data.Bank, Validators.required],
      recourse: [data == null ? null : data.Recourse, Validators.required],
      stage: [data == null ? null : data.Stage, Validators.required],
      amount: [data == null ? null : data.Amount, Validators.required]
    });

  }
}
