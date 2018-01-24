import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForInstitutionComponent } from './for-institution/for-institution.component'
import { AgainstInstitutionComponent } from './against-institution/against-institution.component'

const institutionRoutes: Routes = [
    { path: 'forinstitution', component: ForInstitutionComponent},
    { path: 'againstinstitution', component: AgainstInstitutionComponent},
    { path: '', redirectTo:'forinstitution', pathMatch: 'full' }
    ];

@NgModule({
  imports: [RouterModule.forChild(institutionRoutes)],
  exports: [RouterModule]
})
export class InstitutionRoutingModule {}