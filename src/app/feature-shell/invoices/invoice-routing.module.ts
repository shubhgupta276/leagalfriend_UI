import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceFormComponent } from './invoice-form/invoiceform-component';
const caseRoutes: Routes = [
  { path: '', component: InvoiceComponent, pathMatch: 'full' },
  { path: 'invoiceform', component: InvoiceFormComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(caseRoutes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }