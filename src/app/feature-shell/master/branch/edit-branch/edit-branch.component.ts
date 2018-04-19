import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { BranchService } from '../branch.service';
import { StorageService } from '../../../../shared/services/storage.service';
import {SelectModule} from 'ng2-select';
declare var $;

@Component({
  selector: 'app-edit-branch',
  templateUrl: '../edit-branch/edit-branch.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditBranchMasterComponent implements OnInit {  
  @Input() editDetails: any;
  editBranchMasterForm: FormGroup;
  isBranchcodeAlreadyExists: boolean = false;
  finalData: any = {};
  @Input() arCity = [];
  @Input() arrBranch = [];
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  citySelected: Array<any> = [];
  selectedCity: any;
  constructor(private fb: FormBuilder, private _branchService: BranchService, private _storageService: StorageService) {
    this.createForm(null);
  }
  
  submitEditBranchMaster(data) {
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
    this.finalData.cityId = this.selectedCity.id;
    this.finalData.id = data.id;
    this.finalData.userId = this._storageService.getUserId();
    return this.finalData;
  }
  BindBranchGridOnEdit(data) {
    this.arrBranch.filter(
      branch => {
        if (branch.id == data.id) {
          branch.branchName = data.branchname;
          branch.branchCode = data.branchcode;
          branch.branchAddress = data.address;
          branch.branchContact = data.contact;
          branch.cityId = this.selectedCity.id;;
          branch.cityName = this.selectedCity.text;
        }
      });
      

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
    if(data!=null)
    {
    this.citySelected = [];
      const objFilter = this.arCity.filter(x => x.id ==data.cityId);
      this.citySelected.push({ id: data.id, text: objFilter[0].text });
      this.selectedCity = this.citySelected[0];
    }
    this.editBranchMasterForm = this.fb.group({
      branchname: [data == null ? null : data.branchName, Validators.required],
      branchcode: [data == null ? null : data.branchCode, Validators.required],
      address: [data == null ? null : data.branchAddress, Validators.required],
      city: [data == null ? 1 : data.cityId, Validators.required],
      contact: [data == null ? null : data.branchContact, Validators.required],
      id: [data == null ? null : data.id, Validators.nullValidator],
    });
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