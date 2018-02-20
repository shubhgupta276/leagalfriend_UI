import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue, ListBillingBank, ListBillingRecourse, ListBillingStage, ListBranch } from '../../../../shared/Utility/util-common';
declare let $;
@Component({
    selector: 'edit-bill-modal',
    templateUrl: '../edit-bill/edit-bill.component.html',
    styleUrls: ['../edit-bill/edit-bill.component.css']
})

export class EditBillingComponent implements OnInit, OnChanges {


    @Input() editDetails: any;
    editForm: FormGroup;
    arListBanks: KeyValue[] = ListBillingBank;
    arListRecourse: KeyValue[] = ListBillingRecourse;
    arListStage: KeyValue[] = ListBillingStage;
    arListBranch: KeyValue[] = ListBranch;
    isCombinationAlreadyExits: boolean = false;
    constructor(private fb: FormBuilder) {
        this.createForm(null);
    }
    ngOnInit() {

    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.editDetails.currentValue !== undefined) {
            this.createForm(changes.editDetails.currentValue);
        }
    }
    changeCombinations() {
        console.log(this.editForm);
        if (this.editForm.get("branch").value == "Delhi" && this.editForm.get("bank").value == "DCB BANK LTD."
            && this.editForm.get("recourse").value == "RODA" && this.editForm.get("stage").value == "ARGUMENTS")
            this.isCombinationAlreadyExits = true;
        else
            this.isCombinationAlreadyExits = false;
    }
    submitEditBill(data) {
        $.toaster({ priority: 'success', title: 'Success', message: 'Bill update successfully' });
        console.log(data);
        $(".closebtn").click();
    }

    createForm(data) {
        this.editForm = this.fb.group({
            branch: [data == null ? null : data.Branch, Validators.required],
            bank: [data == null ? null : data.Bank, Validators.required],
            recourse: [data == null ? null : data.Recourse, Validators.required],
            stage: [data == null ? null : data.Stage, Validators.required],
            amount: [data == null ? null : data.Amount, Validators.required]
        });

    }
}
