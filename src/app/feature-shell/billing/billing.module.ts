import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';



@NgModule(
    {
        imports: [ BillingRoutingModule,CommonModule ],
        declarations: [ BillingComponent ]
    }
)    
export class BillingModule {}