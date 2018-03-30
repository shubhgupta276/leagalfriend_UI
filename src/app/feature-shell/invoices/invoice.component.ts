import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { filter } from "rxjs/operator/filter";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { SampleModule } from 'pdf-generator-angular-2';

import * as jsPDF from 'jspdf';
declare var $;
@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",


})
export class InvoiceComponent implements OnInit {
  template: string = `<div class="content-wrapper">
  <div class="page-heading">
    Invoices
  </div>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <!-- /.box -->
        <div class="box">
          <div class="box-body">
            <div>
              <div class="row table-toolbar">
                <div class="col-sm-4 heading">Invoice</div>
                <div class="col-sm-2"></div>
                <div class="col-sm-2"></div>
                <div class="col-sm-2">
                  <label class="custom-label">Show
                    <select class="input-sm" id="ddlLengthMenu">
                    </select> rows
                  </label>
                </div>
                <div class="col-sm-2">
                  <input type="text" id="txtSearch" class="input-sm custom-search" placeholder="Search...">
                </div>
              </div>
            </div>

            <table id="example1" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Bank
                    <select class="role input-sm" id="ddlBank">
                      <option value="All">All</option>
                      <option *ngFor="let item of arListBanks" value="{{item.BankName}}">{{item.BankName}}</option>
                    </select>
                  </th>
                  <th style="display:none">Case Id</th>
                  <th style="display:none">Recourse</th>
                  <th style="display:none">Stage</th>
                  <th style="display:none">Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of invoice" (dblclick)="showModal(item)">
                  <td>{{item.InvoiceNumber}}</td>
                  <td>{{item.BillingDate}}</td>
                  <td>{{item.Bank}}</td>
                  <td style="display:none">{{item.CaseID}}</td>
                  <td style="display:none">{{item.Recourse}}</td>
                  <td style="display:none">{{item.Stage}}</td>
                  <td style="display:none">{{item.Amount}}</td>
                  <td>
                    <a title="Edit">
                      <i class="fa fa-edit"></i>
                    </a>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="modal fade" style="z-index: 2001;" id="filterCaseModal">
      <div class="modal-dialog">
        <div class="modal-content" style="border-radius: 5px;">
          <div class="modal-header">

            <button type="button" id="closebtnFilter" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <span style="background-color:black">axasx</span>&nbsp;
            <span style="background-color:black">axasx</span>
            <span style="background-color:black">axasx</span>
            <b>
              <h1 class="modal-title" style="text-align:right">INVOICE </h1>
            </b>
            <div style="text-align:right">
              <label style="text-align:right">Date:03/27/2018</label>
              <br />
              <label style="text-align:right">Invoice #:</label>
              <br />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <form [formGroup]="editCaseForm1" class="form-horizontal">
              <div class="form-body">
                <div class="tab-content">
                  <div class="tab-pane active">
<table id="example2" class="table table-bordered table-hover">

    <td>
        <thead>
            <tr >
              <th>Bank</th>
              <th>CaseId</th>
              <th>Amount</th>
              <th>Total</th>
              
            </tr>
          </thead>
          <tbody>
              <tr>
             
                <td><div  [class.has-error]="editCaseForm1.get('Bank').invalid &&  editCaseForm1.get('Bank').touched">
                    <input class="form-control" style="border:dotted" placeholder="First Name" formControlName="Bank">
                  </div></td>
                <td><div [class.has-error]="editCaseForm1.get('Amount').invalid &&  editCaseForm1.get('Amount').touched">
                    <input class="form-control"  style="border:dotted" placeholder="First Name" formControlName="CaseID">
                  </div></td>
                <td><div  [class.has-error]="editCaseForm1.get('CaseID').invalid &&  editCaseForm1.get('CaseID').touched">
                    <input class="form-control"  style="border:dotted" placeholder="First Name" formControlName="Amount"> 
                    
                   </div></td>
               
                   <td><div  [class.has-error]="editCaseForm1.get('CaseID').invalid &&  editCaseForm1.get('CaseID').touched">
                      <input class="form-control"  style="border:dotted" placeholder="First Name" formControlName="Amount"> 
                      
                     </div></td>
              </tr>
            </tbody>

                   

                        <!-- <input type="checkbox" name="Compliance" id="Compliance" placeholder="Compliance" value="1" onclick="return compliance_single();"> -->
                      </table>
                      </div>
                    
                    </div>
                  </div>
                
             



            </form>


            

          </div>
          <div style="width:20px;height:10%;background-color:black;"></div>
          <div style="margin-top: -15px; margin-bottom: -15px;" class="modal-body">



          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </div>
  </section>
  <!-- /.content -->
</div>`;

  // FileUploader = new FileUploader({});
  //   FileReader = new FileReader(); 
  //   ngOnInit() { this.reader.onload = (ev: any) => { console.log(ev.target.result); }; 
  //   this.uploader.onAfterAddingFile = (fileItem: any) => { this.reader.readAsText(fileItem._file); }; }
  downloadPDF() {
    debugger
    //var html = $.parseHTML(this.template);
    $('#hiddenTemplate').html(this.template);
    const doc = new jsPDF();
    doc.fromHTML($('#hiddenTemplate').get(0), 15, 15, {
      //'width': 170, 
      //'elementHandlers': specialElementHandlers
    });
   // doc.text($('#hiddenTemplate').html(), 20, 20);


    doc.save('test.pdf');



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



    var arr = JSON.parse(localStorage.getItem('invoiceNo'));
    this.invoice = this.invoice.filter(

      invoice => {
        this.arrFilter = [];
        arr.forEach(item => {
          if (invoice.InvoiceNumber === item) {
            this.arrFilter.push(invoice);
          }
        });
        invoice = this.arrFilter[0];
        return invoice;
      }
    );
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

