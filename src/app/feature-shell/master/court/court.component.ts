import { Component, OnInit, ViewChild } from '@angular/core';
import { AddCourtMasterComponent } from './add-court/add-court.component';
import { EditCourtMasterComponent } from './edit-court/edit-court.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourtService } from './court.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Court } from './court';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { courtTableConfig } from './court.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';

declare let $;
@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
  @ViewChild(EditCourtMasterComponent) editChild: EditCourtMasterComponent;
  tableInputData = [];
  columns = courtTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;
  constructor(private fb: FormBuilder, private _courtService: CourtService, private _storageService: StorageService) {

  }
  editCourtMasterForm: FormGroup;
  ngOnInit() {
    this.setActionConfig();
    this.GetAllCourt();
  }

  GetAllCourt() {
    this._courtService.getCourts().subscribe(
      result => {
        if (result.httpCode === 200) {
          for (let i = 0; i < result.courts.length; i++) {
            this.tableInputData.push(result.courts[i]);
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
    $('#editCourtMasterModal').modal('show');
  }

  onRowSelect(event) {
    console.log(event);
  }
  onActionBtnClick(event) {
    if (event.eventType === 'edit') {
      this.editChild.createForm(event.data);
      $('#editCourtMasterModal').modal('show');
    }
  }
  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = true;
  }
}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [
      CourtComponent,
      AddCourtMasterComponent,
      EditCourtMasterComponent,
    ],
    providers: [CourtService, StorageService]
  }
)

export class CourtModule { }
