import { Component, OnInit, NgModule, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';

declare let $;


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ResourceComponent implements OnInit {
  @ViewChild(EditResourceMasterComponent) editChild: EditResourceMasterComponent;
  tableInputData = [];
  columns = resourceTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;
  constructor(private fb: FormBuilder, private _recourseService: RecourseService, private _storageService: StorageService) {
  }
  editResourceMasterForm: FormGroup;
  ngOnInit() {
    this.setActionConfig();
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
  onRowClick(event) {
    console.log(event);
  }
  onRowDoubleClick(event) {
    this.editChild.createForm(event);
    $('#editResourceMasterModal').modal('show');
  }

  onRowSelect(event) {
    console.log(event);
  }
  
  onActionBtnClick(event) {
    if (event.eventType === 'edit') {
      this.editChild.createForm(event.data);
      $('#editResourceMasterModal').modal('show');
    }
  }
  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = true;
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
