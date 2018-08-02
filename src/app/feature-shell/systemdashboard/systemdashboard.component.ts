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
  
  constructor(private _sysdashService: SystemdashboardService, private _router: Router ) { }

  ngOnInit() {
   this._sysdashService.getTileInfo().subscribe(data => { 
      this.result = data;
     console.log(this.result);
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

