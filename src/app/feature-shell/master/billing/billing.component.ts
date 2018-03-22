import { Component, OnInit, NgModule,ViewChild} from '@angular/core';
import { AddBillingComponent } from "./add-bill/add-bill.component";
import { EditBillingComponent } from "./edit-bill/edit-bill.component";
import { CommonModule } from '@angular/common';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage, ListBranch } from '../../../shared/Utility/util-common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillingService } from './billing.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Billing } from '../billing/billing';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      BillingComponent,
      AddBillingComponent,
      EditBillingComponent,
    ],
    providers: [BillingService, StorageService]
  }
)
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})

export class BillingComponent implements OnInit {
  arBillingData: Billing[] = [];
  arListBanks: any[] = [];
  arListRecourse: any[] = [];
  arListStage: any[] = [];
  arListAmount: any[] = [];
  editForm: FormGroup;
  editDetails: any;
  arListBranch: KeyValue[] = ListBranch;
   @ViewChild(EditBillingComponent) editChild: EditBillingComponent;
  constructor(private fb: FormBuilder,private _billingservice:BillingService,private _storageservice:StorageService) {
  }

  ngOnInit() {
    this.getBillingData();
    this.setDropdownUniqueValues();
    var $this = this;
    $($.document).ready(function () {
     // $this.bindBillingGridPaging();
    });
  }
  bindBillingGridPaging() {
    debugger
    var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
    var selectedPageLength = 15;

    var $table = $("#example1").DataTable({
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: false,
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
        $("#ddlLengthMenu").empty();
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


      //  //start Branch filter
      $("#ddlBranch").on("change", function () {
        //able.draw();
        var branch = $(this).val();
        if (branch == "All") { //hidden row
          $table.columns(6).search("").draw();
        }
        else
          $table.columns(6).search(this.value).draw();
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


  }
  setDropdownUniqueValues() {
    for (var i = 0; i < this.arBillingData.length; i++) {
      var obj = this.arBillingData[i];

      if ($.inArray(obj.bankName, this.arListBanks) < 0)
        this.arListBanks.push(obj.bankName);

      if ($.inArray(obj.recourseId, this.arListRecourse) < 0)
        this.arListRecourse.push(obj.recourseId);

      if ($.inArray(obj.stageId, this.arListStage) < 0)
        this.arListStage.push(obj.stageId);

      if ($.inArray(obj.amount, this.arListAmount) < 0)
        this.arListAmount.push(obj.amount);

    }

  }
  getBillingData() {
    // this.arBillingData = [];
    // this.arBillingData.push(
    //   { Branch: "Delhi", Bank: "DCB BANK LTD.", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "100" },
    //   { Branch: "Delhi", Bank: "DCB BANK LTD.", Recourse: "CRI_CASE", Stage: "APPLIED FOR VEHICLE CUSTODY", Amount: "11" },
    //   { Branch: "Delhi", Bank: "HDFC BANK Ltd.", Recourse: "SEC_25C", Stage: "CASE FILED", Amount: "300" },
    //   { Branch: "Delhi", Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
    //   { Branch: "Delhi", Bank: "HDFC BANK Ltd.", Recourse: "ARB", Stage: "1ST NOTICE BY ARBITRATOR", Amount: "300" },
    //   { Branch: "Delhi", Bank: "RBS BANK", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "2588" },
    //   { Branch: "Delhi", Bank: "RBS BANK", Recourse: "ARB", Stage: "ARGUMENTS", Amount: "100" },
    //   { Branch: "Mumbai", Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "5" },
    //   { Branch: "Mumbai", Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
    //   { Branch: "Mumbai", Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
    //   { Branch: "Mumbai", Bank: "HDFC BANK Ltd.", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100" },
    // );
    this._billingservice.getBilling().subscribe(
      result=>{
        debugger
        if(result.httpCode==200)
        {
          for(var i = 0; i < result.billings.length; i++)
          {
            const obj=result.billings[i];
            this.arBillingData.push({
              id:obj.id,
              //branch:obj.branch,
              bankName: obj.bankName,
              amount:obj.amount,
              recourseId:obj.recourseId,
              stageId:obj.stageId,
              userId:obj.userId
            })
            debugger
          }
            setTimeout(() => {
              this.bindBillingGridPaging();
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
        
  

  showEditModal(data) {
    debugger
    this.editChild.createForm(data);
    // this.editDetails = data;
    $('#editBillModal').modal('show');
  }

}
