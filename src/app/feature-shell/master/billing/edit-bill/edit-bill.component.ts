import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage, ListBranch } from '../../../../shared/Utility/util-common';
import { BillingService } from '../billing.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Billing } from '../billing';
import { Branch } from '../../branch/branch';
import { StageService } from '../../stage/stage.service';
declare let $;
@Component({
  selector: 'edit-bill-modal',
  templateUrl: '../edit-bill/edit-bill.component.html',
  styleUrls: ['../edit-bill/edit-bill.component.css']
})

export class EditBillingComponent implements OnInit {

  @Input() editDetails: Billing;
  // @Input() updateDetails: Billing;
  @Input() arbillingData: Billing[];
  @Input() arAllRecourses: any[] = [];
  @Input() arAllInstitution: any = [];
  editForm: FormGroup;
  arListStage: any[] = [];
  arListBranch: KeyValue[] = ListBranch;
  isCombinationAlreadyExits: boolean = false;
  isBilingAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _stageService: StageService, private _billingservice: BillingService, private _storageservice: StorageService) {
    this.createForm(null);
  }
  ngOnInit() {
    //  this.refreshData();
    //   let timer = Observable.timer(2000, 5000);
    //   timer.subscribe(() => this.getRecentDetections());
  }


  // changeCombinations() {
  //       
  //     console.log(this.editForm);
  //     if (this.editForm.get("branch").value == "Delhi" && this.editForm.get("bank").value == "DCB BANK LTD."
  //         && this.editForm.get("recourse").value == "RODA" && this.editForm.get("stage").value == "ARGUMENTS")
  //         this.isCombinationAlreadyExits = true;
  //     else
  //         this.isCombinationAlreadyExits = false;
  // }

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

  submitEditBill(data) {
    const objRecourse = this.arAllRecourses.find(x => x.id == data.recourse);
    const objStage = this.arListStage.find(x => x.id == data.stage);

    var reqData = {
      id: data.id,
      bankName: data.bank,
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
      amount: data.amount,
      userId: this._storageservice.getUserId()
    };
    
    this._billingservice.updateBilling(reqData).subscribe(

      result => {
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();

          const objFind = this.arbillingData.find(x => x.id == this.editDetails.id);
          objFind.recourseName = objRecourse.recourseName;
          objFind.stageName = objStage.stageName;
          objFind.bankName = data.bank;
          objFind.recourseId = data.recourse;
          objFind.stageId = data.stage;
          objFind.amount = data.amount;
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });

      },
      err => {
        console.log(err);
      });
    // $.toaster({ priority: 'success', title: 'Success', message: 'Bill update successfully' });
    // console.log(data);
    // $(".closebtn").click();
  }

  closeModal() {
    $(".closebtn").click();
  }

  createForm(data) {
    if (data != null) {
      this.isBilingAlreadyExists = false;
      this.editDetails = data;
      this.changeRecourse(data.recourseId);
    }
    this.editForm = this.fb.group({
      id: [data == null ? null : data.id, null],
      bank: [data == null ? null : data.bankName, Validators.required],
      recourse: [data == null ? null : data.recourseId, Validators.required],
      stage: [data == null ? null : data.stageId, Validators.required],
      amount: [data == null ? null : data.amount, Validators.required],
      userId: [data == null ? null : data.userId, null],
    });

  }

  subscriberFields() {
    this.editForm.get('recourseId').valueChanges.subscribe(
      (e) => {

        var fieldValue = e;
        if (this.editDetails.recourseId != fieldValue && this.arbillingData.filter(x => x.recourseId == fieldValue).length > 0)
          this.isBilingAlreadyExists = true;
        else {
          this.isBilingAlreadyExists = false;
        }
      }
    );
  }
}
