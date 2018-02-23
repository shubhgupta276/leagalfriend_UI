import { AddStateMasterComponent } from './add-state/add-state.component';
import { EditStateMasterComponent } from './edit-state/edit-state.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from './state.service';
import { StorageService } from '../../../shared/services/storage.service';
import { State } from './state';

declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      StateComponent,
      AddStateMasterComponent,
      EditStateMasterComponent
    ],
    providers: [StateService, StorageService]
  }
)
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  arr: State[]=[];
  editStateMasterForm: FormGroup;
  editDetails: any;
  constructor(private fb: FormBuilder, private _stateService: StateService, private _storageService: StorageService) {

  }

  ngOnInit() {
    this.GetAllState();
  }
  GetAllState() {
    var reqObj = {
      email: this._storageService.getUserEmail(),
    };

    this._stateService.getStates(reqObj).subscribe(
      result => {
        result = result.body;
        
        if (result.httpCode == 200) {
          
          for (var i = 0; i < result.states.length; i++) {
            const obj = result.states[i];

            this.arr.push({
              stateName: obj.stateName,
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
  showEditModal(data) {
    this.editDetails = data;
    $('#editStateMasterModal').modal('show');
  }


}
