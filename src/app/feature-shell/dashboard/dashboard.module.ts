import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddBranchDashboardComponent } from './add-branch/add-branch.component';
import { AddInstitutionDashboardComponent } from './add-institution/add-institution.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule(
    {
        imports: [
            DashboardRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            SharedModule,
            ChartsModule,
            MatTabsModule
        ],
        declarations: [ DashboardComponent,AddBranchDashboardComponent,AddInstitutionDashboardComponent]
    }
)
export class DashboardModule { }
