import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseComponent } from './case.component';
import { AddCaseComponent } from './Add-case/Add-case.component';
import { EditCaseComponent } from './edit-case/edit-case.component';

const caseRoutes: Routes = [
  { path: '', component: CaseComponent, pathMatch: 'full' },
  { path: 'addcase', component: AddCaseComponent, pathMatch: 'full' },
  { path: 'editcase/:id/:isCompliance', component: EditCaseComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(caseRoutes)],
  exports: [RouterModule]
})
export class CaseRoutingModule { }
