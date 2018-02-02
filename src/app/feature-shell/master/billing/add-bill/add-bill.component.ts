import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage } from '../../../../shared/Utility/util-common';
declare let $;
@Component({
    selector: 'add-bill-modal',
    templateUrl: '../add-bill/add-bill.component.html',
    styleUrls: ['../add-bill/add-bill.component.css']
})

export class AddBillingComponent implements OnInit {


    addForm: FormGroup;
    arListBanks: KeyValue[] = ListBillingBank;
    arListRecourse: KeyValue[] = ListBillingRecourse;
    arListStage: KeyValue[] = ListBillingStage;
    constructor(private fb: FormBuilder) {
       
    }
    ngOnInit() {
        this.addBillForm();
      }

    addBillForm() {
        this.addForm = this.fb.group({
            bank: ["", Validators.required],
            recourse: ["", Validators.required],
            stage: ["", Validators.required],
            amount: [null, Validators.required]
        });

    }

   
    submitAddBill(data) {
        console.log(data);
    }
}
