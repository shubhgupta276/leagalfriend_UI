import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {
arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllInstitute();
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
  GetAllInstitute()
  {
    this.arr=[
      {InstituteName:"AXIS BANK LTD."},
      {InstituteName:"CORPORATION BANK LTD"},
      {InstituteName:"DCB BANK LTD."},
      {InstituteName:"HDFC BANK Ltd."},
      {InstituteName:"ICICI BANK LTD."},
      {InstituteName:"INDIA INFOLINE FINANCE LIMITED"},
      {InstituteName:"INTEC CAPITAL LIMITED"},
      {InstituteName:"KOTAK MAHINDRA BANK LTD."},
      {InstituteName:"MAGMA HOUSING FINANCE LIMITED"},
      {InstituteName:"MODERN CAPITAL LIMITED"},
      {InstituteName:"RBL BANK LTD."},
      {InstituteName:"RBS BANK"},
      {InstituteName:"TVS FINANCE LIMITED"},
      {InstituteName:"VIJAYA BANK"},
      
    ];
  }
  

}
