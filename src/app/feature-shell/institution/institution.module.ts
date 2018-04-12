import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutionRoutingModule } from './institution-routing.module';
import { ForInstitutionComponent } from './for-institution/for-institution.component'
import { AddForInstitutionComponent  } from './for-institution/add-for-institution/add-for-institution.component'
import { AgainstInstitutionComponent } from './against-institution/against-institution.component'
import { EditForInstitutionComponent  } from './for-institution/Edit-for-institution/Edit-for-institution.component';
import { InstitutionService } from '../institution/institution.service';
import { StorageService } from '../../shared/services/storage.service';
import { FileValueAccessorDirective  } from '../../shared/Directives/fileValueAccessor';
import { FileValidator } from '../../shared/Directives/fileValidator';
import { SharedModule } from '../../shared/shared.module';


@NgModule(
    {
        imports: [ InstitutionRoutingModule ,CommonModule, FormsModule, ReactiveFormsModule,SharedModule],
        declarations: [ ForInstitutionComponent, AgainstInstitutionComponent, AddForInstitutionComponent,
                        EditForInstitutionComponent,FileValueAccessorDirective,FileValidator],
        providers : [InstitutionService,StorageService]
    }
)    

export class InstitutionModule {}