import { NgModule } from '@angular/core';
import { FeatureShellRoutingModule } from './feature-shell-routing.module';
import { FeatureShellComponent } from './feature-shell.component';
// import { UserModule } from './user/user.module';
// import { BillingModule } from './billing/billing.module';
// import { CaseModule } from './case/case.module';
// import { MasterModule } from './master/master.module';
// import { InstitutionModule } from './institution/institution.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from '../auth-shell/auth-shell.service';
import {CommonModule} from '@angular/common';
import { EmployeeActiveComponent } from './dashboard/EmployeeActive/employeeActive.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { CustomSingleSelectComponent } from '../shared/custom-single-select/custom-single-select.component';
import { ClickOutsideModule } from 'ng4-click-outside';
@NgModule({
  imports: [
    // UserModule,
    // BillingModule,
    // CaseModule,
    // MasterModule,
    // InstitutionModule,
    SelectDropDownModule,
    FeatureShellRoutingModule,
    ClickOutsideModule,
    CommonModule 
  ],
  declarations: [FeatureShellComponent, 
    CalendarComponent, DashboardComponent,EmployeeActiveComponent, CustomSingleSelectComponent
  ],
  providers: [AuthService]
})
export class FeatureShellModule { }
