import { OrganizationdetailComponent } from './systemdashboard/organizationdetail/organizationdetail.component';
import { UserdetailComponent } from './systemdashboard/userdetail/userdetail.component';
import { SystemdashboardComponent } from './systemdashboard/systemdashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureShellComponent } from './feature-shell.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeActiveComponent } from './dashboard/EmployeeActive/employeeActive.component';
import { LFAuthantication } from '../shared/services/lfAuthantication-service';
import { NgxPermissionsGuard, NgxPermissionsService } from 'ngx-permissions';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { RecentcasesComponent } from './case/recentcases/recentcases.component';

const featureShellRoutes: Routes = [
    {
        path: '',
        component: FeatureShellComponent, canActivate: [LFAuthantication], children: [
            {
                path: 'user', loadChildren: 'app/feature-shell/user/user.module#UserModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'ADMIN_LAWYER']
                    }
                }
            },
            {
                path: 'feedback', loadChildren: 'app/feature-shell/feedback/feedback.module#FeedbackModule',
            },
            {
                path: 'billing', loadChildren: 'app/feature-shell/billing/billing.module#BillingModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'MANAGER_LAWYER_FIRM', 'ADMIN_LAWYER']
                    }
                }
            },
            {
                path: 'case', loadChildren: 'app/feature-shell/case/case.module#CaseModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'MANAGER_LAWYER_FIRM', 'EMPLOYEE_LAWYER_FIRM',
                            'ADMIN_LAWYER', 'MANAGER_LAWYER', 'EMPLOYEE_LAWYER',
                            'CLIENT_LAWYER_Individual', 'CLIENT_LAWYER_Institutional', 'CLIENT_LAWYER_FIRM_Individual']
                    }
                },
            },
            {
                path: 'master',
                loadChildren: 'app/feature-shell/master/master.module#MasterModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'ADMIN_LAWYER']
                    }
                },
            },
            {
                // tslint:disable-next-line:max-line-length
                path: 'institution', loadChildren: 'app/feature-shell/institution/institution.module#InstitutionModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'MANAGER_LAWYER_FIRM', 'EMPLOYEE_LAWYER_FIRM', 'CLIENT_LAWYER_FIRM_Institutional']
                    }
                },
            },
            { path: 'profile', loadChildren: 'app/feature-shell/profile/profile.module#ProfileModule' },
            { path: 'Referral', loadChildren: 'app/feature-shell/referral/referral.module#ReferralModule' },
            { path: 'Notification', loadChildren: 'app/feature-shell/notification/notification.module#NotificationModule' },
            { path: 'wallet', loadChildren: 'app/feature-shell/wallet/wallet.module#WalletModule' },
            { path: 'systemdash', component: SystemdashboardComponent },
            { path: 'userdetails', component: UserdetailComponent },
            { path: 'recentcases', component: RecentcasesComponent }, 
            { path: 'orgdetails', component: OrganizationdetailComponent },
            { path: '', loadChildren: 'app/feature-shell/admin/admin.module#AdminModule' },
            {
                path: 'dashboard',
                loadChildren: 'app/feature-shell/dashboard/dashboard.module#DashboardModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'MANAGER_LAWYER_FIRM', 'EMPLOYEE_LAWYER_FIRM',
                            'ADMIN_LAWYER', 'MANAGER_LAWYER', 'EMPLOYEE_LAWYER']
                    }
                }
            },
            {
                path: 'calendar', component: CalendarComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'MANAGER_LAWYER_FIRM', 'EMPLOYEE_LAWYER_FIRM',
                            'ADMIN_LAWYER', 'MANAGER_LAWYER', 'EMPLOYEE_LAWYER']
                    }
                },
            },
            { path: 'employeeactive', component: EmployeeActiveComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            {
                path: 'invoices', loadChildren: 'app/feature-shell/invoices/invoice.module#invoiceModule',
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADMIN_LAWYER_FIRM', 'MANAGER_LAWYER_FIRM']
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
        this.permissionsService.loadPermissions([localStorage.getItem('permission_level')]);
    }
}
