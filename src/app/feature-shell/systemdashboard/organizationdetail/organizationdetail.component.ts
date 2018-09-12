import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SystemdashboardService } from '../systemdashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Organization } from '../../../shared/models/user/organization';

@Component({
  selector: 'app-organizationdetail',
  templateUrl: './organizationdetail.component.html',
  styleUrls: ['./organizationdetail.component.css']
})
export class OrganizationdetailComponent implements OnInit {

  service: any;
  data: Organization[];
  displayedColumns = ['organization', 'count'];
  dataSource;
  name;
  countname;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private _activatedRoute: ActivatedRoute, private _systemdashService: SystemdashboardService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
       this.service= params.mode;
      });
    
      if(this.service =='user'){
        this._systemdashService.getOrgUsers('/users/org/totalusers/').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
        });    
        this.name = 'Total Users';
        this.countname= 'Users Count';
      }
      else if(this.service =='case'){
        this._systemdashService.getOrgUsers('/case/org/').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
        });    
        this.name = 'Total Cases';
        this.countname= 'Case Count';
      }
      else if(this.service =='for'){
        this._systemdashService.getOrgUsers('/case/org/for').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
        });    
        this.name = 'Total For Cases';
        this.countname= 'For Case Count';
      }
      else if(this.service =='against'){
        this._systemdashService.getOrgUsers('/case/org/against').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
        });    
        this.name = 'Total Against Cases';
        this.countname= 'Against Case Count';
      }
  }
}

