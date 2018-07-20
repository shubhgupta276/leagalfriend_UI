import { Component, OnInit, NgModule, ViewChild, ViewEncapsulation } from '@angular/core';
import { AddBillingComponent } from './add-bill/add-bill.component';
import { EditBillingComponent } from './edit-bill/edit-bill.component';
import { CommonModule } from '@angular/common';
import {
  UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse,
  ListBillingStage, ListBranch
} from '../../../shared/Utility/util-common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillingService } from './billing.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Billing } from '../billing/billing';
import { RecourseService } from '../resource/recourse.service';
import { InstitutionService } from '../institution/institution.service';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { billingTableConfig } from './billing.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';
import { SharedModule } from '../../../shared/shared.module';
declare let $;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BillingComponent implements OnInit {
  arListBanks: any[] = [];
  arListRecourse: any[] = [];
  arListStage: any[] = [];
  arListAmount: any[] = [];
  editForm: FormGroup;
  editDetails: any;
  arListBranch: KeyValue[] = ListBranch;
  arAllRecourses: any[] = [];
  arAllInstitution: any = [];
  defaultInstitutionId: number;
  @ViewChild(EditBillingComponent) editChild: EditBillingComponent;
  @ViewChild(AddBillingComponent) addBilling: AddBillingComponent;
  tableInputData = [];
  columns = billingTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;
  isInstitutionalTab: boolean = true;
  constructor(private fb: FormBuilder, private _institutionService: InstitutionService,
    private _recourseService: RecourseService, private _billingservice: BillingService, private _storageservice: StorageService) {
  }

  ngOnInit() {
    this.setActionConfig();
    this.getAllRecourses();
    this.getAllInstitutions();
    this.getBillingData();
  }

  setDropdownUniqueValues() {
    for (let i = 0; i < this.tableInputData.length; i++) {
      const obj = this.tableInputData[i];

      if ($.inArray(obj.institutionName, this.arListBanks) < 0) {
        this.arListBanks.push(obj.institutionName);
      }

      if ($.inArray(obj.recourseName, this.arListRecourse) < 0) {
        this.arListRecourse.push(obj.recourseName);
      }

      if ($.inArray(obj.stageName, this.arListStage) < 0) {
        this.arListStage.push(obj.stageName);
      }
      if ($.inArray(obj.amount, this.arListAmount) < 0) {
        this.arListAmount.push(obj.amount);
      }
    }

  }
  
  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showEdit = true;
  }
 
  getBillingData() {
    this.tableInputData = [];
    this._billingservice.getBilling().subscribe(
      result => {
        if (result.httpCode === 200) {
          for (let i = 0; i < result.billings.length; i++) {
            const obj = result.billings[i];
            this.tableInputData.push({
              id: obj.id,
              amount: obj.amount,
              recourseName: obj.recourse.recourseName,
              recourseId: obj.recourse.id,
              stageId: obj.stage.id,
              stageName: obj.stage.stageName,
              userId: obj.userId,
              address: obj.institution.address,
              billingAddr: obj.institution.billingAddr,
              contactName: obj.institution.contactName,
              fkCity: obj.institution.fkCity,
              phone: obj.institution.phone,
              institutionId: obj.institution.id,
              institutionName: obj.institution.institutionName,
            });
          }
          this.dataTableComponent.ngOnInit();
          this.setDropdownUniqueValues();
        } else {
          console.log(result);
        }
      },
      err => {
        console.log(err);

      });
  }

  getAllInstitutions() {

    this._institutionService.getInstitutions().subscribe(
      result => {

        if (result.httpCode === 200) {
          result.institutions.forEach(element => {
            this.arAllInstitution.push(element);
            if (element.defaultInstitution) {
              this.defaultInstitutionId = element.id;
            }
          });
        }
      });
  }

  getAllRecourses() {
    this._recourseService.getResources().subscribe(
      result => {
        if (result.httpCode === 200) {
          result.recourses.forEach(element => {
            this.arAllRecourses.push(element);
          });
        }
      });
  }
 
  onActionBtnClick(event) {
    this.editChild.createForm(event.data);
    $('#editBillModal').modal('show');
  }
  
  onRowClick(event) {
    console.log(event);
  }
 
  onRowDoubleClick(event) {
    this.editChild.createForm(event);
    $('#editBillModal').modal('show');
  }
 
  onRowSelect(event) {
    console.log(event);
  }

  clickAddBilling() {
    this.addBilling.addBillForm();
  }

  clickInstitutional() {
    this.showTableColumns(true);
    this.isInstitutionalTab = true;
    this.getBillingData();
  }

  clickIndividual() {
    this.showTableColumns(false);
    this.isInstitutionalTab = false;
    this.getBillingData();
  }

  showTableColumns(show) {
    this.columns.forEach(function (data) {
      if (data.uniqueId === 'institutionName') {
        data.display = show;
      }
    });
  }
}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule, SharedModule],
    declarations: [
      BillingComponent,
      AddBillingComponent,
      EditBillingComponent,
    ],
    providers: [BillingService, StorageService, InstitutionService]
  }
)

export class MasterBillingModule { }
