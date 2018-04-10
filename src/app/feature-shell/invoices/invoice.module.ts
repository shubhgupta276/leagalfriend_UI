import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceFormComponent } from './invoice-form/invoiceform-component';
import { InvoiceNextFormComponent } from './invoice-nextform/invoicenextform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { StorageService } from '../../shared/services/storage.service';
import { InstitutionService } from '../../feature-shell/master/institution/institution.service';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule(
    {
        imports: [ 
            InvoiceRoutingModule, 
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            SelectDropDownModule,
            SharedModule,
            NgxPaginationModule
        ],
        declarations: [ InvoiceComponent ,InvoiceFormComponent,InvoiceNextFormComponent],
        providers: [InstitutionService,StorageService]
       
    }
)    
export class invoiceModule {}
