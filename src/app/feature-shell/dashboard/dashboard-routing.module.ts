import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

const userRoutes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}