import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent implements OnInit {
arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllCompliance();
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
  GetAllCompliance()
  {
    this.arr=[
      {Recourse:"RODA",Stage:"ARGUMENTS",Compliance:"Compliance 1",Status:"Active"}

    ]
  }
  

}
