import { Component, OnInit } from '@angular/core';
//import 'chart.piecelabel.js';
import 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
import { BranchService } from '../master/branch/branch.service';
import { InstitutionService } from '../master/institution/institution.service';
import { CityService } from '../master/city/city.service';
import { SharedService } from '../../shared/services/shared.service';
import { UserService } from '../user/user.service';
declare let $;
// declare var Chart: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BranchService, InstitutionService, CityService, SharedService]
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
  constructor(private userService: UserService, 
    private _branchService: BranchService, private _institutionService: InstitutionService, private _cityService: CityService) {
   }

  ngOnInit() {    
    var $this = this;
    this.bindCity();
    const client = '?userId=' + localStorage.getItem('client_id');
    this.userService.getUser(client).subscribe(
      data => {
        if (data && data.roles[0].roleName === 'ADMIN') {
          this.CheckBranchPopup();
        }
      },
      error => console.log(error)
    );
    this.DailyChart(null, null);
    this.CustomerChart(null, null);
    this.CaseChart(null, null);
    this.BankGraph();
    this.BranchGraph();
    this.RecourseGraph();
    this.MostActiveEmployeeList();
    this.CaseUpdateList();
    this.BillingChart(null, null);
    this.ReceiptChart(null, null);
    $('#dailyFilter , #customerFilter , #caseFilter , #referralFilter').daterangepicker({
      autoApply: true,
      locale: {
        format: 'MM-DD-YYYY'
      }
    },
      function (start, end, label) {
        switch ($(this)[0].element[0].id) {
          case 'dailyFilter': {
            $this.DailyChart(start, end);
            break;
          }
          case 'customerChart': {
            $this.CustomerChart(start, end);
            break;
          }
          case 'caseChart': {
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
  MostActiveEmployeeList() {
    this.arrActiveEmployeeList = [
      { Name: 'Anup', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 75 },
      { Name: 'Puneet', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 70 },
      { Name: 'Vipin', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 60 },
      { Name: 'Anil', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 55 },
      { Name: 'Mohit', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 50 },
      { Name: 'Sourav', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 33 },
    ]
  }
  CaseUpdateList() {
    this.arrCaseList = [
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
    ]
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
  DailyChart(start, end) {
    var $this = this;
    var data;
    var weeklyLabel;
    if (this.graphMode.dailyLoginMode == this.mode.DateWise) {
      data = [
        { x: '2016-05-10', y: 10 },
        { x: '2016-05-11', y: 60 },
        { x: '2016-05-12', y: 30 },
        { x: '2016-05-13', y: 80 },
        { x: '2016-05-14', y: 50 },
        { x: '2016-05-15', y: 90 },
        { x: '2016-05-16', y: 70 },
        { x: '2016-05-17', y: 75 },
        { x: '2016-05-18', y: 90 },
        { x: '2016-05-19', y: 100 },
        { x: '2016-05-20', y: 110 }
      ];
    }
    else if (this.graphMode.dailyLoginMode == this.mode.Weekly) {
      data = [
        { x: '1-7', y: 10 },
        { x: '8-14', y: 60 },
        { x: '15-21', y: 30 },
        { x: '22-28', y: 80 },
      ];
      weeklyLabel =
        ['1-7', '8-14', '15-21', '22-28'];

    }
    else {
      data = [
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
    }
    var config = {
      type: 'line',
      data: {
        labels: this.graphMode.dailyLoginMode == this.mode.Weekly ? weeklyLabel : data,
        datasets: [{
          label: "Total Cases",
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
      }
    };
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('daily-chart');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    new Chart(ctx, config);
  }
  CustomerChart(start, end) {
    var data;
    var data1;
    var weeklyLabel;
    if (this.graphMode.customerMode == this.mode.DateWise) {
      data = [
        { x: '2016-05-10', y: 10 },
        { x: '2016-05-11', y: 60 },
        { x: '2016-05-12', y: 30 },
        { x: '2016-05-13', y: 80 },
        { x: '2016-05-14', y: 50 },
        { x: '2016-05-15', y: 90 },
        { x: '2016-05-16', y: 70 },
        { x: '2016-05-17', y: 75 },
        { x: '2016-05-18', y: 90 },
        { x: '2016-05-19', y: 100 },
        { x: '2016-05-20', y: 110 }
      ];
      data1 = [
        { x: '2016-05-10', y: 10 },
        { x: '2016-05-11', y: 80 },
        { x: '2016-05-12', y: 30 },
        { x: '2016-05-13', y: 80 },
        { x: '2016-05-14', y: 50 },
        { x: '2016-05-15', y: 90 },
        { x: '2016-05-16', y: 70 },
        { x: '2016-05-17', y: 75 },
        { x: '2016-05-18', y: 90 },
        { x: '2016-05-19', y: 100 },
        { x: '2016-05-20', y: 110 }
      ];
    }
    else if (this.graphMode.customerMode == this.mode.Weekly) {
      data = [
        { x: '1-7', y: 10 },
        { x: '8-14', y: 60 },
        { x: '15-21', y: 30 },
        { x: '22-28', y: 80 },
      ];
      data1 = [
        { x: '1-7', y: 10 },
        { x: '8-14', y: 50 },
        { x: '15-21', y: 30 },
        { x: '22-28', y: 80 },
      ];
      weeklyLabel =
        ['1-7', '8-14', '15-21', '22-28'];

    }
    else {
      data = [
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
      data1 = [
        { x: '2015-01', y: 10, },
        { x: '2015-02', y: 54, },
        { x: '2015-03', y: 100, },
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
    }
    var config = {
      type: 'line',
      data: {
        labels: this.graphMode.customerMode == this.mode.Weekly ? weeklyLabel : data,
        datasets: [{
          label: "Trial Customer",
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
          label: "Boiled Customer",
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
    var data;
    var weeklyLabel;
    if (this.graphMode.caseMode == this.mode.DateWise) {
      data = [
        { x: '2016-05-10', y: 10 },
        { x: '2016-05-11', y: 60 },
        { x: '2016-05-12', y: 30 },
        { x: '2016-05-13', y: 80 },
        { x: '2016-05-14', y: 50 },
        { x: '2016-05-15', y: 90 },
        { x: '2016-05-16', y: 70 },
        { x: '2016-05-17', y: 75 },
        { x: '2016-05-18', y: 90 },
        { x: '2016-05-19', y: 100 },
        { x: '2016-05-20', y: 110 }
      ];
    }
    else if (this.graphMode.caseMode == this.mode.Weekly) {
      data = [
        { x: '1-7', y: 10 },
        { x: '8-14', y: 60 },
        { x: '15-21', y: 30 },
        { x: '22-28', y: 80 },
      ];
      weeklyLabel =
        ['1-7', '8-14', '15-21', '22-28'];

    }
    else {
      data = [
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
    }
    var config = {
      type: 'line',
      data: {
        labels: this.graphMode.caseMode == this.mode.Weekly ? weeklyLabel : data,
        datasets: [{
          label: "Total Cases",
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
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('branch-chart');
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
          text: 'Branch',
          fontSize: 20
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

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
          label: "Total Billing Per Month",
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
}