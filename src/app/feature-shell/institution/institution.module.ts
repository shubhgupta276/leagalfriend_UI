import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutionRoutingModule } from './institution-routing.module';
import { ForInstitutionComponent } from './for-institution/for-institution.component'
import { AddForInstitutionComponent  } from './for-institution/add-for-institution/add-for-institution.component'
import { AgainstInstitutionComponent } from './against-institution/against-institution.component'


@NgModule(
    {
        imports: [ InstitutionRoutingModule ,CommonModule, FormsModule, ReactiveFormsModule],
        declarations: [ ForInstitutionComponent, AgainstInstitutionComponent, AddForInstitutionComponent ]
    }
)    
export class InstitutionModule {}