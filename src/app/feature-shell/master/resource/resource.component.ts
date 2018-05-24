import { Component, OnInit } from "@angular/core";
import { EditResourceMasterComponent } from "./edit-resource/edit-resource.component";
import { AddResourceMasterComponent } from "./add-resource/add-resource.component";
import { CommonModule } from "@angular/common";
import { NgModule, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Recourse } from "./recourse";
import { RecourseService } from "./recourse.service";
import { StorageService } from "../../../shared/services/storage.service";

declare let $;


@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrls: ["./resource.component.css"]
})
export class ResourceComponent implements OnInit {
  arr: Recourse[] = [];
  @ViewChild(EditResourceMasterComponent) editChild: EditResourceMasterComponent;
  constructor(private fb: FormBuilder, private _recourseService: RecourseService, private _storageService: StorageService) {
  }
  editResourceMasterForm: FormGroup;
  ngOnInit() {
    this.GetAllResource();
  }
  GetAllResource() {

    this._recourseService.getResources().subscribe(
      result => {

        if (result.httpCode == 200) {

          for (var i = 0; i < result.recourses.length; i++) {
            const obj = result.recourses[i];

            this.arr.push({
              recourseName: obj.recourseName,
              recourseCode: obj.recourseCode,
              recourseDesc: obj.recourseDesc,
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
  showEditModal(data: Recourse) {
    this.editChild.createForm(data);
    $("#editResourceMasterModal").modal("show");
  }

}

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ResourceComponent,
    EditResourceMasterComponent,
    AddResourceMasterComponent
  ],
  providers: [RecourseService, StorageService]
})

export class RecourseModule {}
