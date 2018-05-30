import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-add-compliance',
  templateUrl: '../add-compliance/add-compliance.component.html'
})
export class AddComplianceMasterComponent implements OnInit {

  @Input() arCompliance: Compliance[];
  @Input() arRecourse: any[];
  @Input() arStage: any[];
  Stage: any=[];
  @Input() arStatus: any[];
  addComplianceMasterForm: FormGroup;
  isComplianceAlreadyExists: boolean = false;
  AddComplianceMaster() {
    this.addComplianceMasterForm = this.fb.group({
      recourse: ["", Validators.required],
      stage: ["", Validators.required],
      compliance: [null, Validators.required],
      status: ["", Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private _complianceService: ComplianceService, private _storageService: StorageService) {
    this.AddComplianceMaster();
  }

  submitAddComplianceMaster(data) {
    debugger
    var reqData = {
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

    this._complianceService.addCompliance(reqData).subscribe(
      result => {
        debugger
        var _result = result.body;

        if (_result.httpCode == 200) { //success

          
          // this.arCompliance.push(
          //   {
          //     recourse: data.recourse.recourseCode,
          //     stage: data.stage.stageCode,
          //     status: data.status.statusName,
          //     recourseId: data.recourse, stageId: data.stage, compliance: data.compliance,
          //     statusId: data.status, id: _result.id
          //   });
           $.toaster({ priority: 'success', title: 'Success', message: _result.successMessage });
          // this.AddComplianceMaster();
          this.closeModal();
          window.location.href="/admin/master/compliance"
          //this.subscriberFields();
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
  bindstage(item)
  {
    debugger
    var a = item.charAt(0);
    

      var $this = this
      var reqData = {
        email: this._storageService.getUserEmail(),
        recourseId: a
      };
      this._complianceService.bindStageDDL(reqData).subscribe(
  
        result => {
          debugger
          result.stageRecourses.forEach(function (value) {
  debugger
            $this.Stage.push({ id: value.id, text: value.stageName });
          });
        
        },
        err => {
          console.log(err);
        });
    
  }
  ngOnInit() {
    this.subscriberFields();
  }
  subscriberFields() {
    this.addComplianceMasterForm.get('compliance').valueChanges.subscribe(
      (e) => {

        if (this.arCompliance.filter(x => x.compliance.toUpperCase() == e.toUpperCase()).length > 0)
          this.isComplianceAlreadyExists = true;
        else {
          this.isComplianceAlreadyExists = false;
        }
      }
    );
  }
}