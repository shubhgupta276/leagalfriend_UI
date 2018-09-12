import { DashboardService } from './../dashboard.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-tiles',
  templateUrl: './dashboard-tiles.component.html',
  styleUrls: ['./dashboard-tiles.component.css'],
  providers: [DashboardService]
})
export class DashboardTilesComponent implements OnInit {

  constructor( private _router: Router, private _dashService: DashboardService) { }
  customers: number;
  cases: number;
  dailyLogin: number;
  billings: number;

  ngOnInit() {
    this._dashService.getDashboardTiles().subscribe(
      result=>{
        this.customers = result.totalCustomers;
        this.cases = result.totalCases;
        this.dailyLogin = result.totalLogins;
        this.billings = result.totalBillings;
      }
    );
  }

  
  goToPage(url, mode) {
    this._router.navigate([url, { mode: mode }]);
  }

}
