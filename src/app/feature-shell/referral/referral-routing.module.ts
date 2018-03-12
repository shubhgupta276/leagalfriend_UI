import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralComponent } from './referral.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const referralRoutes: Routes = [
    { path: '', component: ReferralComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(referralRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class ReferralRoutingModule {}