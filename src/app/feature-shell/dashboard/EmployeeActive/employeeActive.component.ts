import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
declare let $;
@Component({
  selector: 'app-employeeactive',
  // templateUrl: './dashboard/employeeactive.html',
  //template: `<h1>employee active</h1>`
  templateUrl:'./employeeactive.html',
  providers: [UserService]
})
export class EmployeeActiveComponent implements OnInit {

  arrActiveEmployeeList = [];
  arrCaseList = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    const client = '?userId=' + localStorage.getItem('client_id');
    this.MostActiveEmployeeList(client);
    this.CaseUpdateList();
  }

  MostActiveEmployeeList(client) {
    this.userService.getActiveEmployees(client).subscribe(
      data => {
        this.arrActiveEmployeeList = data;
      }
    );
    // this.arrActiveEmployeeList = [
    //   { Name: 'Anup', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 75 },
    //   { Name: 'Puneet', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 70 },
    //   { Name: 'Vipin', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 60 },
    //   { Name: 'Anil', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 55 },
    //   { Name: 'Mohit', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 50 },
    //   { Name: 'Sourav', Designation: 'Software Engineer', LastLogin: new Date(), TotalLogin: 33 },
    // ]
  }
  CaseUpdateList() {
    this.arrCaseList = [
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
      { CaseId: '456111', CourtCaseId: '456111', Name: 'Anup', ResourceType: 75, CaseStage: '', NewHearingDate: new Date(), Branch: '', Employee: '', LastUpdate: new Date() },
    ]
  }
}