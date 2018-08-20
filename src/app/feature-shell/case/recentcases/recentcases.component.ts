import { CaseService } from './../case.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recentcases',
  templateUrl: './recentcases.component.html',
  styleUrls: ['./recentcases.component.css'],
  providers: [CaseService]
})
export class RecentcasesComponent implements OnInit {

  constructor(private _caseService: CaseService) { }
 
  datasource;
  displayedColumns;
  ngOnInit() {
    const client = '?userId=' + localStorage.getItem('client_id');
    this.displayedColumns= ['caseId','name','resourceType','hearingDate','branch','employee','lastUpdate'];
    this._caseService.getRecentUpdatedCases(client).subscribe(
      data => {
        this.datasource = data;
      }
    );
  }

}
