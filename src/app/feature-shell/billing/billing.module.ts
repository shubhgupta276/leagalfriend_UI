import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutionService } from '../../feature-shell/master/institution/institution.service';
import { StorageService } from '../../shared/services/storage.service';
import { EditBillingComponent } from './edit-bill/edit-bill.component';
import { StageService } from '../master/stage/stage.service';
import { RecourseService } from '../master/resource/recourse.service';
import {BillingService} from './billing.service';
import { DataTableModule } from '../../shared/components/data-table/data-table.module';
@NgModule(
    {
        imports: [BillingRoutingModule, CommonModule,FormsModule,ReactiveFormsModule,DataTableModule],
        declarations: [BillingComponent, EditBillingComponent],
        providers: [InstitutionService, StorageService,StageService,RecourseService,BillingService]
    }
)
export class BillingModule { }