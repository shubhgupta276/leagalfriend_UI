import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterRoutingModule } from "./master-routing.module";
import { StateComponent } from "./state/state.component";
import { StageComponent } from "./stage/stage.component";
import { CityComponent } from "./city/city.component";
import { DistrictComponent } from "./district/district.component";
import { CourtComponent } from "./court/court.component";
import { BillingComponent } from "./billing/billing.component";
import { InstitutionComponent } from "./institution/institution.component";
import { BranchComponent } from "./branch/branch.component";
import { ResourceComponent } from "./resource/resource.component";
import { ComplianceComponent } from "./compliance/compliance.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    MasterRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CityComponent,
    DistrictComponent,
    StateComponent,
    CourtComponent,
    BillingComponent,
    StageComponent,
    BranchComponent,
    ComplianceComponent,
    InstitutionComponent,
    ResourceComponent
  ],
  declarations: []
})
export class MasterModule {}
