import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllBilling();
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
GetAllBilling()
{
 this.arr=[
   {Bank:"DCB BANK LTD.",Recourse:"RODA",Stage:"ARGUMENTS",Amount:"100"},
   {Bank:"DCB BANK LTD.",Recourse:"CRI_CASE",Stage:"APPLIED FOR VEHICLE CUSTODY",Amount:"11"},
   {Bank:"HDFC BANK Ltd.",Recourse:"SEC_25C",Stage:"CASE FILED",Amount:"300"},
   {Bank:"HDFC BANK Ltd.",Recourse:"SEC9 RO",Stage:"ARGUMENTS",Amount:"100"},
   {Bank:"HDFC BANK Ltd.",Recourse:"ARB",Stage:"1ST NOTICE BY ARBITRATOR",Amount:"300"},
   {Bank:"RBS BANK",Recourse:"RODA",Stage:"ARGUMENTS",Amount:"2588"},
   {Bank:"RBS BANK",Recourse:"RODA",Stage:"ARGUMENTS",Amount:"5"}
 ]
}
}
