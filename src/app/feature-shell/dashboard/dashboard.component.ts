import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    this.DailyChart();
    this.CustomerChart();
    this.CaseChart();
    this.ReferralGraph();
    $('#dailyFilter , #customerFilter , #caseFilter , #referralFilter').daterangepicker({
      autoApply: true,
      locale: {
        format: 'MM-DD-YYYY'
      }
    });
    
  }
  DailyChart() {
    var data = [
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
    var area = new Morris.Area({
      element: 'daily-chart',
      resize: true,
      data: data,
      xkey: 'x',
      ykeys: ['y'],
      labels: ['Members'],
      xLabels: 'day',
      xLabelAngle: 45,
      xLabelFormat: function (d) {
        var weekdays = new Array(7);
        weekdays[0] = "SUN";
        weekdays[1] = "MON";
        weekdays[2] = "TUE";
        weekdays[3] = "WED";
        weekdays[4] = "THU";
        weekdays[5] = "FRI";
        weekdays[6] = "SAT";

        return weekdays[d.getDay()] + '-' +
          ("0" + (d.getMonth() + 1)).slice(-2) + '-' +
          ("0" + (d.getDate())).slice(-2);
      },

      lineColors: ['#3c8dbc'],
      hideHover: 'auto'
    });
    setTimeout(() => {
      area.redraw();
    }, 5);
  }
  CustomerChart() {
    var data = [
      { x: '2016-05-10', Trial: 200, Boiled: 200, },
      { x: '2016-05-11', Trial: 15, Boiled: 275, },
      { x: '2016-05-12', Trial: 80, Boiled: 20, },
      { x: '2016-05-13', Trial: 100, Boiled: 200, },
      { x: '2016-05-14', Trial: 50, Boiled: 60, },
      { x: '2016-05-15', Trial: 75, Boiled: 65, },
      { x: '2016-05-16', Trial: 175, Boiled: 95, },
      { x: '2016-05-17', Trial: 150, Boiled: 95, },
      { x: '2016-05-18', Trial: 120, Boiled: 95, },
      { x: '2016-05-19', Trial: 60, Boiled: 95, },
      { x: '2016-05-20', Trial: 10, Boiled: 95, }
    ];
    var area = new Morris.Area({
      element: 'customer-chart',
      resize: true,
      data: data,
      xkey: 'x',
      ykeys: ['Trial', 'Boiled'],
      labels: ['Trial Customer', 'Boiled Customer'],
      xLabels: 'day',
      xLabelAngle: 45,
      xLabelFormat: function (d) {
        var weekdays = new Array(7);
        weekdays[0] = "SUN";
        weekdays[1] = "MON";
        weekdays[2] = "TUE";
        weekdays[3] = "WED";
        weekdays[4] = "THU";
        weekdays[5] = "FRI";
        weekdays[6] = "SAT";

        return weekdays[d.getDay()] + '-' +
          ("0" + (d.getMonth() + 1)).slice(-2) + '-' +
          ("0" + (d.getDate())).slice(-2);
      },

      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover: 'auto'
    });
    setTimeout(() => {
      area.redraw();
    }, 5);
  }
  CaseChart() {
    var data = [
      { x: '2016-05-10', CaseAdded: 200 },
      { x: '2016-05-11', CaseAdded: 15 },
      { x: '2016-05-12', CaseAdded: 80 },
      { x: '2016-05-13', CaseAdded: 100 },
      { x: '2016-05-14', CaseAdded: 50 },
      { x: '2016-05-15', CaseAdded: 75 },
      { x: '2016-05-16', CaseAdded: 175 },
      { x: '2016-05-17', CaseAdded: 150 },
      { x: '2016-05-18', CaseAdded: 125 },
      { x: '2016-05-19', CaseAdded: 60 },
      { x: '2016-05-20', CaseAdded: 10 }
    ];
    var area = new Morris.Area({
      element: 'case-chart',
      resize: true,
      data: data,
      xkey: 'x',
      ykeys: ['CaseAdded'],
      labels: ['Case Added'],
      xLabels: 'day',
      xLabelAngle: 45,
      xLabelFormat: function (d) {
        var weekdays = new Array(7);
        weekdays[0] = "SUN";
        weekdays[1] = "MON";
        weekdays[2] = "TUE";
        weekdays[3] = "WED";
        weekdays[4] = "THU";
        weekdays[5] = "FRI";
        weekdays[6] = "SAT";

        return weekdays[d.getDay()] + '-' +
          ("0" + (d.getMonth() + 1)).slice(-2) + '-' +
          ("0" + (d.getDate())).slice(-2);
      },

      lineColors: ['#3c8dbc'],
      hideHover: 'auto'
    });
    setTimeout(() => {
      area.redraw();
    }, 5);
  }

  ReferralGraph() {
    var data = [
      { x: '2016-05-10', ReferralJoin: 200, ReferralSend: 200 },
      { x: '2016-05-11', ReferralJoin: 275, ReferralSend: 100 },
      { x: '2016-05-12', ReferralJoin: 20, ReferralSend: 150 },
      { x: '2016-05-13', ReferralJoin: 200, ReferralSend: 50 },
      { x: '2016-05-14', ReferralJoin: 60, ReferralSend: 75 },
      { x: '2016-05-15', ReferralJoin: 65, ReferralSend: 100 },
      { x: '2016-05-16', ReferralJoin: 95, ReferralSend: 200 },
      { x: '2016-05-17', ReferralJoin: 95, ReferralSend: 300 },
      { x: '2016-05-18', ReferralJoin: 95, ReferralSend: 375 },
      { x: '2016-05-19', ReferralJoin: 95, ReferralSend: 300 },
      { x: '2016-05-20', ReferralJoin: 95, ReferralSend: 200 }
    ];
    var area = new Morris.Area({
      element: 'referral-chart',
      resize: true,
      data: data,
      xkey: 'x',
      ykeys: ['ReferralJoin', 'ReferralSend'],
      labels: ['Referral Join', 'Referral Send'],
      xLabels: 'day',
      xLabelAngle: 45,
      xLabelFormat: function (d) {
        var weekdays = new Array(7);
        weekdays[0] = "SUN";
        weekdays[1] = "MON";
        weekdays[2] = "TUE";
        weekdays[3] = "WED";
        weekdays[4] = "THU";
        weekdays[5] = "FRI";
        weekdays[6] = "SAT";

        return weekdays[d.getDay()] + '-' +
          ("0" + (d.getMonth() + 1)).slice(-2) + '-' +
          ("0" + (d.getDate())).slice(-2);
      },

      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover: 'auto'
    });
    setTimeout(() => {
      area.redraw();
    }, 5);
  }
}
