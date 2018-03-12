import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../../shared/services/storage.service';
import { CourtService } from '../court.service';
import { Court } from '../court';

declare var $;

@Component({
  selector: 'app-add-court',
  templateUrl: '../add-court/add-court.component.html'
  //template:`<h1>test popup</h1>`
})
export class AddCourtMasterComponent implements OnInit {
  @Input() arCourt: Court[];
  addCourtMasterForm: FormGroup;
  isCourtNameAlreadyExists: boolean = false;
  AddCourtMaster() {
    this.addCourtMasterForm = this.fb.group({
      courtName: [null, Validators.required],
      courtDesc: [null, Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _courtService: CourtService, private _storageService: StorageService) {
    this.AddCourtMaster();
  }

  submitAddCourtMaster(data: Court) {
    var reqData = {
      courtName: data.courtName,
      courtDesc: data.courtDesc,
      userId: this._storageService.getUserId()
    };

    this._courtService.addCourt(reqData).subscribe(
      result => {
        var _result = result.body;

        if (_result.httpCode == 200) { //success
          this.arCourt.push({ courtName: data.courtName, courtDesc: data.courtDesc, id: _result.id });
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddCourtMaster();
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
    this.addCourtMasterForm.get('courtName').valueChanges.subscribe(
      (e) => {
        if (this.arCourt.filter(x => x.courtName.toUpperCase() == e.toUpperCase()).length > 0)
          this.isCourtNameAlreadyExists = true;
        else {
          this.isCourtNameAlreadyExists = false;
        }
      }
    );
  }
}