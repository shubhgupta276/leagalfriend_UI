import { NgModule } from '@angular/core';
import { MasterRoutingModule } from './master-routing.module';
import { StateComponent } from './state/state.component'
import { StageComponent } from './stage/stage.component'
import { CityComponent } from './city/city.component'
import { DistrictComponent } from './district/district.component'
import { CourtComponent } from './court/court.component'
import { BillingComponent } from './billing/billing.component'
import { InstitutionComponent } from './institution/institution.component'
import { ResourceComponent } from './resource/resource.component'
import { ComplianceComponent } from './compliance/compliance.component'

@NgModule(
    {
        imports: [ MasterRoutingModule ],
        declarations: [ StateComponent, StageComponent, CityComponent,
            DistrictComponent, CourtComponent, BillingComponent, InstitutionComponent,
            ResourceComponent, ComplianceComponent ]
    }
)    
export class MasterModule {}