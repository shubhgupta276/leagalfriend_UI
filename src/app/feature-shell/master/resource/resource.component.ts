import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllResource();
    $($.document).ready(function(){
     
      $('#example1').DataTable();
    }
  );
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    });
  }
  GetAllResource()
  {
    this.arr=[
      {ResourceCode:"AGB_CONS",ResourceName:"AGAINST CONSUMER",ResourceDesc:"AGAINST CONSUMER" },
      {ResourceCode:"AGB_CRI",ResourceName:"AGAINST CRIMINAL",ResourceDesc:"AGAINST CRIMINAL" },
      {ResourceCode:"AGB_CIVIL",ResourceName:"AGB CIVIL",ResourceDesc:"AGAINST CIVIL" },
      {ResourceCode:"AGB_CIVIL_BY_LITI",ResourceName:"AGB_CIVIL_BY_LITI",ResourceDesc:"AGB_CIVIL_BY_LITI" },
      {ResourceCode:"AGB_CRI_BY_LITI",ResourceName:"AGB_CRI_BY_LITI",ResourceDesc:"AGAINST CRIMINAL ARISING FROM FILED BY BANK LITIGATIONS" },
      {ResourceCode:"ARB",ResourceName:"ARB",ResourceDesc:"ARBITRATION" },
      {ResourceCode:"CAVEAT",ResourceName:"CAVEAT",ResourceDesc:"CAVEAT" },
      {ResourceCode:"CIVIL_CASE",ResourceName:"CIVIL CASE",ResourceDesc:"CIVIL CASE" },
      {ResourceCode:"CIVIL_WRIT_PET",ResourceName:"CIVIL_WRIT_PET",ResourceDesc:"CIVIL_WRIT_PET" },
      {ResourceCode:"CONCILIATION",ResourceName:"CONCILIATION",ResourceDesc:"CONCILIATION" },
      {ResourceCode:"CRI_CASE",ResourceName:"CRI_CASE",ResourceDesc:"CRIMINAL CASE" },
      {ResourceCode:"CRI_WRIT_PET",ResourceName:"CRI_WRIT_PET",ResourceDesc:"CRIMINAL WRIT PETITION" },
      {ResourceCode:"SRCS1",ResourceName:"DNE",ResourceDesc:"Demand Notice in English" },
      {ResourceCode:"DRAT",ResourceName:"DRAT",ResourceDesc:"DRAT" },
      {ResourceCode:"KACOMP",ResourceName:"KACOMP",ResourceDesc:"KACOMP" }
     
    ];
  }
  

}
