import { AddStateMasterComponent } from './add-state/add-state.component';
import { EditStateMasterComponent } from './edit-state/edit-state.component';
import { CommonModule } from '@angular/common';
import { NgModule, ViewChild, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from './state.service';
import { StorageService } from '../../../shared/services/storage.service';
import { State } from './state';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { stateTableConfig } from './state.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';

declare let $;
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  editStateMasterForm: FormGroup;
  @ViewChild(EditStateMasterComponent) editChild: EditStateMasterComponent;
  tableInputData = [];
  columns = stateTableConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  constructor(private fb: FormBuilder, private _stateService: StateService, private _storageService: StorageService) {

  }

  ngOnInit() {
    this.GetAllState();
  }
  GetAllState() {

    this._stateService.getStates().subscribe(
      result => {

        if (result.httpCode === 200) {
          for (let i = 0; i < result.states.length; i++) {
            this.tableInputData.push(result.states[i]);
          }
          this.dataTableComponent.ngOnInit();
        } else {
          console.log(result);
        }
      },
      err => {
        console.log(err);

      });

  }
  onRowClick(event) {
    console.log(event);
  }
  onRowDoubleClick(event) {
    this.editChild.createForm(event);
    $('#editStateMasterModal').modal('show');
  }

  onRowSelect(event) {
    console.log(event);
  }

}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [
      StateComponent,
      AddStateMasterComponent,
      EditStateMasterComponent
    ],
    providers: [StateService, StorageService]
  }
)

export class StateModule { }
