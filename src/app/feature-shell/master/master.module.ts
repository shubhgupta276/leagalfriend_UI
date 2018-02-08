import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { StateComponent } from './state/state.component';
import { StageComponent } from './stage/stage.component';
import { CityComponent } from './city/city.component';
import { DistrictComponent } from './district/district.component';
import { CourtComponent } from './court/court.component';
import { BillingComponent } from './billing/billing.component';
import { AddBillingComponent } from './billing/add-bill/add-bill.component'
import { EditBillingComponent } from './billing/edit-bill/edit-bill.component'
import { InstitutionComponent } from './institution/institution.component';
import { BranchComponent } from './branch/branch.component';
import { ResourceComponent } from './resource/resource.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { AddCityMasterComponent } from './city/add-city/add-city.component';
import { EditCityMasterComponent } from './city/edit-city/edit-city.component';
import { AddDistrictMasterComponent } from './district/add-district/add-district.component';
import { EditDistrictMasterComponent } from './district/edit-district/edit-district.component';
import { AddStateMasterComponent } from './state/add-state/add-state.component';
import { EditStateMasterComponent } from './state/edit-state/edit-state.component';
import { AddCourtMasterComponent } from './court/add-court/add-court.component';
import { EditCourtMasterComponent } from './court/edit-court/edit-court.component';
import { EditResourceMasterComponent } from './resource/edit-resource/edit-resource.component';
import { AddResourceMasterComponent } from './resource/add-resource/add-resource.component';
import { AddStageMasterComponent } from './stage/add-stage/add-stage.component';
import { EditStageMasterComponent } from './stage/edit-stage/edit-stage.component';
import { AddComplianceMasterComponent } from './compliance/add-compliance/add-compliance.component';
import { EditComplianceMasterComponent } from './compliance/edit-compliance/edit-compliance.component';
import { AddBranchMasterComponent } from './branch/add-branch/add-branch.component';
import { EditBranchMasterComponent } from './branch/edit-branch/edit-branch.component';
import { AddInstitutionMasterComponent } from './institution/add-institution/add-institution.component';
import { EditInstitutionMasterComponent } from './institution/edit-institution/edit-institution.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule(
    {
        imports: [MasterRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
        declarations: [StateComponent, StageComponent, CityComponent,
            DistrictComponent, CourtComponent, BillingComponent, AddBillingComponent, EditBillingComponent, InstitutionComponent,
            ResourceComponent, ComplianceComponent, BranchComponent, AddCityMasterComponent, EditCityMasterComponent,
            AddDistrictMasterComponent, EditDistrictMasterComponent, AddStateMasterComponent,
            EditStateMasterComponent, AddCourtMasterComponent, EditCourtMasterComponent,
            EditResourceMasterComponent, AddResourceMasterComponent, AddStageMasterComponent,
            EditStageMasterComponent, AddComplianceMasterComponent, EditComplianceMasterComponent,
            AddBranchMasterComponent, EditBranchMasterComponent, AddInstitutionMasterComponent, EditInstitutionMasterComponent]
    }
)
export class MasterModule { }
