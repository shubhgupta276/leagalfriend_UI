import { NgModule } from '@angular/core';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';


@NgModule(
    {
        imports: [ BillingRoutingModule ],
        declarations: [ BillingComponent ]
    }
)    
export class BillingModule {}