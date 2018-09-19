import { UserService } from './../../user/user.service';
import { SystemdashboardService } from '../systemdashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../shared/models/user/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Chart from 'chart.js';
import {MatPaginator, MatSort, MatTableDataSource, MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserdetailComponent implements OnInit {


  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  title : any
   service: any;
   userList: User[];
   moreIndex:number;
  constructor(private _systemdashService: SystemdashboardService, private _activatedRoute: ActivatedRoute
  ,private _userService: UserService) { }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */


  ngOnInit() {

    this._activatedRoute.params.subscribe((params: Params) => {
       this.service= params.mode;
      });
      const client = '?userId=' + localStorage.getItem('client_id');
    
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
      else if( this.service == 'customerdetails'){
        this._userService.getAllCustomers(client).subscribe(
          result => {
            this.userList = result;
            this.title = 'Total Customers';
          });
        }
  }


  showMoreDetail(index){
    this.moreIndex=index;
  }
}

