import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-against-institution',
  templateUrl: './against-institution.component.html',
  styleUrls: ['./against-institution.component.css']
})
export class AgainstInstitutionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#example1').DataTable();
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    });
  }

}
