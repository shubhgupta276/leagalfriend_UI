import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const userRoutes: Routes = [
    { path: '', component: UserComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}