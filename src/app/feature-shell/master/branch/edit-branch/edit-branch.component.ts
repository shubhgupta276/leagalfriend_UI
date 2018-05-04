import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { BranchService } from '../branch.service';
import { StorageService } from '../../../../shared/services/storage.service';
export interface KeyValue {
  id: number;
  name: string;
}
export const Cities: KeyValue[] = [{ id: 1, name: "Jaipur" }, { id: 2, name: "Delhi" }, { id: 3, name: "Chennai" }];
declare var $;

@Component({
  selector: 'app-edit-branch',
  templateUrl: '../edit-branch/edit-branch.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditBranchMasterComponent implements OnInit {
  @Input() editDetails: any;
  editBranchMasterForm: FormGroup;
  City: KeyValue[] = Cities;
  isBranchcodeAlreadyExists: boolean = false;
  finalData: any = {};
  @Input() arCity = [];
  @Input() arrBranch = [];
  constructor(private fb: FormBuilder, private _branchService: BranchService, private _storageService: StorageService) {
    this.createForm(null);
  }

  submitEditBranchMaster(data) {
    debugger
    var finalData = this.GetBranchData(data);
    this._branchService.updateBranch(finalData).subscribe(
      result => {
        if (result.body.httpCode == 200) {
          this.BindBranchGridOnEdit(data);
          $.toaster({ priority: 'success', title: 'Success', message: 'Branch updated successfully' });
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      });

    this.closeModal();
  }
  GetBranchData(data): any {
    this.finalData.branchAddress = data.address;
    this.finalData.branchCode = data.branchcode;
    this.finalData.branchContact = data.contact;
    this.finalData.branchName = data.branchname;
    this.finalData.cityId = data.city;
    this.finalData.id = data.id;
    this.finalData.userId = this._storageService.getUserId();
    return this.finalData;
  }
  BindBranchGridOnEdit(data) {
    debugger
    this.arrBranch.filter(
      branch => {
        if (branch.id == data.id) {
          branch.branchName = data.branchname;
          branch.branchCode = data.branchcode;
          branch.branchAddress = data.address;
          branch.branchContact = data.contact;
          branch.cityId = data.city;
          branch.cityName = this.getCityName(data.city);
        }
      });

  }
  getCityName(cityId): string {
    const objFind = this.arCity.filter(x => x.id == cityId)[0];
    if (objFind)
      return objFind.cityName;
    else
      return "";

  }
  closeModal() {
    $('#closebtn1').click();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.editDetails.currentValue !== undefined) {
      this.createForm(changes.editDetails.currentValue);
      this.subscriberFields();
    }

  }

  subscriberFields() {
    this.editBranchMasterForm.get('branchcode').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isBranchcodeAlreadyExists = true;
        else
          this.isBranchcodeAlreadyExists = false;
      }
    );
  }

  createForm(data) {
    debugger
    this.editBranchMasterForm = this.fb.group({
      branchname: [data == null ? null : data.branchName, Validators.required],
      branchcode: [data == null ? null : data.branchCode, Validators.required],
      address: [data == null ? null : data.branchAddress, Validators.required],
      city: [data == null ? 1 : data.cityId, Validators.required],
      contact: [data == null ? null : data.branchContact, Validators.required],
      id: [data == null ? null : data.id, Validators.nullValidator],
    });
  }
}