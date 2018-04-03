import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { filter } from "rxjs/operator/filter";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { SampleModule } from 'pdf-generator-angular-2';

import * as jsPDF from 'jspdf';
import { HtmlParser } from "@angular/compiler";
declare var $;
declare var html2canvas;
@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",


})
export class InvoiceComponent implements OnInit {
  //template: string = `vsdcvascadcdc`;

  downloadPDF() {
    debugger
    //const doc = new jsPDF();

    // doc.fromHTML($("#element-to-print").get(0), 10, 10);
    // doc.save("test.pdf");



    function startPrintProcess(canvasObj, fileName, callback) {
      debugger
      var pdf = new jsPDF('l', 'pt', 'a4'),
        pdfConf = {
          pagesplit: false,
          background: '#fff'
        };
      document.body.appendChild(canvasObj); //appendChild is required for html to add page in pdf
      pdf.addHTML(canvasObj, 0, 0, pdfConf, function() {
        document.body.removeChild(canvasObj);
        pdf.addPage();
        html2canvas(document.getElementById('new-page-dom')).then(function(newCanvasDom) { //render the dom to be printed on the second page
          document.body.appendChild(newCanvasDom);
          pdf.addHTML(newCanvasDom, 20, 20, pdfConf, function() {
            document.body.removeChild(newCanvasDom);
            pdf.save(fileName + '.pdf');
            callback();
          });
        });
      });
    }

  }


  // @Input() editCaseForm: FormGroup;
  editCaseForm1: FormGroup;
  invoice: any[] = [];
  arListBanks: any[] = [{ BankName: "HDFC BANK LTD." }];
  constructor(private fb: FormBuilder) {
    this.createForm(null);
  }
  arrFilter = [];
  ngOnInit() {
    this.getInvoice();



    // var arr = JSON.parse(localStorage.getItem('invoiceNo'));
    // this.invoice = this.invoice.filter(

    //   invoice => {
    //     this.arrFilter = [];
    //     arr.forEach(item => {
    //       if (invoice.InvoiceNumber === item) {
    //         this.arrFilter.push(invoice);
    //       }
    //     });
    //     invoice = this.arrFilter[0];
    //     return invoice;
    //   }
    // );
    $($.document).ready(function () {


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
        initComplete: function () {
          var tableid = "example1";
          var $rowSearching = $("#" + tableid + "_wrapper");
          $rowSearching.find(".row:eq(0)").hide();

          for (var i = 0; i < arLengthMenu[0].length; i++) {
            var selectText = (arLengthMenu[0][i] == selectedPageLength) ? 'selected' : '';

            $("#ddlLengthMenu").append(


              "<option " + selectText + " value=" +
              arLengthMenu[0][i] +
              ">" +
              arLengthMenu[1][i] +
              "</option>"
            );
          }
          // $("#ddlLengthMenu").val(selectedPageLength);

          $("#ddlLengthMenu").on("change", function () {
            $rowSearching
              .find(".row:eq(0)")
              .find("select")
              .val($(this).val())
              .change();
          });
        }
      });

      $table.columns().every(function () {

        $("#txtSearch").on("keyup change", function () {
          if ($table.search() !== this.value) {
            $table.search(this.value).draw();
          }
        });


        //start bank filter
        $("#ddlBank").on("change", function () {
          debugger
          var status = $(this).val();
          if (status == "All") {
            $table.columns(2).search("").draw();
          }
          else if ($table.columns(2).search() !== this.value) {
            $table.columns(2).search(this.value).draw();
          }
        });
        //end bank filter

      });

    });
  }

  createForm(c) {
    debugger
    this.editCaseForm1 = this.fb.group({

      Bank: [c == null ? null : c.Bank],
      Amount: [c == null ? null : c.Amount],
      CaseID: [c == null ? null : c.CaseID],


    });
  }



  showModal(invoice) {
    this.createForm(invoice);
    $("#filterCaseModal").modal("show");
  }
  getInvoice() {
    this.invoice.push(

      { Bank: "DCB BANK LTD.", CaseID: "O_SEC9_31527", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "100", Billed: "Yes", Branch: "Mumbai", BillingDate: "12-02-2018", InvoiceNumber: "180213-002" },
      { Bank: "DCB BANK LTD.", CaseID: "O_SEC9_31527", Recourse: "CRI_CASE", Stage: "APPLIED FOR VEHICLE CUSTODY", Amount: "11", Billed: "Yes", Branch: "Delhi", BillingDate: "10-03-2018", InvoiceNumber: "180215-002" },
      { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC_25C", Stage: "CASE FILED", Amount: "300", Billed: "No", Branch: "Delhi", BillingDate: "12-02-2018", InvoiceNumber: "170213-002" },
      { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100", Billed: "No", Branch: "Mumbai", BillingDate: "12-06-2018", InvoiceNumber: "180223-002" },
      { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "ARB", Stage: "1ST NOTICE BY ARBITRATOR", Amount: "300", Billed: "Yes", Branch: "Mumbai", BillingDate: "12-08-2018", InvoiceNumber: "160213-002" },
      { Bank: "RBS BANK", CaseID: "O_SEC9_31527", Recourse: "RODA", Stage: "ARGUMENTS", Amount: "2588", Billed: "Yes", Branch: "Delhi", BillingDate: "12-08-2018", InvoiceNumber: "180883-002" },
      { Bank: "RBS BANK", CaseID: "O_SEC9_31527", Recourse: "ARB", Stage: "ARGUMENTS", Amount: "100", Billed: "No", Branch: "Mumbai", BillingDate: "12-09-2018", InvoiceNumber: "177213-002" },
      { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "5", Billed: "Yes", Branch: "Gujrat", BillingDate: "12-10-2018", InvoiceNumber: "180255-002" },
      { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100", Billed: "Yes", Branch: "Delhi", BillingDate: "12-10-2018", InvoiceNumber: "180266-002" },
      { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100", Billed: "No", Branch: "Mumbai", BillingDate: "12-11-2018", InvoiceNumber: "180277-002" },
      { Bank: "HDFC BANK Ltd.", CaseID: "O_SEC9_31527", Recourse: "SEC9 RO", Stage: "ARGUMENTS", Amount: "100", Billed: "Yes", Branch: "Pune", BillingDate: "12-10-2018", InvoiceNumber: "180223-002" },
    );
  }


}

