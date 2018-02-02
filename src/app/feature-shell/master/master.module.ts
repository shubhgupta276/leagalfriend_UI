import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { StateComponent } from './state/state.component'
import { StageComponent } from './stage/stage.component'
import { CityComponent } from './city/city.component'
import { DistrictComponent } from './district/district.component'
import { CourtComponent } from './court/court.component'
import { BillingComponent } from './billing/billing.component'
import { AddBillingComponent } from './billing/add-bill/add-bill.component'
import { EditBillingComponent } from './billing/edit-bill/edit-bill.component'
import { InstitutionComponent } from './institution/institution.component'
import { ResourceComponent } from './resource/resource.component'
import { ComplianceComponent } from './compliance/compliance.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule(
    {
        imports: [ MasterRoutingModule , CommonModule,
            FormsModule, ReactiveFormsModule,],
        declarations: [ StateComponent, StageComponent, CityComponent,
            DistrictComponent, CourtComponent, BillingComponent, AddBillingComponent, EditBillingComponent, InstitutionComponent,
            ResourceComponent, ComplianceComponent ]
    }
)    
export class MasterModule {}