import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { AddDistrictMasterComponent } from './add-district/add-district.component';
import { EditDistrictMasterComponent } from './edit-district/edit-district.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistrictService } from './district.service';
import { StorageService } from '../../../shared/services/storage.service';
import { District } from './district';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { districtTableConfig } from './district.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
declare let $;


@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  tableInputData = [];
  columns = districtTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  constructor(private fb: FormBuilder, private _districtService: DistrictService, private _storageService: StorageService) {

  }
  editDistrictMasterForm: FormGroup;
  @ViewChild(EditDistrictMasterComponent) editChild: EditDistrictMasterComponent;
  ngOnInit() {
    this.GetAllDistrict();

  }

  GetAllDistrict() {

    this._districtService.getDistricts().subscribe(
      result => {
        if (result.httpCode === 200) {
          for (let i = 0; i < result.districts.length; i++) {
            this.tableInputData.push(result.districts[i]);
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
    $('#editDistrictMasterModal').modal('show');
   }

  onRowSelect(event) {
    console.log(event);
  }

}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [
      DistrictComponent,
      AddDistrictMasterComponent,
      EditDistrictMasterComponent
    ],
    providers: [DistrictService]
  }
)

export class DistrictModule { }
