import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { StateComponent, StateModule } from './state/state.component';
import { StageComponent, StageModule } from './stage/stage.component';
import { CityComponent, CityModule } from './city/city.component';
import { DistrictComponent, DistrictModule } from './district/district.component';
import { CourtComponent, CourtModule } from './court/court.component';
import { BillingComponent, MasterBillingModule } from './billing/billing.component';
import { InstitutionComponent, MasterInstitutionModule } from './institution/institution.component';
import { BranchComponent, BranchModule } from './branch/branch.component';
import { ResourceComponent, RecourseModule } from './resource/resource.component';
import { ComplianceComponent, ComplianceModule } from './compliance/compliance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { InvoiceInfoComponent } from './invoice-info/invoice-info.component';
import { MasterTemplatesComponent, MasterTemplateModule } from './masterTemplates/masterTemplate.component';

@NgModule({
  imports: [
    MasterRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CityModule,
    DistrictModule,
    CourtModule,
    MasterBillingModule,
    StageModule,
    BranchModule,
    ComplianceModule,
    MasterInstitutionModule,
    RecourseModule,
    MasterTemplateModule,

    StateModule
  ],
  declarations: [InvoiceInfoComponent]
})
export class MasterModule {}
