import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Console } from '@angular/core/src/console';
import { debounce } from 'rxjs/operators/debounce';
declare var $;

@Component({
  selector:'app-history-case',
  templateUrl: '../case-history/case-history.component.html'
})
export class CaseHistoryComponent implements OnInit {
  jsonHistory: any;
  htmlToAdd: string;
  public caseHistoryForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.caseHistoryForm = fb.group({
      remarks: [null, Validators.required],
    });

    this.jsonHistory = [
      { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'Employee', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Employee', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'HR', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'HR', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },

    ];
  }
  ngOnInit() {

  }
  SubmitRemarks(data) {
    debugger
    this.jsonHistory.unshift({ Name: data.remarks, NewValue: '', PrevValue: '', User: '', Remarks: data.remarks, Date: this.FormatDate() })
  }
  FormatDate(): string {
    var d = new Date();
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var date = d.getDate() + " " + month[d.getMonth()] + ", " + d.getFullYear();
    var time = d.toLocaleTimeString().toLowerCase();
    return date + " at " + time;
  }
}