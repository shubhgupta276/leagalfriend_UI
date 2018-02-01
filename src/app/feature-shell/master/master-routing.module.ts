import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateComponent } from './state/state.component'
import { StageComponent } from './stage/stage.component'
import { CityComponent } from './city/city.component'
import { DistrictComponent } from './district/district.component'
import { CourtComponent } from './court/court.component'
import { BillingComponent } from './billing/billing.component'
import { InstitutionComponent } from './institution/institution.component'
import { ResourceComponent } from './resource/resource.component'
import { ComplianceComponent } from './compliance/compliance.component'
import { BranchComponent } from "./branch/branch.component";

const masterRoutes: Routes = [
    { path: 'state', component: StateComponent},
    { path: 'stage', component: StageComponent},
    { path: 'city', component: CityComponent},
    { path: 'district', component: DistrictComponent},
    { path: 'court', component: CourtComponent},
    { path: 'billing', component: BillingComponent},
    { path: 'institution', component: InstitutionComponent},
    { path: 'resource', component: ResourceComponent},
    { path: 'compliance', component: ComplianceComponent},
    { path: 'branch', component: BranchComponent},
    { path: '', redirectTo:'city', pathMatch: 'full' }
    ];

@NgModule({
  imports: [RouterModule.forChild(masterRoutes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}