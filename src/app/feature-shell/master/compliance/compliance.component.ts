import { Component, OnInit } from '@angular/core';
import { AddComplianceMasterComponent } from "./add-compliance/add-compliance.component";
import { EditComplianceMasterComponent } from "./edit-compliance/edit-compliance.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
    this.GetAllCompliance();
    $($.document).ready(function(){
      $("#example1").DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        lengthMenu: [[10, 15, 25, -1], [10, 15, 25, "All"]],
        pageLength: 15,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        }
      });
    }
  );
  }
  showEditModal(){
    $('#editComplianceMasterModal').modal('show');
    }
  GetAllCompliance()
  {
    this.arr=[
      {Recourse:"RODA",Stage:"ARGUMENTS",Compliance:"Compliance 1",Status:"Active"}

    ]
  }
  

}
