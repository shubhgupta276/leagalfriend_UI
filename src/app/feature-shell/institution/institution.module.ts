import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutionRoutingModule } from './institution-routing.module';
import { ForInstitutionComponent } from './for-institution/for-institution.component'
import { AddForInstitutionComponent } from './for-institution/add-for-institution/add-for-institution.component'
import { AgainstInstitutionComponent } from './against-institution/against-institution.component'
import { EditForInstitutionComponent } from './for-institution/Edit-for-institution/Edit-for-institution.component';
import { InstitutionService } from '../institution/institution.service';
import { StorageService } from '../../shared/services/storage.service';
import { FileValueAccessorDirective } from '../../shared/Directives/fileValueAccessor';
import { FileValidator } from '../../shared/Directives/fileValidator';
import { SharedModule } from '../../shared/shared.module';
import { DataTableModule } from '../../shared/components/data-table/data-table.module';
import { StageService } from '../master/stage/stage.service';
import { HistoryForInstitutionComponent } from './for-institution/history-for-institution/history-for-institution.component';


@NgModule(
    {
        imports: [DataTableModule, InstitutionRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
        declarations: [ForInstitutionComponent, AgainstInstitutionComponent, AddForInstitutionComponent,
            HistoryForInstitutionComponent, EditForInstitutionComponent, FileValueAccessorDirective, FileValidator],
        providers: [InstitutionService, StageService, StorageService]
    }
)

export class InstitutionModule { }