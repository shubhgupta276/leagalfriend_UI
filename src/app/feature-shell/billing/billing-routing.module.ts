import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing.component';

const billingRoutes: Routes = [
    { path: '', component: BillingComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [RouterModule.forChild(billingRoutes)],
  exports: [RouterModule]
})
export class BillingRoutingModule {}