import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthShellModule  } from './auth-shell/auth-shell.module';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { AppComponent } from './app.component';
import { LFAuthantication } from './shared/services/lfAuthantication-service';
const routes: Routes = [
    // { path: 'auth', component: AppComponent, children:[
    //     { path: '', loadChildren:'app/auth-shell/auth-shell.module#AuthShellModule' }
    // ]},
    // { path: 'admin', component: AppComponent, children:[
    //     { path: '', loadChildren:'app/feature-shell/feature-shell.module#FeatureShellModule' }
    // ]},
    { path: 'auth', component: AuthShellModule },
    { path: 'admin', component: FeatureShellModule, canActivate: [LFAuthantication] },
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {enableTracing: true});
