import { Component, OnInit,ViewChild } from '@angular/core';
import { AddBranchMasterComponent } from "./add-branch/add-branch.component";
import { EditBranchMasterComponent } from "./edit-branch/edit-branch.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BranchService } from './branch.service';
import { StorageService } from '../../../shared/services/storage.service';
import { CityService } from "../city/city.service";
import {SelectModule} from 'ng2-select';
declare let $;

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule],
    declarations: [
      BranchComponent,
      AddBranchMasterComponent,
      EditBranchMasterComponent      
    ],
    providers: [BranchService, StorageService]
  }
)
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})

export class BranchComponent implements OnInit {
  arrBranch= [];
  editBranchMasterForm: FormGroup;
  editDetails:any;
  arCity=[];
  @ViewChild(EditBranchMasterComponent) editChild : EditBranchMasterComponent;
  constructor(private fb: FormBuilder,private _branchService: BranchService, private _cityService: CityService) {
    }
  ngOnInit() {
    this.bindCity();
    
    // $($.document).ready(function () {

    //   var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
    //   var selectedPageLength = 15;

    //   var $table = $("#example1").DataTable({
    //     paging: true,
    //     lengthChange: true,
    //     searching: true,
    //     ordering: true,
    //     info: true,
    //     autoWidth: false,
    //     lengthMenu: arLengthMenu,
    //     pageLength: selectedPageLength,
    //     oLanguage: {
    //       sLengthMenu: "Show _MENU_ rows",
    //       sSearch: "",
    //       sSearchPlaceholder: "Search..."
    //     },
    //     initComplete: function () {
    //       var tableid = "example1";
    //       var $rowSearching = $("#" + tableid + "_wrapper");
    //       $rowSearching.find(".row:eq(0)").hide();

    //       for (var i = 0; i < arLengthMenu[0].length; i++) {
    //         $("#ddlLengthMenu").append("<option value=" + arLengthMenu[0][i] + ">" + arLengthMenu[1][i] + "</option>");
    //       }
    //       $("#ddlLengthMenu").val(selectedPageLength);

    //       $("#ddlLengthMenu").on("change", function () {
    //         $rowSearching.find(".row:eq(0)").find("select").val($(this).val()).change();
    //       });
    //     }
    //   });

    //   $table.columns().every(function () {

    //     $('#txtSearch').on('keyup change', function () {
    //       if ($table.search() !== this.value) {
    //         $table.search(this.value).draw();
    //       }
    //     });
    //   });

    // });
  }
  
  GetAllBranch() {
    this._branchService.getBranches().subscribe(
      result => {
        if (result.httpCode == 200) {
          
          for (var i = 0; i < result.branches.length; i++) {
            const obj = result.branches[i];

            this.arrBranch.push({
              branchName: obj.branchName,
              branchCode:obj.branchCode,
              branchAddress:obj.branchAddress,
              branchContact:obj.branchContact,
              cityId:obj.cityId,
              cityName:this.getCityName(obj.cityId),
              id:obj.id
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
       // this.arCityData = [];

      });
    // this.arr = [
    //   { BranchName: "Trident", BranchCode: "B01", Address: "Address01", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Gecko", BranchCode: "B02", Address: "Address02", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Webkit", BranchCode: "B03", Address: "Address03", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Presto", BranchCode: "B04", Address: "Address04", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "KHTML", BranchCode: "B05", Address: "Address05", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Tasman", BranchCode: "B06", Address: "Address06", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Misc", BranchCode: "B07", Address: "Address07", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Tasman", BranchCode: "B08", Address: "Address08", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Misc", BranchCode: "B09", Address: "Address09", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "KHTML", BranchCode: "B10", Address: "Address10", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Gecko", BranchCode: "B11", Address: "Address11", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Trident", BranchCode: "B12", Address: "Address12", City: "Jaipur", Contact: "1234567890" },
    //   { BranchName: "Trident", BranchCode: "B13", Address: "Address13", City: "Jaipur", Contact: "1234567890" }

    // ];
  }

  bindDatatable() {

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
    this.editDetails=data;
    this.editChild.createForm(data);
    $('#editBranchMasterModal').modal('show');
  }
  bindCity() {
    var $this = this;
    this._cityService.getCities()
    .map(res => res)
    .finally(() => {
        $this.GetAllBranch();
    })
    .subscribe(
      data => {
        
        data.cities.forEach(item => {
          this.arCity.push({ id: item.id, text: item.cityName });
        });
      },
      error => console.log(error)
    );

  }
  getCityName(cityId): string {
    debugger
    const objFind = this.arCity.filter(x => x.id == cityId)[0];
    if (objFind)
      return objFind.text;
    else
      return "";
      
  }

}
