import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule(
    {
        imports: [ 
            ProfileRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule
        ],
        declarations: [ ProfileComponent ]
    }
)    
export class ProfileModule {}