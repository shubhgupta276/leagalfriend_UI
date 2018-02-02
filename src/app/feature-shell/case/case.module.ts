import { NgModule } from '@angular/core';
import { CaseRoutingModule } from './case-routing.module';
import { CaseComponent } from './case.component';
import { EditCaseComponent} from './edit-case/edit-case.component';
import { AddCaseComponent} from './Add-case/Add-case.component';
import {CaseHistoryComponent} from './case-history/case-history-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule(
    {
        imports: [ 
            CaseRoutingModule, 
            CommonModule,
            ReactiveFormsModule,
            FormsModule
        ],
        declarations: [ CaseComponent, EditCaseComponent, AddCaseComponent,CaseHistoryComponent ]
    }
)    
export class CaseModule {}