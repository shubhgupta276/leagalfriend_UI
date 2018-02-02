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
      $("#example1").DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        lengthMenu: [[10, 15, 25, -1], [10, 15, 25, "All"]],
        pageLength: 15,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        }
      });
    }
  );
  }
  GetAllCompliance()
  {
    this.arr=[
      {Recourse:"RODA",Stage:"ARGUMENTS",Compliance:"Compliance 1",Status:"Active"}

    ]
  }
  

}
