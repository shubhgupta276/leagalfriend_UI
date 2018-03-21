import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage, ListBranch } from '../../../../shared/Utility/util-common';
import { BillingService } from '../billing.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Billing } from '../billing';
import { Branch } from '../../branch/branch';
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
    editForm: FormGroup;
    arListBanks: KeyValue[] = ListBillingBank;
    arListRecourse: KeyValue[] = ListBillingRecourse;
    arListStage: KeyValue[] = ListBillingStage;
    arListBranch: KeyValue[] = ListBranch;
    isCombinationAlreadyExits: boolean = false;
    isBilingAlreadyExists: boolean = false;
    constructor(private fb: FormBuilder,private _billingservice:BillingService,private _storageservice:StorageService) {
        this.createForm(null);
    }
    ngOnInit() {
      //  this.refreshData();
    //   let timer = Observable.timer(2000, 5000);
    //   timer.subscribe(() => this.getRecentDetections());
    }
    
    
    // changeCombinations() {
    //     debugger
    //     console.log(this.editForm);
    //     if (this.editForm.get("branch").value == "Delhi" && this.editForm.get("bank").value == "DCB BANK LTD."
    //         && this.editForm.get("recourse").value == "RODA" && this.editForm.get("stage").value == "ARGUMENTS")
    //         this.isCombinationAlreadyExits = true;
    //     else
    //         this.isCombinationAlreadyExits = false;
    // }
    submitEditBill(data) {
        debugger
        var reqData = {
            id:data.id,
            bankName: data.bank,
            recourseId:data.recourse,
            stageId:data.stage,
            amount:data.amount,
            userId:this._storageservice.getUserId()
            //userId: this._storageservice.getUserId()
          };
          this._billingservice.updateBilling(reqData).subscribe(
      
            result => {
              var _result = result.body;
              if (_result.httpCode == 200) { //success
                $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
                this.closeModal();
                debugger
              
               // this.arbillingData.push({id:data.id,branch:data.branch,bankName: data.bank,recourseId:data.recourse,stageId:data.stage,amount:data.amount,userId:data.userId});
               const objFind = this.arbillingData.find(x => x.id == this.editDetails.id);
               debugger
               objFind.bankName = data.bank;
               objFind.recourseId=data.recourse;
               objFind.stageId=data.stage;
               objFind.amount=data.amount;
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
        debugger
        this.editForm = this.fb.group({
            id: [data == null ? null : data.id, null],
           // branch: [data == null ? null : data.branch, Validators.required],
            bank: [data == null ? null : data.bankName, Validators.required],
            recourse: [data == null ? null : data.recourseId, Validators.required],
            stage: [data == null ? null : data.stageId, Validators.required],
            amount: [data == null ? null : data.amount, Validators.required],
            userId: [data == null ? null : data.userId, null],
        });
        if (data != null) {
            this.isBilingAlreadyExists = false;
            this.editDetails = data;
           //this.subscriberFields();
          }
    }
    subscriberFields() {
        this.editForm.get('recourseId').valueChanges.subscribe(
          (e) => {
           debugger
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
