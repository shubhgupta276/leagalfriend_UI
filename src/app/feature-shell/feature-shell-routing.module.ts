import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureShellComponent } from './feature-shell.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const featureShellRoutes: Routes = [
    { path: 'admin', component: FeatureShellComponent, children:[
        { path: 'user', loadChildren:'app/feature-shell/user/user.module#UserModule' },
        { path: 'billing', loadChildren:'app/feature-shell/billing/billing.module#BillingModule' },
        { path: 'case', loadChildren:'app/feature-shell/case/case.module#CaseModule' },
        { path: 'master', loadChildren:'app/feature-shell/master/master.module#MasterModule' },
        { path: 'institution', loadChildren:'app/feature-shell/institution/institution.module#InstitutionModule' },
        { path: 'profile', loadChildren:'app/feature-shell/profile/profile.module#ProfileModule' },
        { path: 'calendar', component: CalendarComponent  },
        { path: 'dashboard', component: DashboardComponent },
        { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]}
    ];

@NgModule({
  imports: [RouterModule.forChild(featureShellRoutes)],
  exports: [RouterModule]
})
export class FeatureShellRoutingModule {}