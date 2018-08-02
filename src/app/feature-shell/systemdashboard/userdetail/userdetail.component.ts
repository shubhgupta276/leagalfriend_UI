import { SystemdashboardService } from '../systemdashboard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../shared/models/user/user';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  title : any
   service: any;
   userList: User[];
   moreIndex:number;
  constructor(private _systemdashService: SystemdashboardService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
       this.service= params.mode;
      });
    
      if(this.service == 'trial') {
            this._systemdashService.getUsers('/trialusers').subscribe(result => {
            this.userList = result;
            this.title = 'Trial Users';
          });
      }
      else if(this.service == 'inactiveusers'){
           this._systemdashService.getUsers('/inactiveusers').subscribe(result => {
            this.userList = result;
            this.title = 'Users Inactive Since Last Month';
          });
      }

  }

  showMoreDetail(index){
    this.moreIndex=index;
  }
}
