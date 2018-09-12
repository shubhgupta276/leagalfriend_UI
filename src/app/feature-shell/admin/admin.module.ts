import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { CreateNotificationComponent } from './notification/create-notification/create-notification.component';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CKEditorModule
  ],
  declarations: [CreateNotificationComponent]
})
export class AdminModule { }
