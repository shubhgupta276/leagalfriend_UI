import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const walletRoutes: Routes = [
    { path: '', component: WalletComponent, pathMatch: 'full'}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(walletRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class WalletRoutingModule {}