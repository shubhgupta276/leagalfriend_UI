import { Component, OnInit } from '@angular/core';
declare let $;
declare var Morris: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  arrMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  isDailyWeekly: boolean = false;
  graphMode = {
    isDailyLoginWeekly: false,
    isCustomerWeekly: false,
    isCaseWeekly: false,
    isReferralWeekly: false
  }
  mode = {
    monthly: 'M',
    weekly: 'W'
  }
  constructor() { }

  ngOnInit() {
    var $this = this;
    this.DailyChart(null, null, $this.mode.monthly);
    this.CustomerChart(null, null);
    this.CaseChart(null, null);
    this.ReferralGraph(null, null);
    $('#dailyFilter , #customerFilter , #caseFilter , #referralFilter').daterangepicker({
      autoApply: true,
      locale: {
        format: 'MM-DD-YYYY'
      }
    },
      function (start, end, label) {
        switch ($(this)[0].element[0].id) {
          case 'dailyFilter': {
            // $this.DailyChart(start, end, 'M');
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
            $this.ReferralGraph(start, end);
            break;
          }
        }
      }
    );

  }
  ShowHideMode(boolVal, mode) {
    switch (mode) {
      case 'DailyLogin':
        {
          this.graphMode.isDailyLoginWeekly = boolVal;
          break;
        }
        case 'Customer':
        {
          this.graphMode.isCustomerWeekly = boolVal;
          break;
        }
        case 'Case':
        {
          this.graphMode.isCaseWeekly = boolVal;
          break;
        }
        case 'Referral':
        {
          this.graphMode.isReferralWeekly = boolVal;
          break;
        }

    }
  }
  DailyChart(start, end, mode) {
    var $this = this;
    var data;
    if (mode == this.mode.weekly) {
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
    //var Morris;
    var area = new Morris.Area({
      element: 'daily-chart',
      resize: true,
      data: data,
      xkey: 'x',
      ykeys: ['y'],
      labels: ['Members'],
      xLabelAngle: 45,
      xLabelFormat: function (d) {
        if (mode == $this.mode.monthly)
          return $this.arrMonths[d.getMonth()];
        else {
          return this.arrMonths[d.getMonth()] + '-' +
            ("0" + (d.getDate())).slice(-2) + '-' +
            d.getFullYear();
        }
      },
      lineColors: ['#3c8dbc'],
      hideHover: 'auto'
    });
    // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Morris.Area({
    //   element: 'daily-chart',
    //   data: [{
    //     x: '2015-01', // <-- valid timestamp strings
    //     y: 0,
    //   }, {
    //     x: '2015-02',
    //     y: 54,
    //   }, {
    //     x: '2015-03',
    //     y: 243,
    //   }, {
    //     x: '2015-04',
    //     y: 206,
    //   }, {
    //     x: '2015-05',
    //     y: 161,
    //   }, {
    //     x: '2015-06',
    //     y: 187,
    //   }, {
    //     x: '2015-07',
    //     y: 210,
    //   }, {
    //     x: '2015-08',
    //     y: 204,
    //   }, {
    //     x: '2015-09',
    //     y: 224,
    //   }, {
    //     x: '2015-10',
    //     y: 301,
    //   }, {
    //     x: '2015-11',
    //     y: 262,
    //   }, {
    //     x: '2015-12',
    //     y: 199,
    //   },],
    //   xkey: 'x',
    //   ykeys: ['y'],
    //   labels: ['Daily Member'],
    //   // xLabelFormat: function (x) { // <--- x.getMonth() returns valid index
    //   //   var month = months[x.getMonth()];
    //   //   return month;
    //   // },
    //   // dateFormat: function (x) {
    //   //   var month = months[new Date(x).getMonth()];
    //   //   return month;
    //   // },
    // });

    // setTimeout(() => {
    //   // area.redraw();
    // }, 5);
  }
  CustomerChart(start, end) {
    var $this = this;
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
        return $this.arrMonths[d.getMonth()] + '-' +
          ("0" + (d.getDate())).slice(-2) + '-' +
          d.getFullYear();
      },
      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover: 'auto'
    });
    setTimeout(() => {
      area.redraw();
    }, 5);
  }
  CaseChart(start, end) {
    var $this = this;
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
        return $this.arrMonths[d.getMonth()] + '-' +
          ("0" + (d.getDate())).slice(-2) + '-' +
          d.getFullYear();
      },
      lineColors: ['#3c8dbc'],
      hideHover: 'auto'
    });
    setTimeout(() => {
      area.redraw();
    }, 5);
  }

  ReferralGraph(start, end) {
    var $this = this;
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
        return $this.arrMonths[d.getMonth()] + '-' +
          ("0" + (d.getDate())).slice(-2) + '-' +
          d.getFullYear();
      },

      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover: 'auto'
    });
    setTimeout(() => {
      area.redraw();
    }, 5);
  }
}
