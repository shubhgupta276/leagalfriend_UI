import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { State } from '../state';
import { StateService } from '../state.service';
import { StorageService } from '../../../../shared/services/storage.service';

declare var $;


@Component({
  selector: 'app-add-state',
  templateUrl: '../add-state/add-state.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddStateMasterComponent implements OnInit {
  @Input() arState: State[];
  addStateMasterForm: FormGroup;
  isStateAlreadyExists: boolean = false;
  AddStateMaster() {
    this.addStateMasterForm = this.fb.group({
      stateName: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _stateService: StateService, private _storageService: StorageService) {
    this.AddStateMaster();
  }

  submitAddStateMaster(data) {
    var reqData = {
      stateName: data.stateName,
      userId: this._storageService.getUserId()
    };

    this._stateService.addState(reqData).subscribe(
      result => {
        var _result = result.body;

        if (_result.httpCode == 200) { //success
          this.arState.push({ stateName: data.stateName, id: _result.id });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddStateMaster();
          this.closeModal();
          this.subscriberFields();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $("#closebtn").click();
  }

  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addStateMasterForm.get('stateName').valueChanges.subscribe(
      (e) => {
        if (this.arState.filter(x => x.stateName.toUpperCase() == e.toUpperCase()).length > 0)
          this.isStateAlreadyExists = true;
        else {
          this.isStateAlreadyExists = false;
        }
      }
    );
  }
}