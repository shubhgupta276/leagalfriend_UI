import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
arBillingData:any[]=[];
  constructor() { }

  ngOnInit() {
      
    this.getBillingData();
   
    $($.document ).ready(function() {
        $('#example1').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        });
      });
   
//     $('#example1').DataTable( {
//       initComplete: function () {
//           this.api().columns([0, 1, 4]).every( function () {
//               var column = this;
//               var select = $('<select><option value=""></option></select>')
//                   .appendTo( $(column.footer()).empty() )
//                   .on( 'change', function () {
//                       var val = $.fn.dataTable.util.escapeRegex(
//                           $(this).val()
//                       );

//                       column
//                           .search( val ? '^'+val+'$' : '', true, false )
//                           .draw();
//                   } );

//               column.data().unique().sort().each( function ( d, j ) {
//                   select.append( '<option value="'+d+'">'+d+'</option>' )
//               } );
//           } );
//       }
//   } );
  }

  getBillingData(){
      
            for(var i=0;i<=20;i++)
            {
                this.arBillingData.push(
                    { 
                        Bank:"HDFC BANK Ltd.",
                        CaseID:"O_SEC9_31527",
                        Recourse:"SEC9 RO",
                        Stage:"ARGUMENTS",
                        Amount:"100"
                    }
                 );
               
           }
    }

}
