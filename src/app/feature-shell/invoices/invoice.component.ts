import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
declare var $;
@Component({
    selector: "app-invoice",
    templateUrl: "./invoice.component.html",
    
   
  })
  export class InvoiceComponent implements OnInit{
    debugger
    invoice:any[]=[];
constructor(){
 
}
ngOnInit(){
  this.getInvoice();
  $($.document).ready(function() {
          
    var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
    var selectedPageLength = 15;
    const $table = $("#example1").DataTable({
      //  columns: [
      //   { name: "#", orderable: true },
      //   { name: "Bank", orderable: false },
      //   { name: "CaseID", orderable: false },
      //   { name: "Recourse", orderable: false },
      //   { name: "Stage", orderable: false },
      //   { name: "Amount", orderable: true },
      //    { name: "Action", orderable: false }
      // ],
      lengthMenu: arLengthMenu,
      pageLength: selectedPageLength,
      oLanguage: {
        sLengthMenu: "Show _MENU_ rows",
        sSearch: "",
        sSearchPlaceholder: "Search..."
      },
      initComplete: function() {
        var tableid = "example1";
        var $rowSearching = $("#" + tableid + "_wrapper");
        $rowSearching.find(".row:eq(0)").hide();

        for (var i = 0; i < arLengthMenu[0].length; i++) {
          var selectText=(arLengthMenu[0][i]==selectedPageLength)?'selected':'';
          
          $("#ddlLengthMenu").append(
           

            "<option "+ selectText  +" value=" +
              arLengthMenu[0][i] +
              ">" +
              arLengthMenu[1][i] +
              "</option>"
          );
        }
        // $("#ddlLengthMenu").val(selectedPageLength);

        $("#ddlLengthMenu").on("change", function() {
          $rowSearching
            .find(".row:eq(0)")
            .find("select")
            .val($(this).val())
            .change();
        });
      }
    });

    $table.columns().every(function() {
      
        $("#txtSearch").on("keyup change", function() {
          if ($table.search() !== this.value) {
            $table.search(this.value).draw();
          }
        });
      

        //start bank filter
      
    });

});
}
getInvoice()
{
  this.invoice.push(

    {InvoiceNo: "1",Date:'25-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "2",Date:'26-03-2018',Bank:'HDFC BANK LTD.'},
    {InvoiceNo: "3",Date:'27-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "4",Date:'1-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "5",Date:'2-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "6",Date:'5-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "7",Date:'6-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "8",Date:'7-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "9",Date:'9-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "10",Date:'8-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "11",Date:'25-03-2018',Bank:'DCB BANK LTD.'},
    {InvoiceNo: "12",Date:'25-03-2018',Bank:'DCB BANK LTD.'},
  );
  debugger
}
}
  
