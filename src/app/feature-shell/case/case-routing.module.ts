import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseComponent } from './case.component';

const caseRoutes: Routes = [
    { path: '', component: CaseComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [RouterModule.forChild(caseRoutes)],
  exports: [RouterModule]
})
export class CaseRoutingModule {}