import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { BranchService } from '../branch.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SharedService } from '../../../../shared/services/shared.service';
declare var $;

@Component({
  selector: 'app-add-branch',
  templateUrl: '../add-branch/add-branch.component.html'
})
export class AddBranchMasterComponent implements OnInit {
  addBranchMasterForm: FormGroup;
  isBranchcodeAlreadyExists: boolean = false;
  isBranchnameAlreadyExists: boolean = false;
  finalData: any = {};
  @Input() arCity = [];
  @Input() tableInputData = [];
  @Input() @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  citySelected: Array<any> = [];
  selectedCity: any;
  AddBranchMaster() {
    this.addBranchMasterForm = this.fb.group({
      branchname: [null, Validators.required],
      branchcode: [null, Validators.required],
      address: [null, Validators.required],
      city: [1],
      contact: [null, Validators.required],
    });
  }
  constructor(private fb: FormBuilder, private _branchService: BranchService,
    private _sharedService: SharedService, private _storageService: StorageService) {
    this.AddBranchMaster();
  }

  submitAddBranchMaster(data) {
    const finalData = this.GetBranchData(data);
    this._branchService.addBranch(finalData).subscribe(
      result => {
        result = result.body;
        if (result.httpCode === 200) {
          this._sharedService.setNewAddedBranch(data);
          $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
          this.BindBranchGridOnAdd(data, result.id);
          this.dataTableComponent.ngOnInit();
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
        }
      },
      err => {
        console.log(err);
      });

    this.AddBranchMaster();
    this.closeModal();
    this.subscriberFields();
  }

  GetBranchData(data): any {
    this.finalData = {};
    this.finalData.branchAddress = data.address;
    this.finalData.branchCode = data.branchcode;
    this.finalData.branchContact = data.contact;
    this.finalData.branchName = data.branchname;
    this.finalData.cityId = this.selectedCity.id;
    this.finalData.id = data.id;
    this.finalData.userId = this._storageService.getUserId();
    return this.finalData;
  }

  BindBranchGridOnAdd(data, id) {
    this.finalData = {};
    this.finalData.branchName = data.branchname;
    this.finalData.branchCode = data.branchcode;
    this.finalData.branchAddress = data.address;
    this.finalData.branchContact = data.contact;
    this.finalData.cityId = this.selectedCity.id;
    this.finalData.cityName = this.selectedCity.text;
    this.finalData.id = id;
    this.tableInputData.push(this.finalData);

  }

  closeModal() {
    $('#closebtn').click();
  }

  ngOnInit() {
    this.subscriberFields();
  }

  subscriberFields() {
    this.addBranchMasterForm.get('branchcode').valueChanges.subscribe(
      (e) => {
        if (this.tableInputData.filter(x => x.branchCode.toUpperCase() === e.toUpperCase()).length > 0) {
          this.isBranchcodeAlreadyExists = true;
        } else {
          this.isBranchcodeAlreadyExists = false;
        }
      }
    );
    this.addBranchMasterForm.get('branchname').valueChanges.subscribe(
      (e) => {
        if (this.tableInputData.filter(x => x.branchName.toUpperCase() === e.toUpperCase()).length > 0) {
          this.isBranchnameAlreadyExists = true;
        } else {
          this.isBranchnameAlreadyExists = false;
        }
      }
    );
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  public selectedCity1(value: any): void {
    this.selectedCity = value;
  }
}
