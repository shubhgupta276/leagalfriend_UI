import { Component, OnInit } from '@angular/core';
import { debuglog } from 'util';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Case, CasesRunning, CasesCompleted } from '../../shared/models/case/case';
declare var $;

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})

export class CaseComponent implements OnInit {
  caseRunning: Case[];
  caseCompleted: Case[];
  editCaseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.caseRunning = CasesRunning;
    this.caseCompleted = CasesCompleted;
    this.initCaseForm();
  }

  initCaseForm() {
    this.createForm(null);
  }

  showEditModal(c) {
    this.createForm(c);
    $('#editCaseModal').modal('show');
  }

  ngOnInit() {
    setTimeout(function () {
      $('#example2').DataTable({
        'paging': true,
        'lengthChange': true,
        'ordering': true,
        'info': true,
        'autoWidth': false
      });
    }, 50);

    $($.document).ready(function () {
      $('#example1').DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        lengthMenu: [[10, 15, 25, -1], [10, 15, 25, 'All']],
        pageLength: 15,
        oLanguage: {
          sLengthMenu: 'Show _MENU_ rows',
          sSearch: '',
          sSearchPlaceholder: 'Search...'
        }
      });
    });
  }

  createForm(c: Case) {
    this.editCaseForm = this.fb.group({
      compliance: [c == null ? null : c.Compliance],
      caseId: [c == null ? null : c.CaseId, Validators.required],
      courtCaseId: [c == null ? null : c.CourtCaseId],
      recourse: [c == null ? null : c.Resource.id],
      manager: [c == null ? null : c.Manager.id],
      court: [c == null ? null : c.Court.id],
      state: [c == null ? null : c.State.id],
      parentCase: [c == null ? null : c.ParentCase],
      nextHearingDate: [c == null ? null : c.NextHearingDate],
      customerName: [c == null ? null : c.CustomerName.id],
      remark: [c == null ? null : c.Remark, Validators.required],
      groundforclosingfile: [],
      disposedoffFileNo: [],
      branch: [c == null ? null : c.Branch.id],
      filingdate: [c == null ? null : c.FillingDate],
      stage: [c == null ? null : c.CaseStage.id],
      employee: [c == null ? null : c.Employee.id],
      courtplace: [c == null ? null : c.CourtePlace.id],
      oppLawyer: [c == null ? null : c.OppLawyer],
      childCase: [c == null ? null : c.ChaildCase],
      lastHearingDate: [c == null ? null : c.LastHearingDate],
      uploadDocument: [],
      completionDate: [c == null ? null : c.CompletionDate]
    });
  }
}
