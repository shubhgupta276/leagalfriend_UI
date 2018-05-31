import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { AddInstitutionMasterComponent } from './add-institution/add-institution.component';
import { EditInstitutionMasterComponent } from './edit-institution/edit-institution.component';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';
import { StorageService } from '../../../shared/services/storage.service';
import { CityService } from '../city/city.service';
import { element } from 'protractor';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { institutionTableConfig } from './institution.config';

declare let $;


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {
  editInstitutionMasterForm: FormGroup;
  editDetails: any;
  arCity: any[] = [];
  @ViewChild(EditInstitutionMasterComponent) editChild: EditInstitutionMasterComponent;
  tableInputData = [];
  columns = institutionTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;

  constructor(private fb: FormBuilder, private _institutionService: InstitutionService,
    private _cityService: CityService, private _storageService: StorageService) {
  }

  ngOnInit() {
    this.bindCity();

  }

  GetAllInstitute() {
    this._institutionService.getInstitutions().subscribe(
      result => {
        if (result.httpCode === 200) {
          for (let i = 0; i < result.institutions.length; i++) {
            const obj = result.institutions[i];
            this.tableInputData.push({
              institutionName: obj.institutionName,
              address: obj.address,
              billingAddress: obj.billingAddr,
              contactNo: obj.phone,
              contactPerson: obj.contactName,
              city: this.getCityName(obj.fkCity),
              cityId: obj.fkCity, // todo
              id: obj.id,
              defaultInstitution: obj.defaultInstitution
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

  getCityName(cityId): string {
    // this is used because deepak said that if i will gave city name from backend then it will take more time.
    const objFind = this.arCity.filter(x => x.id === cityId)[0];
    if (objFind) {
      return objFind.cityName;
    } else {
      return '';
    }
  }
  bindCity() {
    this._cityService.getCities().subscribe(result => {
      if (result.httpCode === 200) {
        result.cities.forEach(item => {
          this.arCity.push(item);
        });
        this.GetAllInstitute();
      }
    });

  }
  MakeDefault(data) {
    const reqData = {
      institutionName: data.institutionName,
      contactName: data.contactPerson,
      defaultInstitution: 1,
      address: data.address,
      billingAddr: data.billingAddress,
      phone: data.contactNo,
      fkCity: data.cityId,
      id: data.id,
      userId: parseInt(this._storageService.getUserId(), 10)
    };
    this._institutionService.updateDefaultInstitution(reqData).subscribe(

      result => {
        const _result = result.body;
        if (_result.httpCode === 200) { // success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.tableInputData.forEach(item => {
            if (item.id === data.id) {
              item.defaultInstitution = true;
            } else {
              item.defaultInstitution = false;
            }
          });

        } else {
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
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
    $('#editInstitutionMasterModal').modal('show');
   }

  onRowSelect(event) {
    console.log(event);
  }
}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [
      InstitutionComponent,
      AddInstitutionMasterComponent,
      EditInstitutionMasterComponent
    ],
    providers: [InstitutionService, StorageService, CityService]
  }
)

export class MasterInstitutionModule { }
