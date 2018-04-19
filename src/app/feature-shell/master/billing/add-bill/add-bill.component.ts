import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage, ListBranch } from '../../../../shared/Utility/util-common';
import { AddForInstitutionComponent } from '../../../institution/for-institution/add-for-institution/add-for-institution.component';
import { BillingService } from '../billing.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Billing } from '../billing';
import { HttpClientModule } from '@angular/common/http';
import { StageService } from '../../stage/stage.service';
declare let $;
@Component({
  selector: 'add-bill-modal',
  templateUrl: '../add-bill/add-bill.component.html',
  styleUrls: ['../add-bill/add-bill.component.css']
})

export class AddBillingComponent implements OnInit {
  @Input() arbillingData: Billing[];
  @Input() arAllRecourses: any[] = [];
  @Input() arAllInstitution: any = [];
  isbilingAlreadyExists: Boolean = false;
  addForm: FormGroup;
  arListStage: any[] = [];
  arListBranch: KeyValue[] = ListBranch;
  isCombinationAlreadyExits: boolean = false;
  AddbillingMaster() {
  }
  constructor(private fb: FormBuilder, private _stageService: StageService, private _billingservice: BillingService, private _storageservice: StorageService) {

  }

  ngOnInit() {
    this.addBillForm();
    this.subscriberFields();

  }

  addBillForm() {
    this.addForm = this.fb.group({
      //branch: ["", Validators.required],
      bankName: ["", Validators.required],
      recourseId: ["", Validators.required],
      stageId: ["", Validators.required],
      amount: [null, Validators.required]
    });

  }

  changeCombinations() {
    console.log(this.addForm);
    if (this.addForm.get("bank").value == "DCB BANK LTD."
      && this.addForm.get("recourse").value == "RODA" && this.addForm.get("stage").value == "ARGUMENTS")
      this.isCombinationAlreadyExits = true;
    else
      this.isCombinationAlreadyExits = false;
  }

  changeRecourse(recourseId) {
    this.arListStage = [];
    this._stageService.getRecourseStages(recourseId).subscribe(
      result => {
        if (result.httpCode == 200) {
          result.stageRecourses.forEach(element => {
            this.arListStage.push(element);
          });
        }
      })
  }

  submitAddBill(data: Billing) {

    var reqData = {
      bankName: data.bankName,
      recourseId: data.recourseId,
      stageId: data.stageId,
      amount: data.amount,
      userId: this._storageservice.getUserId()
    };
    this._billingservice.addBilling(reqData).subscribe(
      result => {

        var _result = result.body;
        if (_result.httpCode == 200) { //success
          const objRecourse = this.arAllRecourses.find(x => x.id == data.recourseId);
          const objStage = this.arListStage.find(x => x.id == data.stageId);
          this.arbillingData.push({
            id: _result.id, bankName: data.bankName, recourseId: data.recourseId,
            recourseName: objRecourse.recourseName, stageName: objStage.stageName,
            stageId: data.stageId, amount: data.amount, userId: data.userId
          });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          $("#closebtn").click();
          this.addBillForm();
          this.subscriberFields();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
      },
      err => {
        console.log(err);
      });
  }

  subscriberFields() {
    this.addForm.get('recourseId').valueChanges.subscribe(
      (e) => {
        if (this.arbillingData.filter(x => x.recourseId == e.recourseId).length > 0)
          this.isbilingAlreadyExists = true;
        else {
          this.isbilingAlreadyExists = false;
        }
      }
    );
  }
}
