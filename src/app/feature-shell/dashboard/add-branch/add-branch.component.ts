import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../shared/Utility/util-custom.validation';
import { BranchService } from '../../master/branch/branch.service';
import { StorageService } from '../../../shared/services/storage.service';
declare var $;

@Component({
  selector: 'app-add-branch',
  templateUrl: '../add-branch/add-branch.component.html',
  //template:`<h1>test popup</h1>`
})
export class AddBranchDashboardComponent implements OnInit {
  addBranchMasterForm: FormGroup;
  isBranchcodeAlreadyExists: boolean = false;
  finalData: any = {};
  @Input() arCity = [];
  
  AddBranchMaster() {
    this.addBranchMasterForm = this.fb.group({
      branchname: [null, Validators.required],
      branchcode: [null, Validators.required],
      address: [null, Validators.required],
      city: [1],
      contact: [null, Validators.required],
    });
  }
  
  constructor(private fb: FormBuilder, private _branchService: BranchService, private _storageService: StorageService) {
    this.AddBranchMaster();
  }

  submitAddBranchMaster(data) {
    var finalData = this.GetBranchData(data);
    this._branchService.addBranch(finalData).subscribe(
      result => {
        
        if (result.body.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: result.body.successMessage });
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
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
    // this.finalData.cityId = this.selectedCity.id;
    this.finalData.id = data.id;
    this.finalData.userId = this._storageService.getUserId();
    return this.finalData;
  }
  closeModal() {
    $("#closebtn").click();
  }

  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addBranchMasterForm.get('branchcode').valueChanges.subscribe(
      (e) => {
        if (e == "test") // right now this is hardcode later it will be checked from service(database)
          this.isBranchcodeAlreadyExists = true;
        else
          this.isBranchcodeAlreadyExists = false;
      }
    );
  }
}