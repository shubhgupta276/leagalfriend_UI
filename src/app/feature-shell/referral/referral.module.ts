import { NgModule } from '@angular/core';
import { ReferralRoutingModule } from './referral-routing.module';
import { ReferralComponent } from './referral.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule(
    {
        imports: [
            ReferralRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule
        ],
        declarations: [ReferralComponent]
    }
)
export class ReferralModule { }