import { BillingService } from '../billing/billing.service';
import { ReportDetail } from './../../shared/models/user/organization';
import { Component, OnInit } from '@angular/core';
//import 'chart.piecelabel.js';
import 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
import { BranchService } from '../master/branch/branch.service';
import { InstitutionService } from '../master/institution/institution.service';
import { CityService } from '../master/city/city.service';
import { SharedService } from '../../shared/services/shared.service';
import { UserService } from '../user/user.service';
import { CaseService } from '../case/case.service';
import { Router } from '../../../../node_modules/@angular/router';

declare let $;
// declare var Chart: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BranchService, InstitutionService, CityService, SharedService, UserService, CaseService, BillingService]
})
export class DashboardComponent implements OnInit {
  arrMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  mode = {
    monthly: 'M',
    Weekly: 'W',
    DateWise: 'D'
  }
  graphMode = {
    dailyLoginMode: this.mode.monthly,
    customerMode: this.mode.monthly,
    caseMode: this.mode.monthly,
    referralMode: this.mode.monthly
  }
  arrActiveEmployeeList = [];
  arrCaseList = [];
  arCity = [];
  branchPopupBody: string;
  isNoBranch = false;
  isNoInsitituion = false;
  constructor(private userService: UserService, private _caseService: CaseService, private _router: Router,
    private _branchService: BranchService, private _institutionService: InstitutionService,
     private _billingService: BillingService, private _cityService: CityService) {
  }

  dailyLoginData: any;
  caseData: any;
  caseDataWeekly: any;
  dailyLoginWeekly: any;
  dailyUserLogin: any;
  dailyUserWeekly: any;
  weeklyUserLogin: any;
  monthTrialCustomer: any;
  weekTrialCustomer: any;
  monthPaidCustomer: any;
  weekPaidCustomer: any;
  individualBilling: any;
  institutionalBilling: any;
  clientId;

  // public lineChartData:Array<any> = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},

  // ];
  lineChartDataValues: ChartData[];
  datavalues: Array<any> = [];
  lineChartData: Array<any>= [{data: [], label: 'Noida'}];
  
  lineChartLabels:Array<any> = [];// ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions:any = {
    responsive: true
  };
  lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  
  ];
  lineChartLegend:boolean = true;
  lineChartType:string = 'line';
 
  public randomize():void {
    // let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    // for (let i = 0; i < this.lineChartData.length; i++) {
    //   _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //   for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //     _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //   }
    // }
    // this.lineChartData = _lineChartData;
  }
 
  ngAfterViewInit(){
    this._billingService.getBranchBilling(this.clientId).subscribe(
      result=>{
        this.lineChartDataValues = result;
        for (let i = 0; i < this.lineChartDataValues.length; i++){
          this.datavalues.push(this.lineChartDataValues[i].y);
          this.lineChartLabels.push(this.lineChartDataValues[i].x);
          this.lineChartData[0].data.push(this.lineChartDataValues[i].y);
        }
        //this.lineChartData[0].data = this.datavalues;
        console.log('Data: '+this.datavalues);
        console.log('Label: '+this.lineChartLabels);
        this.BranchGraph();
    //    this.RevenueChart();
        console.log(this.lineChartData);
      }
    );
  }
  
  ngOnInit() {
    var $this = this;
    this.bindCity();
    const client = '?userId=' + localStorage.getItem('client_id');
    this.clientId = client;
    this.userService.getUser(client).subscribe(
      data => {
        if (data && data.roles[0].roleName === 'ADMIN') {
          this.CheckBranchPopup();
        }
      },
      error => console.log(error)
    );

    

 //   this.initSalesChart();
    this.initDailyLoginChart(client);

    this._caseService.getIndividualCase('week',client,null,null).subscribe(
      data => {
        this.caseDataWeekly = data;
      },
      error => console.log(error)
    );
    this._caseService.getIndividualCase('month',client,null,null).subscribe(
      data => {
        this.caseData = data;
        this.CaseChart(null, null);
      },
      error => console.log(error)
    );

    this.userService.getTrialCustomersCount(client,'month',null,null).subscribe(
      data => {
        this.monthTrialCustomer = data;
        this.CustomerChart(null, null);
      },
      error => console.log(error)      
    );

    this.userService.getTrialCustomersCount(client,'week',null,null).subscribe(
      data => {
        this.weekTrialCustomer = data;
      },
      error => console.log(error)      
    );

    this.userService.getPaidCustomersCount(client,'week',null,null).subscribe(
      data => {
        this.weekPaidCustomer = data;
      },
      error => console.log(error)      
    );

    this.userService.getPaidCustomersCount(client,'month',null,null).subscribe(
      data => {
        this.monthPaidCustomer = data;
      },
      error => console.log(error)      
    );
 
    this._billingService.getBillingAmount(client,'institutional').subscribe(
      data =>{
        this.institutionalBilling = data;
        this.BillingChart(null, null);
      }
    );
    this._billingService.getBillingAmount(client,'individual').subscribe(
      data =>{
        this.individualBilling = data;
      }
    );

    this.CustomerChart(null, null);
    
    this.BankGraph();
   
    //this.BranchGraph();
    this.RecourseGraph();
    this.MostActiveEmployeeList(client);
    this.CaseUpdateList(client);
    
    this.ReceiptChart(null, null);
    $('#dailyFilter , #customerFilter , #caseFilter , #referralFilter').daterangepicker({
      autoApply: true,
      locale: {
        format: 'YYYY-MM-DD'
      }
    },
      function (start, end, label) {
        switch ($(this)[0].element[0].id) {
          case 'dailyFilter': {
            $this.DailyChart(start, end);
            break;
          }
          case 'customerFilter': {
            $this.CustomerChart(start, end);
            break;
          }
          case 'caseFilter': {
            $this.CaseChart(start, end);
            break;
          }
          case 'referralGraph': {
            // $this.ReferralGraph(start, end);
            break;
          }
        }
      }
    );

  }

  initDailyLoginChart(client){
    this.userService.getDailyLogin('month',client,null,null).subscribe(
      data => {
        this.dailyLoginData = data;
        this.DailyChart(null, null);
      },
      error => console.log(error)
    );

    this.userService.getDailyLogin('week',client,null,null).subscribe(
      data => {
        this.dailyLoginWeekly = data;
      },
      error => console.log(error)
    );
    this.userService.getDailyLoginUser('month',client,null,null).subscribe(
      data => {
        this.dailyUserLogin = data;
      },
      error => console.log(error)
    );

    this.userService.getDailyLoginUser('week',client,null,null).subscribe(
      data => {
        this.dailyUserWeekly = data;
      },
      error => console.log(error)
    );
  }
  MostActiveEmployeeList(clientId) {

    this.userService.getActiveEmployees(clientId).subscribe(
      data => {
        this.arrActiveEmployeeList = data;
      }
    );
  }
  CaseUpdateList(client) {

    this._caseService.getRecentUpdatedCases(client).subscribe(
      data => {
        this.arrCaseList = data;
      }
    );

  }
  ShowHideModeFilter(mode, graphMode) {
    switch (graphMode) {
      case 'DailyLogin':
          {
          this.graphMode.dailyLoginMode = mode;
          this.DailyChart(null, null);
          break;
        }
      case 'Customer':
        {
          this.graphMode.customerMode = mode;
          this.CustomerChart(null, null);
          break;
        }
      case 'Case':
        {
          this.graphMode.caseMode = mode;
          this.CaseChart(null, null);
          break;
        }
      case 'Referral':
        {
          this.graphMode.referralMode = mode;
          break;
        }

    }
  }

  GetFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  DailyChart(start, end) {
    var $this = this;
    var data;
    var data1;
    var weeklyLabel;
    start = this.GetFormattedDate(start);
    end = this.GetFormattedDate(end);

    if (this.graphMode.dailyLoginMode == this.mode.DateWise) {
      this.changeColor('dailyFilterDate','dailyFilterMonth','dailyFilterWeek');
      this.userService.getDailyLogin('date', this.clientId,start,end).subscribe(
        result => {
          data = result;
          this.userService.getDailyLoginUser('date', this.clientId,start,end).subscribe(
            result => {
              data1 = result;
            },
            error => console.log(error)
          );
          this.createDailyChart(data,data1,weeklyLabel);
        },
        error => console.log(error)
      );
      
    }
    else if (this.graphMode.dailyLoginMode == this.mode.Weekly) {
      this.changeColor('dailyFilterWeek','dailyFilterDate','dailyFilterMonth');
      data = this.dailyLoginWeekly;
      data1 = this.dailyUserWeekly;
      weeklyLabel =
        ['1-7', '8-14', '15-21', '22-28','29-35','36-42','43-49','50-52'];
      this.createDailyChart(data,data1,weeklyLabel);
    }
    else {
      this.changeColor('dailyFilterMonth','dailyFilterWeek','dailyFilterDate');
      data = this.dailyLoginData;
      data1 = this.dailyUserLogin;
      this.createDailyChart(data,data1,weeklyLabel);
    }
    
  }

  createDailyChart(data1,data2, weeklyLabel){
    var config = {
      type: 'line',
      data: {
        labels: this.graphMode.dailyLoginMode == this.mode.Weekly ? weeklyLabel : data1,
        datasets: [{
          label: "Customer Daily Login",
          data: data1,
          backgroundColor: '#3c8dbc',
          borderColor: '#3c8dbc',
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
              return value.y;
            }
          }
        },
        {
          label: "Users Daily Login",
          data: data2,
          backgroundColor: '#a0d0e0',
          borderColor: '#a0d0e0',
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
              return value.y;
            }
          }
        }
      ],

      },

      options: {
        scales: {
          xAxes: [{
            type: this.graphMode.dailyLoginMode == this.mode.Weekly ? undefined : "time",
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
              unit: this.graphMode.dailyLoginMode == this.mode.monthly ? "month" : ""
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          }],
        },
      }
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('daily-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    new Chart(ctx, config);
  }
  CustomerChart(start, end) {
    var trialData;
    var premiumData;
    var weeklyLabel;
    start = this.GetFormattedDate(start);
    end = this.GetFormattedDate(end);
    if (this.graphMode.customerMode == this.mode.DateWise) {
      this.changeColor('customerFilterDate','customerFilterMonth','customerFilterWeek');
     this.userService.getTrialCustomersCount(this.clientId,'date',start, end).subscribe(
       result=>{
        trialData = result;
        this.userService.getTrialCustomersCount(this.clientId,'date',start, end).subscribe(
          data=>{
            premiumData = data;
          }
        );
        this.createCustomerChart(trialData,premiumData, weeklyLabel);
       }
     );


    }
    else if (this.graphMode.customerMode == this.mode.Weekly) {
      this.changeColor('customerFilterWeek','customerFilterMonth','customerFilterDate');
      trialData = this.weekTrialCustomer;
      premiumData = this.weekPaidCustomer;
      // [
      //   { x: '1-7', y: 10 },
      //   { x: '8-14', y: 50 },
      //   { x: '15-21', y: 30 },
      //   { x: '22-28', y: 80 },
      // ];
      weeklyLabel =
        ['1-7', '8-14', '15-21', '22-28'];
        this.createCustomerChart(trialData,premiumData, weeklyLabel);
    }
    else {
      this.changeColor('customerFilterMonth','customerFilterDate','customerFilterWeek');
      trialData = this.monthTrialCustomer;
      premiumData = this.monthPaidCustomer;
      this.createCustomerChart(trialData,premiumData, weeklyLabel);

    }
  
  }

  createCustomerChart(data1,data2, weeklyLabel){
    var config = {
      type: 'line',
      data: {
        labels: this.graphMode.customerMode == this.mode.Weekly ? weeklyLabel : data1,
        datasets: [{
          label: "Trial Customer",
          data: data1,
          fill: false,
          borderColor: '#3c8dbc',
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
              return value.y;
            }
          }
        },
        {
          label: "Premium Customer",
          data: data2,
          fill: false,
          borderColor: '#a0d0e0',
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
              return value.y;
            }
          }
        }
        ],

      },

      options: {
        scales: {
          xAxes: [{
            type: this.graphMode.customerMode == this.mode.Weekly ? undefined : "time",
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
              unit: this.graphMode.customerMode == this.mode.monthly ? "month" : ""
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          }],
        },
      }
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('customer-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    new Chart(ctx, config);
  }

  CaseChart(start, end) {
    var $this = this;
    var data1;
    var data2;
    var data3;
    start = this.GetFormattedDate(start);
    end = this.GetFormattedDate(end);
    var weeklyLabel;
    if (this.graphMode.caseMode == this.mode.DateWise) {
      this.changeColor('caseFilterDate','caseFilterMonth','caseFilterWeek');
      this._caseService.getIndividualCase('date',this.clientId,start,end).subscribe(
        result=>{
          data1= result;
          this._caseService.getInstitutionalCases('date',this.clientId,start,end).subscribe(
            result=>{
              data2= result;
              this._caseService.getAllTypeCases('date',this.clientId,start,end).subscribe(
                result=>{
                  data3= result;
                  this.createCaseChart(data1,data2,data3,weeklyLabel);
                }
              );
            }
          );
        }
      );
 
    }
    else if (this.graphMode.caseMode == this.mode.Weekly) {
      this.changeColor('caseFilterWeek','caseFilterDate','caseFilterMonth');
      data1 = this.caseDataWeekly;
      weeklyLabel =
      ['1-7', '8-14', '15-21', '22-28','29-35','36-42','43-49','50-52'];
      this._caseService.getInstitutionalCases('week',this.clientId,null,null).subscribe(
        result=>{
          data2= result;
          this._caseService.getAllTypeCases('week',this.clientId,null,null).subscribe(
            result=>{
              data3= result;
              this.createCaseChart(data1,data2,data3,weeklyLabel);
            }
          );
        }
      );

    }
    else {
      this.changeColor('caseFilterMonth','caseFilterDate','caseFilterWeek');
      data1 = this.caseData;
      this._caseService.getInstitutionalCases('month',this.clientId,null,null).subscribe(
        result=>{
          data2= result;
          this._caseService.getAllTypeCases('month',this.clientId,null,null).subscribe(
            result=>{
              data3= result;
              this.createCaseChart(data1,data2,data3,weeklyLabel);
            }
          );
        }
      );
      }
    
  }

  createCaseChart(data1,data2,data3,weeklyLabel){
    var config = {
      type: 'line',
      // data: {
      //   labels: this.graphMode.caseMode == this.mode.Weekly ? weeklyLabel : data1,
      //   datasets: [{
      //     label: "Total Cases",
      //     data: data1,
      //     fill: false,
      //     borderColor: '#3c8dbc',
      //     datalabels: {
      //       align: 'end',
      //       anchor: 'end',
      //       display: true,
      //       borderRadius: 4,
      //       color: '#001f3f',
      //       font: {
      //         weight: 'bold'
      //       },
      //       formatter: function (value, context) {
      //         return value.y;
      //       }
      //     }
      //   }],

      // },
      data: {
        labels: this.graphMode.customerMode == this.mode.Weekly ? weeklyLabel : data1,
        datasets: [{
          label: "Individual Cases",
          data: data1,
          fill: false,
          borderColor: '#3c8dbc',
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
              return value.y;
            }
          }
        },
        {
          label: "Institutional Cases",
          data: data2,
          fill: false,
          borderColor: '#a0d0e0',
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
              return value.y;
            }
          }
        },
        {
          label: "Total Cases",
          data: data3,
          fill: false,
          borderColor: '#d0d0e0',
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
              return value.y;
            }
          }
        }
        ],

      },

      options: {
        scales: {
          xAxes: [{
            type: this.graphMode.caseMode == this.mode.Weekly ? undefined : "time",
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
              unit: this.graphMode.caseMode == this.mode.monthly ? "month" : ""
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          }],
        },
      }
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('case-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    new Chart(ctx, config);
  }
  BankGraph() {
    // var canvas = document.getElementById("referral-chart");

    var data = {
      labels: ["DCB Bank", "HDFC Bank", "RBS Bank",],
      datasets: [{
        data: [40, 20, 40],
        backgroundColor: ['#c0504e', '#4aacc5', '#b9cf8a'],
        borderColor: 'white',
        borderWidth: 1,
      }]
    };
    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('bank-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    var myDoughnut = new Chart(ctx, {
      type: 'pie',
      data: data,
      showDatapoints: true,
      options: {
        tooltips: {
          enabled: true
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
          text: 'Bank',
          fontSize: 20
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

  }
  BranchGraph() {
    // var canvas = document.getElementById("referral-chart");

    // var data = {
    //   labels: ["DCB Bank", "HDFC Bank", "RBS Bank",],
    //   datasets: [{
    //     fill: false,
    //     borderColor: '#3c8dbc',
    //     data: [40, 20, 40],
    //     backgroundColor: ['#c0504e', '#4aacc5', '#b9cf8a'],
    //     borderWidth: 1,
    //   }]
    // };

    // var data = [
    //   {
    //     x:"Bank1",
    //     y:20
    //   },
    //   {
    //     x:"Bank2",
    //     y:40
    //   },
    //   {
    //     x:"Bank3",
    //     y:60
    //   },
    // ]
    // var randomScalingFactor = function () {
    //   return Math.round(Math.random() * 100);
    // };

    // var config = {
    //   type: 'bar',
    //   data: {
    //     labels:  ['A','B','CS'],
    //     datasets: [{
    //       label: "Branch",
    //       data: data,
    //       fill: false,
    //       borderColor: '#3c8dbc',
    //       datalabels: {
    //         align: 'end',
    //         anchor: 'end',
    //         display: true,
    //         borderRadius: 4,
    //         color: '#001f3f',
    //         font: {
    //           weight: 'bold'
    //         },
    //         formatter: function (value, context) {
    //           return value.y;
    //         }
    //       }
    //     }],

    //   },

    //   options: {
    //     scales: {
    //       xAxes: [{
    //         type: this.graphMode.caseMode == this.mode.Weekly ? undefined : "time",
    //         time: {
    //           displayFormats: {
    //             'millisecond': 'MMM DD',
    //             'second': 'MMM DD',
    //             'minute': 'MMM DD',
    //             'hour': 'MMM DD',
    //             'day': 'MMM DD',
    //             'week': 'MMM DD',
    //             'month': 'MMM',
    //             'quarter': 'MMM DD',
    //             'year': 'MMM DD',
    //           },
    //           unit: this.graphMode.caseMode == this.mode.monthly ? "month" : ""
    //         },
    //         ticks: {
    //           autoSkip: false,
    //           maxRotation: 45,
    //           minRotation: 45
    //         }
    //       }],
    //     },
    //   }
    // };

////New Chart


    var config = {
      type: 'line',
      data: {
        labels: this.lineChartDataValues,
        datasets: [{
          label: "Branch Billing",
          data: this.lineChartDataValues,
          fill: false,
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
              console.log(value.y);
              return value.y;
            }
          }
        }],

      },

      // options: {
      //   scales: {
      //     xAxes: [{
      //       type: this.graphMode.dailyLoginMode == this.mode.Weekly ? undefined : "time",
      //       time: {
      //         displayFormats: {
      //           'millisecond': 'MMM DD',
      //           'second': 'MMM DD',
      //           'minute': 'MMM DD',
      //           'hour': 'MMM DD',
      //           'day': 'MMM DD',
      //           'week': 'MMM DD',
      //           'month': 'MMM',
      //           'quarter': 'MMM DD',
      //           'year': 'MMM DD',
      //         },
      //         unit: this.graphMode.dailyLoginMode == this.mode.monthly ? "month" : ""
      //       },
      //       ticks: {
      //         autoSkip: false,
      //         maxRotation: 45,
      //         minRotation: 45
      //       }
      //     }],
      //   },
      // }
      options: {
        scales: {
            xAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value.x;
                    }
                }
            }]
        },
        events: ['click'],
        onClick: function(){
          console.log('New Click');
        }
    }
    };

    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('branch-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    var myDoughnut = new Chart(ctx, config);

  }

  RevenueChart(){

    var config = {
      type: 'line',
      data: {
        labels: this.lineChartDataValues,
        datasets: [{
          label: "Revenue",
          data: this.lineChartDataValues,
          fill: false,
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
              console.log(value.y);
              return value.y;
            }
          }
        }],

      },

      options: {
        scales: {
            xAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value.x;
                    }
                }
            }]
        },
        events: ['click'],
        onClick: function(){
          console.log('New Click');
        }
    }
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('revenue-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    var myDoughnut = new Chart(ctx, config);
  }
  RecourseGraph() {
    // var canvas = document.getElementById("referral-chart");

    var data = {
      labels: ["Roda", "CRI_CASE", "SEC_25c", "SEC9 RO", "ARB"],
      datasets: [{
        data: [20, 20, 20, 30, 10],
        backgroundColor: ['#c0504e', '#4aacc5', '#b9cf8a', '#d9cf8a', '#c9cf8a'],
        borderColor: 'white',
        borderWidth: 1,
      }]
    };
    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('recourse-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    var myDoughnut = new Chart(ctx, {
      type: 'pie',
      data: data,
      showDatapoints: true,
      options: {
        tooltips: {
          enabled: true
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
          text: 'Recourse',
          fontSize: 20
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

  }
  BillingChart(start, end) {
    var $this = this;
    // var data = [
    //   { x: '2015-01', y: 0, },
    //   { x: '2015-02', y: 54, },
    //   { x: '2015-03', y: 243, },
    //   { x: '2015-04', y: 206, },
    //   { x: '2015-05', y: 161, },
    //   { x: '2015-06', y: 187, },
    //   { x: '2015-07', y: 210, },
    //   { x: '2015-08', y: 204, },
    //   { x: '2015-09', y: 224, },
    //   { x: '2015-10', y: 301, },
    //   { x: '2015-11', y: 262, },
    //   { x: '2015-12', y: 199, },
    // ];
    var data = this.institutionalBilling;
    var data1 = this.individualBilling;
    var config = {
      type: 'line',
      data: {
        labels: data,
        datasets: [{
          label: "Institutional Billing",
          data: data,
          fill: false,
          borderColor: '#3c8dbc',
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
              return value.y;
            }
          }
        },
        {
          label: "Individual Billing",
          data: data1,
          fill: false,
          borderColor: '#a0d0e0',
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
              return value.y;
            }
          }
        }
        ],

      },

      options: {
        scales: {
          xAxes: [{
            type: this.graphMode.dailyLoginMode == this.mode.Weekly ? undefined : "time",
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
              unit: this.graphMode.dailyLoginMode == this.mode.monthly ? "month" : ""
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          }],
        },
      }
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('billing-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    new Chart(ctx, config);
  }
  ReceiptChart(start, end) {
    var $this = this;
    var data = [
      { x: '2015-01', y: 0, },
      { x: '2015-02', y: 54, },
      { x: '2015-03', y: 243, },
      { x: '2015-04', y: 206, },
      { x: '2015-05', y: 161, },
      { x: '2015-06', y: 187, },
      { x: '2015-07', y: 210, },
      { x: '2015-08', y: 204, },
      { x: '2015-09', y: 224, },
      { x: '2015-10', y: 301, },
      { x: '2015-11', y: 262, },
      { x: '2015-12', y: 199, },
    ];
    var config = {
      type: 'line',
      data: {
        labels: data,
        datasets: [{
          label: "Total Receipt Per Month",
          data: data,
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
              return value.y;
            }
          }
        }],

      },

      options: {
        scales: {
          xAxes: [{
            type: this.graphMode.dailyLoginMode == this.mode.Weekly ? undefined : "time",
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
              unit: this.graphMode.dailyLoginMode == this.mode.monthly ? "month" : ""
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          }],
        },
        events: ['click'],
        onClick: function($event,$active){
          console.log($active);
          
        }
      }
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('receipt-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    new Chart(ctx, config);
  }
  ShowPopup() {

    $('#subscriptionWarningModal').modal({
      backdrop: 'static',
      keyboard: false,
      closeOnEscape: false,
      open: function (event, ui) {
        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
      }
    });
  }
  ShowBranchPopup() {
    $('#subscriptionWarningModal').modal('hide');
    if (this.isNoBranch) {
      $('#addBranchMasterModal').modal({
        backdrop: 'static',
        keyboard: false,
        closeOnEscape: false,
        open: function (event, ui) {
          $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
      });
    }
    else if (!this.isNoBranch && this.isNoInsitituion) {
      $('#addInstitutionMasterModal').modal({
        backdrop: 'static',
        keyboard: false,
        closeOnEscape: false,
        open: function (event, ui) {
          $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
      });
    }
  }
  CheckBranchPopup() {
    this._branchService.getBranches().subscribe(
      result => {
        if (result.httpCode == 200) {
          if (result.branches.length == 0) {
            this.isNoBranch = true;
            this.branchPopupBody = "Thank you for registration. Please fill further details for setup.";
            //this.branchPopupBody = "Please create atleast one branch";
            this.ShowPopup();
          }
        }
      });
    this._institutionService.getInstitutions().subscribe(
      result => {
        if (result.httpCode == 200) {
          if (result.institutions.length == 0) {
            if (this.isNoBranch)
              this.branchPopupBody += " and institutions";
            else {
              this.branchPopupBody += "Please create atleast one institutions";
              this.ShowPopup();
            }
            this.isNoInsitituion = true;

          }
        }
      })
  }
  bindCity() {
    this._cityService.getCities().subscribe(result => {
      if (result.httpCode == 200) {
        result.cities.forEach(item => {
          this.arCity.push(item);
        });
      }
    })

  }

  goToPage(url,mode){
    this._router.navigate([url, {mode:mode}]);
  }

  changeColor(selectedId1,id2,id3){
    document.getElementById(selectedId1).style.backgroundColor='orange';
    document.getElementById(id2).style.backgroundColor='';
    document.getElementById(id3).style.backgroundColor='';
  }

  
  chartClick(){
    console.log("Click Event Called");
  }

 //This is not a right approach, Need to find a good solution :ToDo
 public chartClicked(e:any):void {

  var xval = e.active[0]._xScale.getValueForPixel(e.active[0]._view.x);

  var yval = e.active[0]._yScale.getValueForPixel(e.active[0]._view.y);
  console.log(xval);
  console.log(yval);
}

public chartHovered(e:any):void {
  
  console.log(e);
}

}

export class ChartData{
  x:any;
  y: any;
}
