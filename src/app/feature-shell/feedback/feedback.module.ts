import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';

@NgModule(
    {
        imports: [
            FeedbackRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            SharedModule
        ],
        declarations: [ FeedbackComponent]
    }
)
export class FeedbackModule { }
