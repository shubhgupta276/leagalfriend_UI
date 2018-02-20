import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage, ListBranch } from '../../../../shared/Utility/util-common';
import { AddForInstitutionComponent } from '../../../institution/for-institution/add-for-institution/add-for-institution.component';
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
    arListBranch: KeyValue[] = ListBranch;
    isCombinationAlreadyExits: boolean = false;
    constructor(private fb: FormBuilder) {

    }
    ngOnInit() {
        this.addBillForm();

    }

    addBillForm() {
        this.addForm = this.fb.group({
            branch: ["", Validators.required],
            bank: ["", Validators.required],
            recourse: ["", Validators.required],
            stage: ["", Validators.required],
            amount: [null, Validators.required]
        });

    }
    changeCombinations() {
        console.log(this.addForm);
        if (this.addForm.get("branch").value == "Delhi" && this.addForm.get("bank").value == "DCB BANK LTD." 
        && this.addForm.get("recourse").value == "RODA" && this.addForm.get("stage").value == "ARGUMENTS")
            this.isCombinationAlreadyExits = true;
        else
            this.isCombinationAlreadyExits = false;
    }


    submitAddBill(data) {
        $.toaster({ priority: 'success', title: 'Success', message: 'Bill added successfully' });
        console.log(data);
        $("#closebtn").click();
        this.addBillForm();
    }
}
