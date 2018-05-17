import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddBranchDashboardComponent } from './add-branch/add-branch.component';
import { AddInstitutionDashboardComponent } from './add-institution/add-institution.component';

@NgModule(
    {
        imports: [
            DashboardRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            SharedModule
        ],
        declarations: [ DashboardComponent,AddBranchDashboardComponent,AddInstitutionDashboardComponent]
    }
)
export class DashboardModule { }
