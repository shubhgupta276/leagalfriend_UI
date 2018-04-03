import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';

import { InstitutionService } from '../../feature-shell/master/institution/institution.service';
import { StorageService } from '../../shared/services/storage.service';

@NgModule(
    {
        imports: [ BillingRoutingModule,CommonModule ],
        declarations: [ BillingComponent ],
        providers: [InstitutionService,StorageService]
    }
)    
export class BillingModule {}