import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $('#example1').dataTable( {
    //   "sDom": '<"toolbar">frtip'
    // } );
    // $("div.toolbar").html('Custom tool bar! Text/images etc.');
    // $('#example1').DataTable({
    //   'paging': true,
    //   'lengthChange': false,
    //   'searching': true,
    //   'ordering': true,
    //   'info': true,
    //   'autoWidth': false
    // });
    setTimeout(function ()
    {
        $('#example1').DataTable(
          {
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
          }
          
        );
      }, 50);
    var oTable = $('#example1').DataTable();
    $('#myInputTextField').keyup(function () {
      oTable.search($(this).val()).draw();
    });
    $('#length_change').change(function () {
      oTable.page.len($(this).val()).draw();
    });
//     
  }

}
