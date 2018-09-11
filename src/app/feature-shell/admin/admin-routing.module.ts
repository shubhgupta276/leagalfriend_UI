import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateNotificationComponent } from './notification/create-notification/create-notification.component';

const routes: Routes = [
    { path: 'createnotification', component: CreateNotificationComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
