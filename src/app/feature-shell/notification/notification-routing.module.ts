import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const referralRoutes: Routes = [
    { path: '', component: NotificationComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(referralRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class NotificationRoutingModule {}