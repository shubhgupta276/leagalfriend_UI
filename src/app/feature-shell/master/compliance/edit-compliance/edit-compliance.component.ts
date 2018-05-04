import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../../../shared/Utility/util-custom.validation';
import { Compliance } from '../compliance';
import { ComplianceService } from '../compliance.service';
import { StorageService } from '../../../../shared/services/storage.service';

export interface KeyValue {
  id: number;
  name: string;
}

declare var $;

@Component({
  selector: 'app-edit-compliance',
  templateUrl: '../edit-compliance/edit-compliance.component.html'
  //template:`<h1>test popup</h1>`
})
export class EditComplianceMasterComponent implements OnInit, OnChanges {
  @Input() arCompliance: Compliance[];
  @Input() arRecourse: any[];
  @Input() arStage: any[];
  @Input() arStatus: any[];
  editDetails: Compliance;
  isComplianceAlreadyExists: boolean = false;
  editComplianceMasterForm: FormGroup;
  constructor(private fb: FormBuilder, private _complianceService: ComplianceService, private _storageService: StorageService) {
  }

  ngOnInit() {
    this.createForm(null);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.editDetails !== undefined && changes.editDetails.currentValue !== undefined) {
      this.createForm(changes.editDetails.currentValue);
      this.subscriberFields();
    }

  }

  subscriberFields() {
    this.editComplianceMasterForm.get('compliance').valueChanges.subscribe(
      (e) => {
        var fieldValue = e.toUpperCase();
        if (this.editDetails.compliance.toUpperCase() != fieldValue && this.arCompliance.filter(x => x.compliance.toUpperCase() == fieldValue).length > 0)
          this.isComplianceAlreadyExists = true;
        else {
          this.isComplianceAlreadyExists = false;
        }
      }
    );
  }

  submitEditComplianceMaster(data) {
    var reqData = {
      id:data.id,
      recourse:{
        id:data.recourse.id,
      },
    
      stage:{
        id:data.stage.id,
      },
       
      complianceName: data.compliance,
      statusId: data.status.statusId,
  
      userId: this._storageService.getUserId()
    };
    
    this._complianceService.updateCompliance(reqData).subscribe(

      result => {
        
        var _result = result.body;
        if (_result.httpCode == 200) { //success
          $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          this.closeModal();

          const objFind = this.arCompliance.find(x => x.id == this.editDetails.id);
          objFind.compliance = data.compliance;
          objFind.recourseId = data.recourse;
          objFind.stageId = data.stage;
          objFind.statusId = data.status;
          objFind.recourse = $("#ddlRecourse option:selected").text();
          objFind.stage = $("#ddlStage option:selected").text();
          objFind.statusId = $("#ddlStatus option:selected").text();
        }
        else
          $.toaster({ priority: 'error', title: 'Error', message: _result.failureReason });

      },
      err => {
        console.log(err);
      });
  }

  closeModal() {
    $('#closebtn').click();
  }
  createForm(data: Compliance) {
    debugger
    this.editComplianceMasterForm = this.fb.group({
      
      recourse: [data == null ? null : data.recourse, Validators.required],
      stage: [data == null ? null : data.stage, Validators.required],
      compliance: [data == null ? null : data.compliance, Validators.required],
      status: [data == null ? null : data.statusId, Validators.required],
      id: [data == null ? null : data.id, Validators.required],
    });

    if (data != null) {
      this.isComplianceAlreadyExists = false;
      this.editDetails = data;
      this.subscriberFields();
    }
  }
}