import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage } from '../../../../shared/Utility/util-common';
declare let $;
@Component({
    selector: 'edit-bill-modal',
    templateUrl: '../edit-bill/edit-bill.component.html',
    styleUrls: ['../edit-bill/edit-bill.component.css']
})

export class EditBillingComponent implements OnInit {


    editForm: FormGroup;
    arListBanks: KeyValue[] = ListBillingBank;
    arListRecourse: KeyValue[] = ListBillingRecourse;
    arListStage: KeyValue[] = ListBillingStage;
    constructor(private fb: FormBuilder) {
       
    }
    ngOnInit() {
        this.addBillForm();
      }

    addBillForm() {
        this.editForm = this.fb.group({
            bank: ["", Validators.required],
            recourse: ["", Validators.required],
            stage: ["", Validators.required],
            amount: [null, Validators.required]
        });

    }

    submitEditBill(data) {
        console.log(data);
    }
}
