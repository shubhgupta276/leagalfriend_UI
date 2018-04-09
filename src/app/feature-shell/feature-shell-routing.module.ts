import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureShellComponent } from './feature-shell.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {EmployeeActiveComponent} from './dashboard/EmployeeActive/employeeActive.component';
import { LFAuthantication } from '../shared/services/lfAuthantication-service'
const featureShellRoutes: Routes = [
    {
        path: 'admin', canActivate:[LFAuthantication], component: FeatureShellComponent, children: [
            { path: 'user', loadChildren: 'app/feature-shell/user/user.module#UserModule' },
            { path: 'billing', loadChildren: 'app/feature-shell/billing/billing.module#BillingModule' },
            { path: 'case', loadChildren: 'app/feature-shell/case/case.module#CaseModule' },
            { path: 'master', loadChildren: 'app/feature-shell/master/master.module#MasterModule' },
            { path: 'institution', loadChildren: 'app/feature-shell/institution/institution.module#InstitutionModule' },
            { path: 'profile', loadChildren: 'app/feature-shell/profile/profile.module#ProfileModule' },
            { path: 'Referral', loadChildren: 'app/feature-shell/referral/referral.module#ReferralModule' },  
            { path: 'Notification', loadChildren: 'app/feature-shell/notification/notification.module#NotificationModule' },
            { path: 'wallet', loadChildren:'app/feature-shell/wallet/wallet.module#WalletModule' },          
            { path: 'calendar', component: CalendarComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'employeeactive', component: EmployeeActiveComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            {path:'invoices', loadChildren: 'app/feature-shell/invoices/invoice.module#invoiceModule' },
           
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(featureShellRoutes)],
    exports: [RouterModule]
})
export class FeatureShellRoutingModule { }