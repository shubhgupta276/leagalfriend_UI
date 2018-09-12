import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddBranchDashboardComponent } from './add-branch/add-branch.component';
import { AddInstitutionDashboardComponent } from './add-institution/add-institution.component';
import { MatTabsModule, } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material';
import { InvoicechartComponent } from './invoice-chart/invoice-chart.component';
import { DashboardTilesComponent } from './dashboard-tiles/dashboard-tiles.component';


@NgModule(
    {
        imports: [
            DashboardRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            SharedModule,
            MatTabsModule,
            MatSelectModule,
            MatFormFieldModule
        ],
        declarations: [ DashboardComponent,AddBranchDashboardComponent,AddInstitutionDashboardComponent, InvoicechartComponent, DashboardTilesComponent]
    }
)
export class DashboardModule { }
