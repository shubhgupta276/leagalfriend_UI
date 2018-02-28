import { NgModule } from '@angular/core';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule(
    {
        imports: [
            NotificationRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule
        ],
        declarations: [NotificationComponent]
    }
)
export class NotificationModule { }