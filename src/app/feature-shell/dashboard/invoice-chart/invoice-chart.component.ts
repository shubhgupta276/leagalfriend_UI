import { BranchService } from './../../master/branch/branch.service';
import { isUndefined } from 'util';
import { InvoicesService } from './../../invoices/invoices.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
declare let $;
@Component({
  selector: 'app-invoice-chart.',
  templateUrl: './invoice-chart.component.html',
  styleUrls: ['./invoice-chart.component.css'],
  providers: [InvoicesService, BranchService]
})
export class InvoicechartComponent implements OnInit {

  data = [];
  selectedYear: string;
  invoiceInstitutionLabels = ["Roda", "CRI_CASE", "SEC_25c", "SEC9 RO", "ARB"];
  invoiceInstitutionData = [20, 20, 20, 30, 10];
  pieChart: any;
  selectedTab: string = 'year';
  yearColor: string = 'orange';
  dateColor: string = '';
  years = [];
  minYear = 2015;
  endDate: string = '';
  invoicechart;
  invoicepiechart;
  branches = [];
  selectedBranch;
  isDataAvailable: boolean= true; 
  constructor(private _invoiceService: InvoicesService, private _branchService: BranchService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear().toString();
    this.generateYearList();
    this.initInvoiceChart();
    this.initInvoiceInstChart(null);
    this.initBranches();
    var $this = this;


    $('#yearpicker').datepicker({
      format: 'yyyy',
      viewMode: 'years',
      minViewMode: 'years',
    });
    $('#yearpicker').change(function () {
      console.log('yearpicker');
      $this.selectedYear = $(this).val();
      $this.updateInvoiceChart();
    });


    $('#invoiceFilter').daterangepicker({
      autoApply: true,
      locale: {
        format: 'YYYY-MM-DD'
      }
    },
      function (start, end) {
        console.log('branch wise filter');
        $this.selectedYear = $this.getFormattedDate(start);
        $this.endDate = $this.getFormattedDate(end);
        console.log($this.selectedYear);
        console.log($this.endDate);
        $this.updateInvoiceChart();

      }
    );

    $("#yearFilter").datepicker({
      changeMonth: false,
      changeYear: true
    });


  }

  
  initBranches(){
    this.branches = [];
    this._branchService.getBranches().subscribe(
        result => {
          if (result != null) {
            result = result.branches;
            for(let i=0;i<result.length;i++){
              this.branches.push(result[i].branchName);
            }
            
          }
        },
        err => {
          console.log(err);
        });
  }

  getFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
  initInvoiceChart() {
    this.isDataAvailable = true;   
    if (this.endDate != '') {
      this._invoiceService.getInvoicesAmountByDate(this.selectedYear, this.endDate).subscribe(
        result => {
          this.data = result;
          if(this.data && this.data.length>0){
            this.invoiceChart();      
          }
          else{
            this.isDataAvailable = false;          
          }
       
        },
        error => console.log(error)
      );
    }
    else {
      this._invoiceService.getInvoicesAmount(this.selectedYear).subscribe(
        result => {
          this.data = result;
          if(this.data && this.data.length>0){
            this.invoiceChart();      
          }
          else{
            this.isDataAvailable = false;          
          }
        },
        error => console.log(error)
      );
    }
  }

  initInvoiceChartByBranch(){
    this.isDataAvailable = true; 
     this._invoiceService.getInvoicesAmountByBranch(this.selectedBranch,this.selectedYear, this.endDate).subscribe(
        result => {
          this.data = result;
          if(this.data && this.data.length>0){
            this.invoiceChart();      
          }
          else{
            this.isDataAvailable = false;          
          }
         // this.invoiceChart();
        },
        error => console.log(error)
      );
  }

  initInvoiceInstChartByBranch(month){
    if(month){
      this._invoiceService.getInvoicesInstMonthByBranch(this.selectedBranch,this.selectedYear, this.endDate,month).subscribe(
        result => {
          this.invoiceInstitutionLabels = [];
          this.invoiceInstitutionData = [];
          for (let i = 0; i < result.length; i++) {
            this.invoiceInstitutionLabels.push(result[i].x);
            this.invoiceInstitutionData.push(result[i].y);
          }
          this.invoiceInstChart();
        },
        error => console.log(error)
      );
    }
    else{
      this._invoiceService.getInvoicesInstAmountByBranch(this.selectedBranch,this.selectedYear, this.endDate).subscribe(
        result => {
          this.invoiceInstitutionLabels = [];
          this.invoiceInstitutionData = [];
          for (let i = 0; i < result.length; i++) {
            this.invoiceInstitutionLabels.push(result[i].x);
            this.invoiceInstitutionData.push(result[i].y);
          }
          this.invoiceInstChart();
        },
        error => console.log(error)
      );
    }
    
  }

  initInvoiceInstChart(month) {
    if (this.endDate != '') {

      this._invoiceService.getInvoicesInstAmountByDate(this.selectedYear, this.endDate,
        month).subscribe(
          result => {
            this.invoiceInstitutionLabels = [];
            this.invoiceInstitutionData = [];
            for (let i = 0; i < result.length; i++) {
              this.invoiceInstitutionLabels.push(result[i].x);
              this.invoiceInstitutionData.push(result[i].y);
            }
            this.invoiceInstChart();
          },
          error => console.log(error)

        );
    }
    else {
      this._invoiceService.getInvoicesInstAmount(this.selectedYear, month).subscribe(
        result => {
          this.invoiceInstitutionLabels = [];
          this.invoiceInstitutionData = [];
          for (let i = 0; i < result.length; i++) {
            this.invoiceInstitutionLabels.push(result[i].x);
            this.invoiceInstitutionData.push(result[i].y);
          }
          this.invoiceInstChart();
        },
        error => console.log(error)

      );
    }
  }

  invoiceChart() {
    try {
      var $this = this;
      var config = {
        type: 'line',
        data: {
          labels: this.data,
          datasets: [{
            label: "Invoices",
            data: this.data,
            backgroundColor: '#3c8dbc',
            datalabels: {
              align: 'end',
              anchor: 'end',
              display: true,
              borderRadius: 4,
              color: '#001f3f',
              font: {
                weight: 'bold'
              },
              formatter: function (value, context) {
                if (value.y >= 1000) {
                  value.y = value.y / 1000;
                  value.y = value.y.toFixed(3);
                  return 'Rs ' + value.y + 'k';
                }
                return 'Rs ' + value.y;
              }
            }
          }],

        },

        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: "time",
              time: {
                displayFormats: {
                  'millisecond': 'MMM DD',
                  'second': 'MMM DD',
                  'minute': 'MMM DD',
                  'hour': 'MMM DD',
                  'day': 'MMM DD',
                  'week': 'MMM DD',
                  'month': 'MMM',
                  'quarter': 'MMM DD',
                  'year': 'MMM DD',
                },
                unit: "month"
              },
              ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45
              }
            }],
            yAxes: [{
              ticks: {
                // Create scientific notation labels
                callback: function (value, index, values) {
                  if (value >= 1000) {
                    value = value / 1000;
                    value = value.toFixed(3);
                    return 'Rs ' + value + 'k';
                  }
                  return 'Rs ' + value;

                }
              }
            }]
          },
          events: ['click'],
          onClick: function (e: any): void {
            var activePoints = this.chart.getElementsAtEvent(e);
            var firstPoint = activePoints[0];
            var month = this.chart.scales['x-axis-0'].ticks[firstPoint._index];
            console.log(this.chart.scales['x-axis-0']);
            // if (month != null && !isUndefined(month)) {
            //   $this.initInvoiceInstChart(month);
            // }
            // else {
            //   $this.initInvoiceInstChart(null);
            // }

            if (month != null && isUndefined($this.selectedBranch)) {
              $this.initInvoiceInstChart(month);
            }
            else if (month != null && !isUndefined($this.selectedBranch)) {
              $this.initInvoiceInstChartByBranch(month);
            }
            else {
              $this.initInvoiceInstChart(null);
            }
          }
        }
      };
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('invoice-chart');
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      if (this.invoicechart) {

        this.invoicechart.destroy();
        this.invoicechart = new Chart(ctx, config);
      }
      else {
        this.invoicechart = new Chart(ctx, config);
      }
    } catch (error) {
      console.log(error);
    }
  }

  invoiceInstChart() {
    try {
      var data = {
        labels: this.invoiceInstitutionLabels,
        datasets: [{
          data: this.invoiceInstitutionData,
          backgroundColor: ['#c0504e', '#4aacc5', '#b9cf8a', '#d9cf8a', '#c9cf8a'],
          borderColor: 'white',
          borderWidth: 1,
        }]
      };
      var randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
      };
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('invoice-institution-chart');
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      if (this.pieChart) {

        this.pieChart.destroy();
        this.createPieChart(ctx, data);
      }
      else {
        this.createPieChart(ctx, data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  createPieChart(ctx, data) {
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      showDatapoints: true,
      options: {
        tooltips: {
          enabled: false
        },
        pieceLabel: {
          mode: 'value'
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          fontSize: 20
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

  updateInvoiceChart() {
    if(this.selectedBranch){
      this.initInvoiceChartByBranch();
      this.initInvoiceInstChartByBranch(null);
    }
    else{
      this.initInvoiceChart();
      this.initInvoiceInstChart(null);
    }
  }

  selectInvoiceTab(value) {
    this.selectedTab = value;
    if (this.selectedTab == 'year') {
      this.yearColor = 'orange';
      this.dateColor = '';
      this.endDate = '';
      this.selectedYear = new Date().getFullYear().toString();

    }
    else {
      this.yearColor = '';
      this.dateColor = 'orange';
    }

    this.updateInvoiceChart();
  }

  generateYearList() {

    for (var i = new Date().getFullYear(); i >= this.minYear; i--) {
      this.years.push(i);
    }
  }
}
