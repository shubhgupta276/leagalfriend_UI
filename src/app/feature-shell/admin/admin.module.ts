import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { CreateNotificationComponent } from './notification/create-notification/create-notification.component';
import { AutocompleteModule } from 'ng2-input-autocomplete';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CKEditorModule,
    AutocompleteModule.forRoot()
  ],
  declarations: [CreateNotificationComponent]
})
export class AdminModule { }
