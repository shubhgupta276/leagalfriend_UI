import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../master.service';

@Component({
    selector: 'app-invoice-info',
    templateUrl: './invoice-info.component.html',
    providers: [MasterService]
})

export class InvoiceInfoComponent implements OnInit {
    termsCondition: any;
    address: any;
    logo: any;
    photoUrl: any;
    isShowUpload = true;
    invoiceForm: FormGroup;
    editTemplate = false;
    constructor(private fb: FormBuilder, private masterService: MasterService) {
        this.getTemplateData();
        this.createForm();
    }
    ngOnInit() {
        //
    }
    getTemplateData() {
        const client_id = localStorage.getItem('client_id');
        this.masterService.getInvoiceData(client_id).subscribe(
            result => {
                const templateData = result;
                this.photoUrl = templateData.invoiceHeader.logo;
                this.address = templateData.invoiceFooter.address;
                this.termsCondition = templateData.invoiceFooter.termsCondition;
            }
        );
    }
    createForm() {
        this.invoiceForm = this.fb.group({
            addressLine1: ['', Validators.required],
            addressLine2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipcode: ['', Validators.required],
            // description: ['', Validators.required],
            terms: ['', Validators.required],
            logo: ['', Validators.required]
        });
    }
    onSubmit() {
        const data = this.invoiceForm.value;
        const client_id = localStorage.getItem('client_id');
        const invoiceModelData = {
            'id': client_id,
            'invoiceFooter': {
                'address': {
                    'address1': data.addressLine1,
                    'address2': data.addressLine2,
                    'city': data.city,
                    'state': data.state,
                    'zipCode': data.zipcode
                },
                'id': client_id,
                'termsCondition': data.terms
            },
            'invoiceHeader': {
                'id': client_id,
                'logo': data.logo
            },
            'userId': client_id
        };
        this.masterService.createInvoice(invoiceModelData).subscribe(
            result => {
                console.log(result);
                // this.revert();
            },
            err => {
                console.log(err.error);
            }
        );
    }
    revert() {
        this.invoiceForm.reset();
        this.photoUrl = '';
    }
    onFileChange(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                this.photoUrl = e.target.result;
                this.invoiceForm.get('logo').setValue(reader.result.split(',')[1]);
                // this.photoUrl = event.target.result;
            };
        }
    }
    editInvoice() {
        this.editTemplate = true;
    }
}
