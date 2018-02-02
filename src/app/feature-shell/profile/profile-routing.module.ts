import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const profileRoutes: Routes = [
    { path: '', component: ProfileComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}