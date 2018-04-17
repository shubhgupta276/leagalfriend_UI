import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-invoice-info',
    templateUrl: './invoice-info.component.html',
    providers: [MasterService]
})

export class InvoiceInfoComponent implements OnInit {
    submitted = false;
    termsCondition: any;
    address: any;
    logo: any;
    photoUrl: any;
    isShowUpload = true;
    invoiceForm: FormGroup;
    editTemplate = false;
    constructor(private fb: FormBuilder, private masterService: MasterService, public sanitizer: DomSanitizer) {}
    ngOnInit() {
        this.getTemplateData();
        this.createForm();
    }
    getTemplateData() {
        const client_id = localStorage.getItem('client_id');
        this.masterService.getInvoiceData(client_id).subscribe(
            result => {
                const templateData = result;
                this.photoUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,' + templateData.invoiceHeader.logo);
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
            terms: ['', Validators.required],
            logo: ['', Validators.required]
        });
        if (this.address) {
            this.invoiceForm.get('addressLine1').setValue(this.address.address1);
            this.invoiceForm.get('addressLine2').setValue(this.address.address2);
            this.invoiceForm.get('city').setValue(this.address.city);
            this.invoiceForm.get('state').setValue(this.address.state);
            this.invoiceForm.get('zipcode').setValue(this.address.zipCode);
        }
        if (this.termsCondition) {
            this.invoiceForm.get('terms').setValue(this.termsCondition);
        }
        if (this.photoUrl || this.photoUrl.changingThisBreaksApplicationSecurity) {
            if (this.photoUrl.changingThisBreaksApplicationSecurity) {
                this.invoiceForm.get('logo').setValue(this.photoUrl.changingThisBreaksApplicationSecurity.split(',')[1]);
            }else {
                this.invoiceForm.get('logo').setValue(this.photoUrl);
            }
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.invoiceForm.valid && this.submitted) {
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
                    this.revert();
                },
                err => {
                    console.log(err.error);
                }
            );
        }
    }
    revert() {
        this.submitted = false;
        this.getTemplateData();
        this.editTemplate = false;
        this.createForm();
    }
    onFileChange(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                this.photoUrl = e.target.result;
                this.invoiceForm.get('logo').setValue(reader.result.split(',')[1]);
            };
        }
    }
    editInvoice() {
        this.editTemplate = true;
        this.createForm();
    }
}
