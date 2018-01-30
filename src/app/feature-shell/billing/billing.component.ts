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
    // var oTable = $('#example1').DataTable();
    // $('#myInputTextField').keyup(function () {
    //   oTable.search($(this).val()).draw();
    // })
    // $('#length_change').change(function () {
    //   oTable.page.len($(this).val()).draw();
    // });
    $('#example2').DataTable({
      'paging': true,
      'lengthChange': false,
      'searching': false,
      'ordering': true,
      'info': true,
      'autoWidth': false
    });
    $('#example1').DataTable( {
      initComplete: function () {
          this.api().columns([0, 1, 4]).every( function () {
              var column = this;
              var select = $('<select><option value=""></option></select>')
                  .appendTo( $(column.footer()).empty() )
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );

                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
                  } );

              column.data().unique().sort().each( function ( d, j ) {
                  select.append( '<option value="'+d+'">'+d+'</option>' )
              } );
          } );
      }
  } );
  }

}
