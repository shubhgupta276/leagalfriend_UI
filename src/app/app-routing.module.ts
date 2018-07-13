import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthShellModule  } from './auth-shell/auth-shell.module';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { LFAuthantication } from './shared/services/lfAuthantication-service'
import { AppComponent } from './app.component';
const routes: Routes = [
    { path: 'auth', component: AuthShellModule },
    { path: 'admin', loadChildren: 'app/feature-shell/feature-shell.module#FeatureShellModule' },
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {enableTracing: false});
