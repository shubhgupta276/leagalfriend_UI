import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-for-institution',
  templateUrl: './for-institution.component.html',
  styleUrls: ['./for-institution.component.css']
})
export class ForInstitutionComponent implements OnInit {

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
