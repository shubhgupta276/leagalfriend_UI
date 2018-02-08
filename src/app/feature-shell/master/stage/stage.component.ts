import { Component, OnInit } from '@angular/core';
import { AddStageMasterComponent } from "./add-stage/add-stage.component";
import { EditStageMasterComponent } from "./edit-stage/edit-stage.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare let $;

@NgModule(
  {
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
    declarations: [
      StageComponent,
      AddStageMasterComponent,
      EditStageMasterComponent,
    ]
  }
)
@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllStage();
    $($.document).ready(function(){
      $("#example1").DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        lengthMenu: [[10, 15, 25, -1], [10, 15, 25, "All"]],
        pageLength: 15,
        oLanguage: {
          sLengthMenu: "Show _MENU_ rows",
          sSearch: "",
          sSearchPlaceholder: "Search..."
        }
      });
    }
  );
  }
  GetAllStage()
  {
     this.arr=[
      { Recource:"ARB",StageCode:"1ST_NOTICE_BY_ARBITRATOR",StageName:"1ST NOTICE BY ARBITRATOR"},
      { Recource:"ARB",StageCode:"2ND_NOTICE_BY_ARBITRATOR",StageName:"2ND NOTICE BY ARBITRATOR"},
      { Recource:"ARB",StageCode:"APPEAL_US_34_FILED",StageName:"APPEAL U/S 34 FILED"},
      { Recource:"ARB",StageCode:"APPEAL_US_37_FILED",StageName:"APPEAL U/S 37 FILED"},
      { Recource:"ARB",StageCode:"APPEARANCE",StageName:"APPEARANCE"},
      { Recource:"ARB",StageCode:"ARGUMENTS",StageName:"ARGUMENTS"},
      { Recource:"ARB",StageCode:"ARREST_WARRANT",StageName:"ARREST WARRANT"},
      { Recource:"ARB",StageCode:"ATTACHMENT_WARRANT",StageName:"ATTACHMENT WARRANT"},
      { Recource:"ARB",StageCode:"AWARD_COPY_SENT",StageName:"AWARD COPY SENT"},
      { Recource:"ARB",StageCode:"AWARD_PASSED",StageName:"AWARD PASSED"},
      { Recource:"ARB",StageCode:"AW_EXECUTED",StageName:"ATTACHMENT WARRANT EXECUTED"}

     ]
  }

  showEditModal(){
    $('#editStageMasterModal').modal('show');
    }

}
