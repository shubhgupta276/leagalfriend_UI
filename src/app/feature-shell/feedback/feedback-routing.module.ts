import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback.component';

const userRoutes: Routes = [
    { path: '', component: FeedbackComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}