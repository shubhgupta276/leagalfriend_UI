import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { StorageService } from '../../../../shared/services/storage.service';
import { CourtService } from '../court.service';
import { Court } from '../court';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

declare var $;

@Component({
  selector: 'app-add-court',
  templateUrl: '../add-court/add-court.component.html'
})
export class AddCourtMasterComponent implements OnInit {
  @Input() tableInputData: any[];
  @Input() @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
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
    const reqData = {
      courtName: data.courtName,
      courtDesc: data.courtDesc,
      userId: this._storageService.getUserId()
    };

    this._courtService.addCourt(reqData).subscribe(
      result => {
        const _result = result.body;

        if (_result.httpCode === 200) { // success
          this.tableInputData.push({ courtName: data.courtName, courtDesc: data.courtDesc, id: _result.id });
          this.dataTableComponent.ngOnInit();
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.AddCourtMaster();
          this.closeModal();
          this.subscriberFields();
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $('#closebtn').click();
  }

  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addCourtMasterForm.get('courtName').valueChanges.subscribe(
      (e) => {
        if (this.tableInputData.filter(x => x.courtName.toUpperCase() === e.toUpperCase()).length > 0) {
          this.isCourtNameAlreadyExists = true;
        } else {
          this.isCourtNameAlreadyExists = false;
        }
      }
    );
  }
}
