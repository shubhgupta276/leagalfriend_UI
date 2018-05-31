import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { EditResourceMasterComponent } from './edit-resource/edit-resource.component';
import { AddResourceMasterComponent } from './add-resource/add-resource.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recourse } from './recourse';
import { RecourseService } from './recourse.service';
import { StorageService } from '../../../shared/services/storage.service';
import { resourceTableConfig } from './resource.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';

declare let $;


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  @ViewChild(EditResourceMasterComponent) editChild: EditResourceMasterComponent;
  tableInputData = [];
  columns = resourceTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  constructor(private fb: FormBuilder, private _recourseService: RecourseService, private _storageService: StorageService) {
  }
  editResourceMasterForm: FormGroup;
  ngOnInit() {
    this.GetAllResource();
  }
  GetAllResource() {

    this._recourseService.getResources().subscribe(
      result => {

        if (result.httpCode === 200) {

          for (let i = 0; i < result.recourses.length; i++) {
            this.tableInputData.push(result.recourses[i]);
          }
          this.dataTableComponent.ngOnInit();
        } else {
          console.log(result);
        }
      },
      err => {
        console.log(err);
      });
  }

  showEditModal(data: Recourse) {
    this.editChild.createForm(data);
    $('#editResourceMasterModal').modal('show');
  }

}

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
  declarations: [
    ResourceComponent,
    EditResourceMasterComponent,
    AddResourceMasterComponent
  ],
  providers: [RecourseService, StorageService]
})

export class RecourseModule { }
