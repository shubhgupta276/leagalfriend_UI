import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { ForInstitutionComponent } from './for-institution/for-institution.component'
import { AgainstInstitutionComponent } from './against-institution/against-institution.component'

@NgModule(
    {
        imports: [ InstitutionRoutingModule ,CommonModule],
        declarations: [ ForInstitutionComponent, AgainstInstitutionComponent ]
    }
)    
export class InstitutionModule {}