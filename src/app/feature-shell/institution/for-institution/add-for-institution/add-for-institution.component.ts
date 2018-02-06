import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

declare let $;
@Component({
  selector: "add-for-institution-modal",
  templateUrl: "./add-for-institution.component.html",
  styleUrls: ["./add-for-institution.component.css"]
})
export class AddForInstitutionComponent implements OnInit {
  addForm1: FormGroup;
  arCityData: any[] = [];
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.addForInstitutionForm();
  }

  addForInstitutionForm() {
    this.addForm1 = this.fb.group({
      institution: ["", Validators.required],
      branch: ["", Validators.required],
      reportType: ["", Validators.required],
      uploadCases: [null, Validators.required],
      uploadCaseFiles: [null, Validators.required],
    });

  }

}