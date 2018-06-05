import { CommonModule } from '@angular/common';
import { NgModule, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AddCityMasterComponent } from './add-city/add-city.component';
import { EditCityMasterComponent } from './edit-city/edit-city.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from './city.service';
import { City } from './city';
import { StorageService } from '../../../shared/services/storage.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { cityTableConfig } from './city.config';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';
declare let $;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  tableInputData = [];
  columns = cityTableConfig;
  @ViewChild(EditCityMasterComponent) editChild: EditCityMasterComponent;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;

  constructor(private fb: FormBuilder, private _cityService: CityService, private _storageService: StorageService) {

  }
  editCityMasterForm: FormGroup;

  ngOnInit() {
    this.setActionConfig();
    this.getCityData();
  }

  getCityData() {
    this._cityService.getCities().subscribe(
      result => {
        if (result.httpCode === 200) {
          for (let i = 0; i < result.cities.length; i++) {
            this.tableInputData.push(result.cities[i]);
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
    $('#editCityMasterModal').modal('show');
  }

  onRowSelect(event) {
    console.log(event);
  }
  onActionBtnClick(event) {
    if (event.eventType === 'edit') {
      this.editChild.createForm(event.data);
      $('#editCityMasterModal').modal('show');
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
      CityComponent,
      AddCityMasterComponent,
      EditCityMasterComponent
    ],
    providers: [CityService, StorageService]
  }
)

export class CityModule { }
