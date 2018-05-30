import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DataTableComponent } from './data-table.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule
  ],
  exports: [
    DataTableComponent
    ]
})
export class DataTableModule { }
