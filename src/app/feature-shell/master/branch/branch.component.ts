import { Component, OnInit } from '@angular/core';
import { AddBranchMasterComponent } from "./add-branch/add-branch.component";
import { EditBranchMasterComponent } from "./edit-branch/edit-branch.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      BranchComponent,
      AddBranchMasterComponent,
      EditBranchMasterComponent,
    ]
  }
)
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  arr= [];
  editBranchMasterForm: FormGroup;
  editDetails:any;

  constructor(private fb: FormBuilder) {
    }
  ngOnInit() {
    this.GetAllBranch();
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
      });

    });
  }
  

  GetAllBranch() {
    this.arr = [
      { BranchName: "Trident", BranchCode: "B01", Address: "Address01", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Gecko", BranchCode: "B02", Address: "Address02", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Webkit", BranchCode: "B03", Address: "Address03", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Presto", BranchCode: "B04", Address: "Address04", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "KHTML", BranchCode: "B05", Address: "Address05", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Tasman", BranchCode: "B06", Address: "Address06", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Misc", BranchCode: "B07", Address: "Address07", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Tasman", BranchCode: "B08", Address: "Address08", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Misc", BranchCode: "B09", Address: "Address09", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "KHTML", BranchCode: "B10", Address: "Address10", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Gecko", BranchCode: "B11", Address: "Address11", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Trident", BranchCode: "B12", Address: "Address12", City: "Jaipur", Contact: "1234567890" },
      { BranchName: "Trident", BranchCode: "B13", Address: "Address13", City: "Jaipur", Contact: "1234567890" }

    ];
  }

  showEditModal(data) {
    this.editDetails=data;
    $('#editBranchMasterModal').modal('show');
  }
  

}
