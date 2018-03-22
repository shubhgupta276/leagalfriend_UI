import { Component, OnInit,NgModule} from "@angular/core";
import { AddInstitutionMasterComponent } from "./add-institution/add-institution.component";
import { EditInstitutionMasterComponent } from "./edit-institution/edit-institution.component";
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';
import { StorageService } from '../../../shared/services/storage.service';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      InstitutionComponent,
      AddInstitutionMasterComponent,
      EditInstitutionMasterComponent
    ],
    providers: [InstitutionService, StorageService]
  }
)
@Component({
  selector: "app-institution",
  templateUrl: "./institution.component.html",
  styleUrls: ["./institution.component.css"]
})
export class InstitutionComponent implements OnInit {
 
  arr:Institution[] = [];
  editInstitutionMasterForm: FormGroup;
  editDetails:any;
  constructor(private fb: FormBuilder, private _institutionService: InstitutionService, private _storageService: StorageService) {
    
  }


  ngOnInit() {
    this.GetAllInstitute();
    
  }
  showEditModal(data) {
    this.editDetails=data;
    $('#editInstitutionMasterModal').modal('show');
    
  }
  
  GetAllInstitute() {
    this._institutionService.getInstitutions().subscribe(
      result => {
        if (result.httpCode == 200) {

          for (var i = 0; i < result.institutions.length; i++) {
            const obj = result.institutions[i];
            
            this.arr.push({
              institutionName: obj.institutionName,
              id: obj.id
            });
          }
          setTimeout(() => {
            this.bindDatatable();
          }, 1);

        }
        else {
          console.log(result);
        }
      },
      err => {
        console.log(err);
        this.arr = [];

      });
  }

   bindDatatable(){
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
   }

  
}
