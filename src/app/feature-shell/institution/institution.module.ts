import { NgModule } from '@angular/core';
import { InstitutionRoutingModule } from './institution-routing.module';
import { ForInstitutionComponent } from './for-institution/for-institution.component'
import { AgainstInstitutionComponent } from './against-institution/against-institution.component'

@NgModule(
    {
        imports: [ InstitutionRoutingModule ],
        declarations: [ ForInstitutionComponent, AgainstInstitutionComponent ]
    }
)    
export class InstitutionModule {}