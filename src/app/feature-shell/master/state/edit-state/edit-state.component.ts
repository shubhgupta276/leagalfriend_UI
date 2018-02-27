import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { State } from '../state';
import { StateService } from '../state.service';
import { StorageService } from '../../../../shared/services/storage.service';

declare var $;


@Component({
  selector: 'app-edit-state',
  templateUrl: '../edit-state/edit-state.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditStateMasterComponent implements OnInit {
  @Input() arState: State[];
  editDetails: State;
  editStateMasterForm: FormGroup;
  isStateAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _stateService: StateService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditStateMaster(data: State) {
    var reqData = {
      stateName: data.stateName,
      id: data.id,
      userId: this._storageService.getUserId()

    };

    this._stateService.updateState(reqData).subscribe(

      result => {
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();

          const objFind = this.arState.find(x => x.id == this.editDetails.id);
          objFind.stateName = data.stateName;
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });

      },
      err => {
        console.log(err);
      });

  }

  closeModal() {
    $("#closebtn1").click();
  }

  ngOnInit() {

  }

  subscriberFields() {
    this.editStateMasterForm.get('stateName').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.stateName.toUpperCase() != fieldValue && this.arState.filter(x => x.stateName.toUpperCase() == fieldValue).length > 0)
          this.isStateAlreadyExists = true;
        else {
          this.isStateAlreadyExists = false;
        }
      }
    );
  }
  createForm(data: State) {
    this.editStateMasterForm = this.fb.group({
      stateName: [data == null ? null : data.stateName, Validators.required],
      id: [data == null ? null : data.id]
    });
    if (data != null) {
      this.isStateAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }

}