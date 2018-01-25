import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule(
    {
        imports: [ 
            UserRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule
        ],
        declarations: [ UserComponent, AddUserComponent, EditUserComponent ]
    }
)    
export class UserModule {}