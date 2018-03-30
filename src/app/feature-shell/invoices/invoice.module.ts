import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown'


@NgModule(
    {
        imports: [ 
            InvoiceRoutingModule, 
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            SelectDropDownModule
        ],
        declarations: [ InvoiceComponent ]
    }
)    
export class invoiceModule {}