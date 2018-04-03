import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceFormComponent } from './invoice-form/invoiceform-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SelectDropDownModule } from 'ngx-select-dropdown'



@NgModule(
    {
        imports: [ 
            InvoiceRoutingModule, 
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            SelectDropDownModule,
            SharedModule
        ],
        declarations: [ InvoiceComponent ,InvoiceFormComponent]
    }
)    
export class invoiceModule {}
