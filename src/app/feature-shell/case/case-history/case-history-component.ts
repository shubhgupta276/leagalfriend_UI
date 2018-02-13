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
  CaseHistory() {
    this.caseHistoryForm = this.fb.group({
      remarks: [null, Validators.required],
    });
  }
  constructor(private fb: FormBuilder) {
    this.CaseHistory();

    this.jsonHistory = [
      { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'Employee', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Employee', Remarks: 'add new remark', Date: this.FormatDate() },
      { Name: 'HR', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'HR', Remarks: 'add new remark', Date: this.FormatDate() },
      // { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      // { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      // { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },
      // { Name: 'Admin', NewValue: '2017-12-20', PrevValue: '2017-12-12', User: 'Admin', Remarks: 'add new remark', Date: this.FormatDate() },

    ];
  }
  ngOnInit() {
    $(document).ready(function(){
      $("#dvHistory").click(function(){
          $("#dvHistoryRemark").toggle("Slow");
          if ($("#dvHistory").find("span").hasClass("glyphicon-plus")) {
           
            $("#dvHistory").find("span.clssign").addClass("glyphicon-minus");
            $("#dvHistory").find("span.clssign").removeClass("glyphicon-plus");
          }
          else {
            $("#dvHistory").find("span.clssign").addClass("glyphicon-plus");
            $("#dvHistory").find("span.clssign").removeClass("glyphicon-minus");
          }
      });
      $("#closebtn").click(function(){
       
        $("#dvHistoryRemark").hide();
      });
      
      $(".toggleCaseHistory").click(function () {
        if ($(".clsListDetails").hasClass("in")) {
          $(this).find("span.clssign").addClass("glyphicon-plus");
          $(this).find("span.clssign").removeClass("glyphicon-minus");
        }
        else {
          $(this).find("span.clssign").addClass("glyphicon-minus");
          $(this).find("span.clssign").removeClass("glyphicon-plus");
        }
      });
  });
  }

clicked(event) {
  event.target.classList.add('class3'); // To ADD
  event.target.classList.remove('class1'); // To Remove
  event.target.classList.contains('class2'); // To check
  event.target.classList.toggle('class4'); // To toggle
}
  SubmitRemarks(data) {
    this.jsonHistory.unshift({ Name: data.remarks, NewValue: '', PrevValue: '', User: '', Remarks: data.remarks, Date: this.FormatDate() });
    this.CaseHistory();
  }
  FormatDate(): string {
    var d = new Date();
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var date = d.getDate() + " " + month[d.getMonth()] + ", " + d.getFullYear();
    var time = d.toLocaleTimeString().toLowerCase();
    return date + " at " + time;
  }
}