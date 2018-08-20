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

  helpers = Chart.helpers;
  title : any
   service: any;
   userList: User[];
   moreIndex:number;
  constructor(private _systemdashService: SystemdashboardService, private _activatedRoute: ActivatedRoute
  ,private _userService: UserService) { }
  displayedColumns: any;
  dataSource: any;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */


  ngOnInit() {

    this.displayedColumns = ['name', 'email','organization', ];
    this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
   
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
            //this.dataSource = new MatTableDataSource<any>(this.userList);
            //this.dataSource = result;
            this.dataSource.paginator = this.paginator;
            console.log(this.isExpansionDetailRow);
          });
        }
  }


  showMoreDetail(index){
    this.moreIndex=index;
  }
}

export interface Element {
  name: string;
  position: number;
  organization: number;
  symbol: string;
}

const ELEMENT_DATA= [
  {position: 1, name: 'Hydrogen', organization: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', organization: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', organization: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', organization: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', organization: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', organization: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', organization: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', organization: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', organization: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', organization: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', organization: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', organization: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', organization: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', organization: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', organization: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', organization: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', organization: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', organization: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', organization: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', organization: 40.078, symbol: 'Ca'},
];
