import { Component, OnInit } from '@angular/core';
import { AddComplianceMasterComponent } from "./add-compliance/add-compliance.component";
import { EditComplianceMasterComponent } from "./edit-compliance/edit-compliance.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
    declarations: [
      ComplianceComponent,
      AddComplianceMasterComponent,
      EditComplianceMasterComponent,
    ]
  }
)
@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent implements OnInit {
arr:[any];
editComplianceMasterForm: FormGroup;

constructor(private fb: FormBuilder) {
  this.EditComplianceMaster(null);
}
  ngOnInit() {
    this.GetAllCompliance();
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
  showEditModal(data){
    $('#editComplianceMasterModal').modal('show');
    this.EditComplianceMaster(data);
    }
  GetAllCompliance()
  {
    this.arr=[
      {Recourse:"RODA",Stage:"ARGUMENTS",Compliance:"Compliance 1",Status:"Active"}

    ]
  }
  EditComplianceMaster(data) {
    this.editComplianceMasterForm = this.fb.group({        
        resource: [1],
        stage: [1],
        complaince: [data==null?null:data.Compliance, Validators.required],
        status: [1]
    });
  }
  

}
