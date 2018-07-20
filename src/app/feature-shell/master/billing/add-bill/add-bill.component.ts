import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse,
  ListBillingStage, ListBranch
} from '../../../../shared/Utility/util-common';
import { AddForInstitutionComponent } from '../../../institution/for-institution/add-for-institution/add-for-institution.component';
import { BillingService } from '../billing.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Billing } from '../billing';
import { HttpClientModule } from '@angular/common/http';
import { StageService } from '../../stage/stage.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
declare let $;
@Component({
  selector: 'app-add-bill-modal',
  templateUrl: '../add-bill/add-bill.component.html',
  styleUrls: ['../add-bill/add-bill.component.css']
})

export class AddBillingComponent implements OnInit {
  @Input() tableInputData: any[];
  @Input() arAllRecourses: any[] = [];
  @Input() arAllInstitution: any = [];
  @Input() isInstitutionalTab: boolean;
  @Input() @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  isbilingAlreadyExists: Boolean = false;
  addForm: FormGroup;
  arListStage: any[] = [];
  arListBranch: KeyValue[] = ListBranch;
  isCombinationAlreadyExits: boolean = false;
  defaultInstitutionId: number;
  AddbillingMaster() {
  }
  constructor(private fb: FormBuilder, private _stageService: StageService,
    private _billingservice: BillingService, private _storageservice: StorageService) {

  }

  ngOnInit() {
    this.SetDefaultInstitution();
    this.addBillForm();
    this.subscriberFields();

  }

  addBillForm() {
    this.addForm = this.fb.group({
      institutionId: [(this.isInstitutionalTab) ? this.defaultInstitutionId : null, Validators.required],
      recourseId: ['', Validators.required],
      stageId: ['', Validators.required],
      amount: [null, Validators.required]
    });

  }

  SetDefaultInstitution() {
    this.arAllInstitution.forEach(element => {
      if (element.defaultInstitution) {
        this.defaultInstitutionId = element.id;
      }
    });
  }

  changeCombinations() {
    console.log(this.addForm);
    if (this.addForm.get('bank').value === 'DCB BANK LTD.'
      && this.addForm.get('recourse').value === 'RODA' && this.addForm.get('stage').value === 'ARGUMENTS') {
      this.isCombinationAlreadyExits = true;
    } else {
      this.isCombinationAlreadyExits = false;
    }
  }

  changeRecourse(recourseId) {
    this.arListStage = [];
    this._stageService.getRecourseStages(recourseId).subscribe(
      result => {
        if (result.httpCode === 200) {
          result.stageRecourses.forEach(element => {
            this.arListStage.push(element);
          });
        }
      });
  }

  submitAddBill(data: any) {
    const objRecourse = this.arAllRecourses.find(x => x.id == data.recourseId);
    const objStage = this.arListStage.find(x => x.id == data.stageId);
    const objInstitution = this.arAllInstitution.find(x => x.id == data.institutionId);

    const reqData = {
      amount: data.amount,
      institution: {
        id: data.institutionId
      },
      recourse: {
        id: objRecourse.id,
        recourseCode: objRecourse.recourseCode,
        recourseDesc: objRecourse.recourseDesc,
        recourseName: objRecourse.recourseName,
        userId: objRecourse.userId
      },
      stage: {
        id: objStage.id,
        recourseId: objStage.recourseId,
        stageCode: objStage.stageCode,
        stageName: objStage.stageName,
        statusId: objStage.stageStatusId,
        userId: objStage.userId
      },
      userId: parseInt(this._storageservice.getUserId())
    };
    this._billingservice.addBilling(reqData).subscribe(
      result => {
        const _result = result.body;
        if (_result.httpCode === 200) { // success

          this.tableInputData.push({
            id: _result.id,
            amount: parseFloat(data.amount),
            recourseName: objRecourse.recourseName,
            recourseId: parseInt(data.recourseId),
            stageId: parseInt(data.stageId),
            stageName: objStage.stageName,
            userId: this._storageservice.getUserId(),
            address: "",
            billingAddr: "",
            contactName: "",
            fkCity: 0,
            phone: "",
            institutionId: parseInt(objInstitution.id),
            institutionName: objInstitution.institutionName
          });
          this.dataTableComponent.ngOnInit();
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.addBillForm();
          this.subscriberFields();
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
        }
        $('#closebtn').click();
      },
      err => {
        console.log(err);
      });
  }

  subscriberFields() {
    this.addForm.get('recourseId').valueChanges.subscribe(
      (e) => {
        if (this.tableInputData.filter(x => x.recourseId === e.recourseId).length > 0) {
          this.isbilingAlreadyExists = true;
        } else {
          this.isbilingAlreadyExists = false;
        }
      }
    );
  }
}
