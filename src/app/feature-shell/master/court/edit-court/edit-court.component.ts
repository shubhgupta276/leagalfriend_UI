import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Court } from '../court';
import { CourtService } from '../court.service';
import { StorageService } from '../../../../shared/services/storage.service';

declare var $;

@Component({
  selector: 'app-edit-court',
  templateUrl: '../edit-court/edit-court.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditCourtMasterComponent implements OnInit {
  @Input() arCourt: Court[];
  editDetails: Court;
  editCourtMasterForm: FormGroup;
  isCourtNameAlreadyExists: boolean = false;
  constructor(private fb: FormBuilder, private _courtService: CourtService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditCourtMaster(data: Court) {

    var reqData = {
      courtName: data.courtName,
      courtDesc: data.courtDesc,
      id: data.id,
      userId: this._storageService.getUserId()

    };

    this._courtService.updateCourt(reqData).subscribe(

      result => {
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();
          debugger
          const objFind = this.arCourt.find(x => x.id == this.editDetails.id);
          objFind.courtName = data.courtName;
          objFind.courtDesc = data.courtDesc;
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
    this.editCourtMasterForm.get('courtName').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.courtName.toUpperCase() != fieldValue && this.arCourt.filter(x => x.courtName.toUpperCase() == fieldValue).length > 0)
          this.isCourtNameAlreadyExists = true;
        else {
          this.isCourtNameAlreadyExists = false;
        }
      }
    );
  }
  createForm(data: Court) {
    this.editCourtMasterForm = this.fb.group({
      courtName: [data == null ? null : data.courtName, Validators.required],
      courtDesc: [data == null ? null : data.courtDesc, Validators.required],
      id: [data == null ? null : data.id]
    });
    if (data != null) {
      this.isCourtNameAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}