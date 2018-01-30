import { NgModule } from '@angular/core';
import { CaseRoutingModule } from './case-routing.module';
import { CaseComponent } from './case.component';
import { EditCaseComponent} from './edit-case/edit-case.component';
import { CommonModule } from '@angular/common';

@NgModule(
    {
        imports: [ CaseRoutingModule, CommonModule ],
        declarations: [ CaseComponent, EditCaseComponent ]
    }
)    
export class CaseModule {}