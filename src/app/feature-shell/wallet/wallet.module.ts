import { NgModule } from '@angular/core';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule(
    {
        imports: [ 
            WalletRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule
        ],
        declarations: [ WalletComponent ]
    }
)    
export class WalletModule {}