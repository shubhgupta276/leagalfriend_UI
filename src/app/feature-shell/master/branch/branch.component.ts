import { Component, OnInit, ViewChild } from '@angular/core';
import { AddBranchMasterComponent } from './add-branch/add-branch.component';
import { EditBranchMasterComponent } from './edit-branch/edit-branch.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BranchService } from './branch.service';
import { StorageService } from '../../../shared/services/storage.service';
import { CityService } from '../city/city.service';
import { SelectModule } from 'ng2-select';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { branchTableConfig } from './branch.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';
import { SharedService } from '../../../shared/services/shared.service';
declare let $;


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})

export class BranchComponent implements OnInit {
  editBranchMasterForm: FormGroup;
  editDetails: any;
  arCity = [];
  @ViewChild(EditBranchMasterComponent) editChild: EditBranchMasterComponent;
  tableInputData = [];
  columns = branchTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;

  constructor(private fb: FormBuilder, private _branchService: BranchService, private _cityService: CityService) {
  }
  ngOnInit() {
    this.setActionConfig();
    this.bindCity();
  }

  GetAllBranch() {
    this._branchService.getBranches().subscribe(
      result => {
        if (result.httpCode === 200) {
          for (let i = 0; i < result.branches.length; i++) {
            const obj = result.branches[i];
            this.tableInputData.push({
              branchName: obj.branchName,
              branchCode: obj.branchCode,
              branchAddress: obj.branchAddress,
              branchContact: obj.branchContact,
              cityId: obj.cityId,
              cityName: this.getCityName(obj.cityId),
              id: obj.id
            });
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
    this.editDetails = event;
    this.editChild.createForm(event);
    $('#editBranchMasterModal').modal('show');
   }

  onRowSelect(event) {
    console.log(event);
  }
  onActionBtnClick(event) {
    if (event.eventType === 'edit') {
      this.editChild.createForm(event.data);
      $('#editBranchMasterModal').modal('show');
    }
  }
  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = true;
  }
  bindCity() {
    const $this = this;
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
    const objFind = this.arCity.filter(x => x.id === cityId)[0];
    if (objFind) {
      return objFind.text;
    } else {
      return '';
    }
  }

}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, DataTableModule],
    declarations: [
      BranchComponent,
      AddBranchMasterComponent,
      EditBranchMasterComponent
    ],
    providers: [BranchService, StorageService, SharedService]
  }
)

export class BranchModule { }
