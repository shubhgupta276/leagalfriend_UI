import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
declare var $;

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
jsonRunning:any;
jsonCompleted:any;
  constructor() {
    debugger
    this.jsonRunning= [
      {Id:1,CaseId:'I/DRT/3',CourtCaseID:'',CustomerName:'Anup',RecourceType:'DRT',CaseStage:'FOR VALUATION OF ASSET',NextHearingDate:'22-Dec-2017',Branch:'Delhi',Employee:'Anup'  },
      {Id:2,CaseId:'I/LKAD/4',CourtCaseID:'',CustomerName:'Puneet',RecourceType:'LOK_ADALATH',CaseStage:'FOR SALE PERMISSION OF VEHICLE',NextHearingDate:'17-Jan-2018	',Branch:'Delhi',Employee:'Puneet'  },
      {Id:3,CaseId:'I/LKAD/5',CourtCaseID:'',CustomerName:'Vipin',RecourceType:'LOK_ADALATH',CaseStage:'FOR SALE PERMISSION OF VEHICLE',NextHearingDate:'17-Jan-2018	',Branch:'Delhi',Employee:'Vipin'  },
      {Id:4,CaseId:'I/LKAD/6',CourtCaseID:'',CustomerName:'Anil',RecourceType:'LOK_ADALATH',CaseStage:'FOR SALE PERMISSION OF VEHICLE',NextHearingDate:'17-Jan-2018	',Branch:'Delhi',Employee:'Anil'  },
      {Id:5,CaseId:'I/LKAD/7',CourtCaseID:'',CustomerName:'Sourav',RecourceType:'LOK_ADALATH',CaseStage:'FOR SALE PERMISSION OF VEHICLE',NextHearingDate:'17-Jan-2018	',Branch:'Delhi',Employee:'Sourav'  },
    
    ];
    this.jsonCompleted= [
      {Id:1,CaseId:'I/DRT/3',CourtCaseID:'',FillingDate:'2018-01-18',CompletionDate:'2018-01-19',Branch:'Delhi',Court:'',Manager:'Anup'  },
      {Id:2,CaseId:'I/LKAD/4',CourtCaseID:'',FillingDate:'2018-01-19',CompletionDate:'2018-01-19',Branch:'Mumbai',Court:'',Manager:'Puneet'  },
      {Id:3,CaseId:'I/LKAD/5',CourtCaseID:'',FillingDate:'2018-01-21',CompletionDate:'2018-01-21',Branch:'Banglore',Court:'',Manager:'Vipin'  },
      {Id:4,CaseId:'I/LKAD/6',CourtCaseID:'',FillingDate:'2018-01-20',CompletionDate:'2018-01-20',Branch:'Delhi',Court:'',Manager:'Anil'  },
      {Id:5,CaseId:'I/LKAD/7',CourtCaseID:'',FillingDate:'2018-01-24',CompletionDate:'2018-01-25',Branch:'Delhi',Court:'',Manager:'Sourav'  },
    
    ];
   }

  ngOnInit() {   
    setTimeout(function()
  {
    $('#example1').DataTable({
      'paging'      : true,
      'lengthChange': true,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    });
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': true,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    });
  },50);
   
  }

}
