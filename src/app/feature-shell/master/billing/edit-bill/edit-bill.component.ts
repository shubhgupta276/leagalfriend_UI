import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  UserRoles, UserStatus, KeyValue, ListBillingBank,
  ListBillingRecourse, ListBillingStage, ListBranch
} from '../../../../shared/Utility/util-common';
import { BillingService } from '../billing.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Billing } from '../billing';
import { Branch } from '../../branch/branch';
import { StageService } from '../../stage/stage.service';
import { request } from 'https';
declare let $;
@Component({
  selector: 'app-edit-bill-modal',
  templateUrl: '../edit-bill/edit-bill.component.html',
  styleUrls: ['../edit-bill/edit-bill.component.css']
})

export class EditBillingComponent implements OnInit {

  @Input() editDetails: Billing;
  @Input() isInstitutionalTab: boolean;
  @Input() tableInputData: Billing[];
  @Input() arAllRecourses: any[] = [];
  @Input() arAllInstitution: any = [];
  editForm: FormGroup;
  arListStage: any[] = [];
  arListBranch: KeyValue[] = ListBranch;
  isCombinationAlreadyExits: boolean = false;
  isBilingAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _stageService: StageService,
    private _billingservice: BillingService, private _storageservice: StorageService) {
    this.createForm(null);
  }
  ngOnInit() {
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

  submitEditBill(data) {
    const objRecourse = this.arAllRecourses.find(x => x.id == data.recourse);
    const objStage = this.arListStage.find(x => x.id == data.stage);
    const objInstitution = this.arAllInstitution.find(x => x.id == data.institutionId);
    const reqData = {
      id: data.id,
      institution: {
        address: data.address,
        billingAddr: data.billingAddr,
        contactName: data.contactName,
        fkCity: data.fkCity,
        phone: data.phone,
        id: (objInstitution) ? objInstitution.id : null,
        institutionName: (objInstitution) ? objInstitution.institutionName : null,
      },
      recourse: {
        id: objRecourse.id,
        recourseCode: objRecourse.recourseCode,
        recourseDesc: objRecourse.recourseDesc,
        recourseName: objRecourse.recourseName,
        userId: this._storageservice.getUserId()
      },
      stage: {
        id: objStage.id,
        recourseId: objStage.recourseId,
        stageCode: objStage.stageCode,
        stageName: objStage.stageName,
        statusId: objStage.stageStatusId,
        userId: this._storageservice.getUserId()
      },
      amount: data.amount,
      userId: this._storageservice.getUserId()
    };
    if (!this.isInstitutionalTab) {
      delete reqData.institution;
    }
    this._billingservice.updateBilling(reqData, this.isInstitutionalTab).subscribe(

      result => {
        const _result = result.body;
        if (_result.httpCode === 200) { // success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          const objFind = this.tableInputData.find(x => x.id === this.editDetails.id);
          objFind.recourseName = objRecourse.recourseName;
          objFind.stageName = objStage.stageName;
          objFind.institutionName = (objInstitution) ? objInstitution.institutionName : '';
          objFind.institutionId = (objInstitution) ? objInstitution.id : 0;
          objFind.recourseId = data.recourse;
          objFind.stageId = data.stage;
          objFind.amount = data.amount;
          this.closeModal();
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $('.closebtn').click();
  }

  createForm(data) {

    if (data != null) {
      this.isBilingAlreadyExists = false;
      this.editDetails = data;
      this.changeRecourse(data.recourseId);
    }
    this.editForm = this.fb.group({
      id: [data == null ? null : data.id, null],
      institutionId: [data == null ? null : data.institutionId],
      recourse: [data == null ? null : data.recourseId, Validators.required],
      stage: [data == null ? null : data.stageId, Validators.required],
      amount: [data == null ? null : data.amount, Validators.required],
      userId: [data == null ? null : data.userId, null],
      address: [data == null ? null : data.address, null],
      billingAddr: [data == null ? null : data.billingAddr, null],
      contactName: [data == null ? null : data.contactName, null],
      fkCity: [data == null ? null : data.fkCity, null],
      phone: [data == null ? null : data.phone, null],
      institutionName: [data == null ? null : data.institutionName, null],
    });

  }

  subscriberFields() {
    this.editForm.get('recourseId').valueChanges.subscribe(
      (e) => {

        const fieldValue = e;
        if (this.editDetails.recourseId !== fieldValue
          && this.tableInputData.filter(x => x.recourseId === fieldValue).length > 0) {
          this.isBilingAlreadyExists = true;
        } else {
          this.isBilingAlreadyExists = false;
        }
      }
    );
  }
}
