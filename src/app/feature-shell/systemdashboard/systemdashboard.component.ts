import { SystemdashboardService } from './systemdashboard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SystemTiles} from './systemtile.model';

@Component({
  selector: 'app-systemdashboard',
  templateUrl: './systemdashboard.component.html',
  styleUrls: ['./systemdashboard.component.css']
})
export class SystemdashboardComponent implements OnInit {

   result: SystemTiles;
   totalCases: number;
   institutionalCases: number;
   againstInstitutionalCases: number;
   totalUsers: number;
   trialUsers: number;
   totalOrganization: number;
   oneMonthInActiveUsers: number
  constructor(private _sysdashService: SystemdashboardService, private _router: Router ) { }

  ngOnInit() {
   this._sysdashService.getTileInfo().subscribe(data => { 
      this.result = data;
      this.totalCases = this.result.totalCases;
      this.institutionalCases = this.result.institutionalCases;
      this.againstInstitutionalCases = this.result.againstInstitutionalCases;
      this.totalUsers =this.result.totalUsers;
      this.trialUsers = this.result.trialUsers;
      this.totalOrganization = this.result.totalOrganization;
      this.oneMonthInActiveUsers =this.result.oneMonthInActiveUsers;
    });
 
  }
  
  showUserDetail(url, mode){
    this._router.navigate([url, {mode:mode}]);
  }

  showOrgDetail(url,mode){
    this._router.navigate([url, {mode:mode}]);
  }

  showCases(url){
    this._router.navigate(url);
  }


}

