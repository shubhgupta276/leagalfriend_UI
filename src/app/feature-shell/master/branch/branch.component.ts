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
  arr: [any];
  editBranchMasterForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.EditBranchMaster(null);
  }
  ngOnInit() {
    this.GetAllBranch();
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
    }
    );
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
    $('#editBranchMasterModal').modal('show');
    this.EditBranchMaster(data);
  }
  EditBranchMaster(data) {
    this.editBranchMasterForm = this.fb.group({
      branchname: [data == null ? null : data.BranchName, Validators.required],
      branchcode: [data == null ? null : data.BranchCode, Validators.required],
      address: [data == null ? null : data.Address, Validators.required],
      city: [1],
      contact: [data == null ? null : data.Contact, Validators.required],
    });
  }

}
