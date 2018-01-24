import { NgModule } from '@angular/core';
import { CaseRoutingModule } from './case-routing.module';
import { CaseComponent } from './case.component';

@NgModule(
    {
        imports: [ CaseRoutingModule ],
        declarations: [ CaseComponent ]
    }
)    
export class CaseModule {}