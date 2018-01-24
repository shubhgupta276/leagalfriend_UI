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

@NgModule({
    imports: [ 
      // UserModule,
      // BillingModule, 
      // CaseModule, 
      // MasterModule, 
      // InstitutionModule, 
      FeatureShellRoutingModule
    ],
  
   declarations: [FeatureShellComponent, CalendarComponent, DashboardComponent]
  })
  export class FeatureShellModule {}