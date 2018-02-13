import { Component, OnInit } from "@angular/core";
import { AddInstitutionMasterComponent } from "./add-institution/add-institution.component";
import { EditInstitutionMasterComponent } from "./edit-institution/edit-institution.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      InstitutionComponent,
      AddInstitutionMasterComponent,
      EditInstitutionMasterComponent
    ]
  }
)
@Component({
  selector: "app-institution",
  templateUrl: "./institution.component.html",
  styleUrls: ["./institution.component.css"]
})
export class InstitutionComponent implements OnInit {
  arr: [any];
  editInstitutionMasterForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.EditInstitutionMaster(null);
  }

  ngOnInit() {
    this.GetAllInstitute();
    $($.document).ready(function () {
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
    });
  }
  GetAllInstitute() {
    this.arr = [
      { InstituteName: "AXIS BANK LTD." },
      { InstituteName: "CORPORATION BANK LTD" },
      { InstituteName: "DCB BANK LTD." },
      { InstituteName: "HDFC BANK Ltd." },
      { InstituteName: "ICICI BANK LTD." },
      { InstituteName: "INDIA INFOLINE FINANCE LIMITED" },
      { InstituteName: "INTEC CAPITAL LIMITED" },
      { InstituteName: "KOTAK MAHINDRA BANK LTD." },
      { InstituteName: "MAGMA HOUSING FINANCE LIMITED" },
      { InstituteName: "MODERN CAPITAL LIMITED" },
      { InstituteName: "RBL BANK LTD." },
      { InstituteName: "RBS BANK" },
      { InstituteName: "TVS FINANCE LIMITED" },
      { InstituteName: "VIJAYA BANK" }
    ];
  }

  showEditModal(data) {
    $('#editInstitutionMasterModal').modal('show');
    this.EditInstitutionMaster(data);
  }
  EditInstitutionMaster(data) {
    this.editInstitutionMasterForm = this.fb.group({
      institution: [data == null ? null : data.InstituteName, Validators.required],
    });
  }
}
