import { Institution } from './../master/institution/institution';
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
import { isUndefined } from 'util';

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
  lineChartDataValues: ChartData[];
  datavalues: Array<any> = [];
  branchWiseTab: string = 'year';
  institution = JSON.parse(localStorage.getItem('userDetails')).institution;
  institutions: Array<any>;
  selectedInstitution: any;
  selectedBranch: any;
  branchWiseYearColor: string = 'orange';
  branchWiseMonthColor: string = '';
  branches = [];
  branchInstitutionLabels = [];
  branchInstitutionData = [];
  pieChart: any;
  branchChart: any;
  selectedYear: string = '2018';
  years = [];
  minYear = 2015;
  branchwiseStart: string='';
  branchwiseEnd: string='';
  ngOnInit() {
    try {
      var $this = this;
      this.initBranches();
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
      this.selectedYear = new Date().getFullYear().toString();
      //this.years.push(this.selectedYear);
      this.generateYearList();
      this.initDailyLoginChart(client);

      this.initCustomerChart();
      this.initCaseChart();
      this.initBranchChart();
      this.initBranchInstitutionChart('');

      this._billingService.getBillingAmount(client, 'institutional').subscribe(
        data => {
          this.institutionalBilling = data;
          this._billingService.getBillingAmount(client, 'individual').subscribe(
            data => {
              this.individualBilling = data;
              this.BillingChart(null, null);
            }
          );

        }
      );
     

      this._institutionService.getInstitutions().subscribe(
        result => {
          this.institutions = result.institutions;
        }
      );

      this.MostActiveEmployeeList(client);
      this.CaseUpdateList(client);

      $('#branchyearpicker').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
      });
      $('#branchyearpicker').change(function () {
        $this.selectedYear = $(this).val();
        $this.updateBranchChart();
      });

      $('#dailyFilter , #customerFilter , #caseFilter , #referralFilter,#branchFilter').daterangepicker({
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
            case 'branchFilter': {
                console.log('branch wise filter');
                $this.selectedYear = $this.GetFormattedDate(start);
                $this.branchwiseEnd = $this.GetFormattedDate(end);
                $this.updateBranchChart();
                break;
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
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

  initCaseChart() {
    this._caseService.getIndividualCase('week', this.clientId, null, null).subscribe(
      data => {
        this.caseDataWeekly = data;
      },
      error => console.log(error)
    );
    this._caseService.getIndividualCase('month', this.clientId, null, null).subscribe(
      data => {
        this.caseData = data;
        this.CaseChart(null, null);
      },
      error => console.log(error)
    );

  }

  initCustomerChart() {


    this.userService.getAllCustomerCount(this.clientId, 'month', null, null).subscribe(
      data => {
        this.monthTrialCustomer = data;
        this.CustomerChart(null, null);
      },
      error => console.log(error)
    );

    this.userService.getAllCustomerCount(this.clientId, 'week', null, null).subscribe(
      data => {
        this.weekTrialCustomer = data;
      },
      error => console.log(error)
    );

  }

  initDailyLoginChart(client) {
    try {
      this.userService.getDailyLogin('month', client, null, null).subscribe(
        data => {
          this.dailyLoginData = data;
          this.userService.getDailyLoginUser('month', client, null, null).subscribe(
            data => {
              this.dailyUserLogin = data;
              this.DailyChart(null, null);
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );

      this.userService.getDailyLogin('week', client, null, null).subscribe(
        data => {
          this.dailyLoginWeekly = data;
        },
        error => console.log(error)
      );
      

      this.userService.getDailyLoginUser('week', client, null, null).subscribe(
        data => {
          this.dailyUserWeekly = data;
        },
        error => console.log(error)
      );
    } catch (error) {
      console.log(error);
    }
  }
  MostActiveEmployeeList(clientId) {
    try {
      this.userService.getActiveEmployees(clientId).subscribe(
        data => {
          this.arrActiveEmployeeList = data;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  CaseUpdateList(client) {
    try {
      this._caseService.getRecentUpdatedCases(client).subscribe(
        data => {
          this.arrCaseList = data;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  ShowHideModeFilter(mode, graphMode) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  GetFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  DailyChart(start, end) {

    try {
      var $this = this;
      var data;
      var data1;
      var weeklyLabel;
      start = this.GetFormattedDate(start);
      end = this.GetFormattedDate(end);

      if (this.graphMode.dailyLoginMode == this.mode.DateWise) {
        this.changeColor('dailyFilterDate', 'dailyFilterMonth', 'dailyFilterWeek');
        this.userService.getDailyLogin('date', this.clientId, start, end).subscribe(
          result => {
            data = result;
            this.userService.getDailyLoginUser('date', this.clientId, start, end).subscribe(
              result => {
                data1 = result;
                this.createDailyChart(data, data1, weeklyLabel);
              },
              error => console.log(error)
            );
           
          },
          error => console.log(error)
        );

      }
      else if (this.graphMode.dailyLoginMode == this.mode.Weekly) {
        this.changeColor('dailyFilterWeek', 'dailyFilterDate', 'dailyFilterMonth');
        data = this.dailyLoginWeekly;
        data1 = this.dailyUserWeekly;
        weeklyLabel =
          ['1-7', '8-14', '15-21', '22-28', '29-35', '36-42', '43-49', '50-52'];
        this.createDailyChart(data, data1, weeklyLabel);
      }
      else {
        this.changeColor('dailyFilterMonth', 'dailyFilterWeek', 'dailyFilterDate');
        data = this.dailyLoginData;
        data1 = this.dailyUserLogin;
        this.createDailyChart(data, data1, weeklyLabel);
      }
    } catch (error) {
      console.log(error);
    }
  }

  createDailyChart(data1, data2, weeklyLabel) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
  CustomerChart(start, end) {
    try {
      var trialData;
      var premiumData;
      var weeklyLabel;
      start = this.GetFormattedDate(start);
      end = this.GetFormattedDate(end);
      if (this.graphMode.customerMode == this.mode.DateWise) {
        this.changeColor('customerFilterDate', 'customerFilterMonth', 'customerFilterWeek');
        this.userService.getAllCustomerCount(this.clientId, 'date', start, end).subscribe(
          result => {
            trialData = result;
            this.createCustomerChart(trialData, weeklyLabel);
          }
        );


      }
      else if (this.graphMode.customerMode == this.mode.Weekly) {
        this.changeColor('customerFilterWeek', 'customerFilterMonth', 'customerFilterDate');
        trialData = this.weekTrialCustomer;
        weeklyLabel =
          ['1-7', '8-14', '15-21', '22-28', '29-35', '36-42', '43-49', '50-52'];
        this.createCustomerChart(trialData, weeklyLabel);
      }
      else {
        this.changeColor('customerFilterMonth', 'customerFilterDate', 'customerFilterWeek');
        trialData = this.monthTrialCustomer;
        this.createCustomerChart(trialData, weeklyLabel);

      }
    } catch (error) {
      console.log(error);
    }
  }

  createCustomerChart(data1, weeklyLabel) {
    try {
      var config = {
        type: 'line',
        data: {
          labels: this.graphMode.customerMode == this.mode.Weekly ? weeklyLabel : data1,
          datasets: [{
            label: "Customers",
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
    } catch (error) {
      console.log(error);
    }
  }

  CaseChart(start, end) {
    try {
      var $this = this;
      var data1;
      var data2;
      var data3;
      start = this.GetFormattedDate(start);
      end = this.GetFormattedDate(end);
      var weeklyLabel;
      if (this.graphMode.caseMode == this.mode.DateWise) {
        this.changeColor('caseFilterDate', 'caseFilterMonth', 'caseFilterWeek');
        this._caseService.getIndividualCase('date', this.clientId, start, end).subscribe(
          result => {
            data1 = result;
            this._caseService.getInstitutionalCases('date', this.clientId, start, end).subscribe(
              result => {
                data2 = result;
                this._caseService.getAllTypeCases('date', this.clientId, start, end).subscribe(
                  result => {
                    data3 = result;
                    this.createCaseChart(data1, data2, data3, weeklyLabel);
                  }
                );
              }
            );
          }
        );

      }
      else if (this.graphMode.caseMode == this.mode.Weekly) {
        this.changeColor('caseFilterWeek', 'caseFilterDate', 'caseFilterMonth');
        data1 = this.caseDataWeekly;
        weeklyLabel =
          ['1-7', '8-14', '15-21', '22-28', '29-35', '36-42', '43-49', '50-52'];
        this._caseService.getInstitutionalCases('week', this.clientId, null, null).subscribe(
          result => {
            data2 = result;
            this._caseService.getAllTypeCases('week', this.clientId, null, null).subscribe(
              result => {
                data3 = result;
                this.createCaseChart(data1, data2, data3, weeklyLabel);
              }
            );
          }
        );

      }
      else {
        this.changeColor('caseFilterMonth', 'caseFilterDate', 'caseFilterWeek');
        data1 = this.caseData;
        this._caseService.getInstitutionalCases('month', this.clientId, null, null).subscribe(
          result => {
            data2 = result;
            this._caseService.getAllTypeCases('month', this.clientId, null, null).subscribe(
              result => {
                data3 = result;
                this.createCaseChart(data1, data2, data3, weeklyLabel);
              }
            );
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  createCaseChart(data1, data2, data3, weeklyLabel) {
    try {

      var dataset1 = [{
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
      ];

      var dataset2 = [{
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
      }];




      var config = {
        type: 'line',
        data: {
          labels: this.graphMode.customerMode == this.mode.Weekly ? weeklyLabel : data1,
          datasets: this.institution == null ? dataset2 : dataset1,

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
    } catch (error) {
      console.log(error);
    }
  }
  BranchChart() {
    try {
      var $this = this;
      var config = {
        type: 'line',
        data: {
          labels: this.lineChartDataValues,
          datasets: [{
            label: "Branch Wise Billing",
            data: this.lineChartDataValues,
            fill: true,
            borderColor: '#3c8dbc',
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
                  return value.y + 'k';
                }
                return value.y;
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

            if (month != null && !isUndefined($this.selectedBranch)) {
              $this.initSelBranchInstitutionChart(month);
            }
            else if (month != null && isUndefined($this.selectedBranch)) {
              $this.initBranchInstitutionChart(month);
            }
            else {
              $this.initBranchInstitutionChart('');
            }

          }
        }
      };

      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('branch-chart');
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
     // var branchChart = new Chart(ctx, config);
      if (this.branchChart) {

        this.branchChart.destroy();
        this.branchChart = new Chart(ctx, config);
      }
      else {
        this.branchChart = new Chart(ctx, config);
      }
    } catch (error) {
      console.log(error);
    }
  }

  BranchInstGraph() {
    try {
      var data = {
        labels: this.branchInstitutionLabels,
        datasets: [{
          data: this.branchInstitutionData,
          backgroundColor: ['#c0504e', '#4aacc5', '#b9cf8a', '#d9cf8a', '#c9cf8a'],
          borderColor: 'white',
          borderWidth: 1,
        }]
      };
      var randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
      };
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('branch-institution-chart');
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
  BillingChart(start, end) {
    try {
      var $this = this;
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
    } catch (error) {
      console.log(error);
    }
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
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
  bindCity() {
    try {
      this._cityService.getCities().subscribe(result => {
        if (result.httpCode == 200) {
          result.cities.forEach(item => {
            this.arCity.push(item);
          });
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  changeColor(selectedId1, id2, id3) {
    document.getElementById(selectedId1).style.backgroundColor = 'orange';
    document.getElementById(id2).style.backgroundColor = '';
    document.getElementById(id3).style.backgroundColor = '';
  }

  //This is not a right approach, Need to find a good solution :ToDo
  // public chartClicked(e: any): void {

  //   var xval = e.active[0]._xScale.getValueForPixel(e.active[0]._view.x);

  //   var yval = e.active[0]._yScale.getValueForPixel(e.active[0]._view.y);
  //   console.log(xval);
  //   console.log(yval);
  // }

  updateBillingChart() {
    if (this.selectedInstitution) {
      this._billingService.getInstitutionBilling(this.clientId, this.selectedInstitution).subscribe(
        result => {
          this.institutionalBilling = result;
          this.BillingChart(null, null);
        }
      );
      console.log(this.institutionalBilling);
    }
    else {
      this._billingService.getBillingAmount(this.clientId, 'institutional').subscribe(
        data => {
          this.institutionalBilling = data;
          this.BillingChart(null, null);
        }
      );
    }
  }

  updateBranchChart() {
    if (this.selectedBranch) {
      this.initSelectedBranchChart();
      this.initSelBranchInstitutionChart(null);
    }
    else {
      this.initBranchChart();
      this.initBranchInstitutionChart('');
    }
  }

  initBranchChart() {
    this._billingService.getBranchBilling(this.clientId, this.selectedYear,this.branchwiseEnd).subscribe(
      result => {
        this.lineChartDataValues = result;
        // for (let i = 0; i < this.lineChartDataValues.length; i++) {
        //   this.datavalues.push(this.lineChartDataValues[i].y);
        //   this.lineChartLabels.push(this.lineChartDataValues[i].x);
        //   this.lineChartData[0].data.push(this.lineChartDataValues[i].y);
        // }
        this.BranchChart();
      }
    );
  }

  initSelectedBranchChart() {
    this._billingService.getSelectedBranchBilling(this.clientId, this.selectedBranch,
      this.selectedYear,this.branchwiseEnd).subscribe(
        result => {
          this.lineChartDataValues = result;
          this.BranchChart();
        }
      );
  }

  initBranchInstitutionChart(month) {
    this._billingService.getBranchInstBilling(this.clientId, month, this.selectedYear
      ,this.branchwiseEnd)
      .subscribe(
        data => {
          this.branchInstitutionLabels = [];
          this.branchInstitutionData = [];
          for (let i = 0; i < data.length; i++) {
            this.branchInstitutionLabels.push(data[i].x);
            this.branchInstitutionData.push(data[i].y);
          }

          this.BranchInstGraph();
        }
      );
  }

  initSelBranchInstitutionChart(month) {

    if (month == null) {
      this._billingService.getSelectedBranchInstBilling(this.clientId,
        this.selectedBranch, this.selectedYear,this.branchwiseEnd)
        .subscribe(
          data => {
            this.branchInstitutionLabels = [];
            this.branchInstitutionData = [];
            for (let i = 0; i < data.length; i++) {
              this.branchInstitutionLabels.push(data[i].x);
              this.branchInstitutionData.push(data[i].y);
            }

            this.BranchInstGraph();
          }
        );
    }
    else {
      this._billingService.getBranchInstMonthBilling(this.clientId,
        this.selectedBranch, month, this.selectedYear,this.branchwiseEnd)
        .subscribe(
          data => {
            this.branchInstitutionLabels = [];
            this.branchInstitutionData = [];
            for (let i = 0; i < data.length; i++) {
              this.branchInstitutionLabels.push(data[i].x);
              this.branchInstitutionData.push(data[i].y);
            }

            this.BranchInstGraph();
          }
        );
    }
  }

  selectBranchWiseTab(value) {
    this.branchWiseTab = value;
    if (this.branchWiseTab == 'year') {
      this.branchWiseYearColor = 'orange';
      this.branchWiseMonthColor = '';
      this.branchwiseEnd='';
    }
    else {
      this.branchWiseYearColor = '';
      this.branchWiseMonthColor = 'orange';
    }

    this.updateBranchChart();
  }

  generateYearList() {

    for (var i= new Date().getFullYear();i >= this.minYear; i--) {
      this.years.push(i);
    }
  }
}

export class ChartData {
  x: any;
  y: any;
}
