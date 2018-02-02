import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
