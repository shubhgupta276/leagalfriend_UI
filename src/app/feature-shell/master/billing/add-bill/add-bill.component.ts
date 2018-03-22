import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage, ListBranch } from '../../../../shared/Utility/util-common';
import { AddForInstitutionComponent } from '../../../institution/for-institution/add-for-institution/add-for-institution.component';
import { BillingService } from '../billing.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Billing } from '../billing';
import { HttpClientModule } from '@angular/common/http';
declare let $;
@Component({
    selector: 'add-bill-modal',
    templateUrl: '../add-bill/add-bill.component.html',
    styleUrls: ['../add-bill/add-bill.component.css']
})

export class AddBillingComponent implements OnInit {
    @Input() arbillingData: Billing[];
    isbilingAlreadyExists: Boolean = false;
    addForm: FormGroup;
    arListBanks: KeyValue[] = ListBillingBank;
    arListRecourse: KeyValue[] = ListBillingRecourse;
    arListStage: KeyValue[] = ListBillingStage;
    arListBranch: KeyValue[] = ListBranch;
    isCombinationAlreadyExits: boolean = false;
    AddbillingMaster() {
        this.addForm = this.fb.group({
        //branch: [null, Validators.required]

        });
      }
    constructor(private fb: FormBuilder,private _billingservice:BillingService,private _storageservice:StorageService ) {
    
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


    submitAddBill(data:Billing) {
        // $.toaster({ priority: 'success', title: 'Success', message: 'Bill added successfully' });
        // console.log(data);
        // $("#closebtn").click();
        // this.addBillForm();
        debugger;
        var reqData = {
           // branch:data.branch,
            bankName: data.bankName,
            recourseId:data.recourseId,
            stageId:data.stageId,
            amount:data.amount,
            userId:this._storageservice.getUserId()
          };
          this._billingservice.addBilling(reqData).subscribe(
            result => {
               debugger
              var _result = result.body;
              debugger
              if (_result.httpCode == 200) { //success
                this.arbillingData.push({id:data.id,bankName: data.bankName,recourseId:data.recourseId,stageId:data.stageId,amount:data.amount,userId:data.userId});
                $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
                //this.AddbillingMaster();
                //this.closeModal();
                //this.subscriberFields();
                //$.toaster({ priority: 'success', title: 'Success', message: 'Bill added successfully' });
                console.log(data);
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
