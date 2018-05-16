import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureShellComponent } from './feature-shell.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeActiveComponent } from './dashboard/EmployeeActive/employeeActive.component';
import { LFAuthantication } from '../shared/services/lfAuthantication-service';
import { NgxPermissionsGuard, NgxPermissionsService } from 'ngx-permissions';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const featureShellRoutes: Routes = [
    {
        path: 'admin',
        component: FeatureShellComponent, canActivate: [LFAuthantication], children: [
            {
                path: 'user', loadChildren: 'app/feature-shell/user/user.module#UserModule', canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'MANAGER']
                    }
                }
            },
            {
                path: 'feedback', loadChildren: 'app/feature-shell/feedback/feedback.module#FeedbackModule',
            },
            {
                path: 'billing', loadChildren: 'app/feature-shell/billing/billing.module#BillingModule', canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'MANAGER']
                    }
                }
            },
            { path: 'case', loadChildren: 'app/feature-shell/case/case.module#CaseModule' },
            {
                path: 'master',
                loadChildren: 'app/feature-shell/master/master.module#MasterModule', canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN']
                    }
                },
            },
            {
                path: 'institution', loadChildren: 'app/feature-shell/institution/institution.module#InstitutionModule', canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'MANAGER', 'EMPLOYEE']
                    }
                },
            },
            { path: 'profile', loadChildren: 'app/feature-shell/profile/profile.module#ProfileModule' },
            { path: 'Referral', loadChildren: 'app/feature-shell/referral/referral.module#ReferralModule' },
            { path: 'Notification', loadChildren: 'app/feature-shell/notification/notification.module#NotificationModule' },
            { path: 'wallet', loadChildren: 'app/feature-shell/wallet/wallet.module#WalletModule' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'calendar', component: CalendarComponent, canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'MANAGER', 'EMPLOYEE']
                    }
                },
            },
            { path: 'employeeactive', component: EmployeeActiveComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            {
                path: 'invoices', loadChildren: 'app/feature-shell/invoices/invoice.module#invoiceModule', canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN', 'MANAGER', 'EMPLOYEE']
                    }
                },
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(featureShellRoutes)],
    exports: [RouterModule]
})
export class FeatureShellRoutingModule {

    constructor(private permissionsService: NgxPermissionsService) {
        this.permissionsService.loadPermissions([localStorage.getItem("userRole")]);
    }
}