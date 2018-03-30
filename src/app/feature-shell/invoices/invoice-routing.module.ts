import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';

const caseRoutes: Routes = [
    { path: '', component: InvoiceComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [RouterModule.forChild(caseRoutes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}