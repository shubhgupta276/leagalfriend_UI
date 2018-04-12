import { NgModule } from '@angular/core';
import { CaseRoutingModule } from './case-routing.module';
import { CaseComponent } from './case.component';
import { EditCaseComponent} from './edit-case/edit-case.component';
import { AddCaseComponent} from './Add-case/Add-case.component';
import {CaseHistoryComponent} from './case-history/case-history-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import {SelectModule} from 'ng2-select';

@NgModule(
    {
        imports: [ 
            CaseRoutingModule, 
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            SelectDropDownModule,
            SelectModule
        ],
        declarations: [ CaseComponent, EditCaseComponent, AddCaseComponent,CaseHistoryComponent ]
    }
)    
export class CaseModule {}