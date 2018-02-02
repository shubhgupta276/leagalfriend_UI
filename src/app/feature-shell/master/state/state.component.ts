import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare let $;
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  arr:[any];
  constructor() { }

  ngOnInit() {
    this.GetAllState();
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
  GetAllState()
  {
    this.arr=[
      {State:"Uttar Pradesh"},
      {State:"Andhra Pradesh"},
      {State:"Arunachal Pradesh"},
      {State:"Assam"},
      {State:"Bihar"},
      {State:"Chandigarh "},
      {State:"Chhattisgarh"},
      {State:"Goa"},
      {State:"Dadra and Nagar Haveli "},
      {State:"Gujarat"},
      {State:"Haryana"},
      {State:"Himachal Pradesh"},
      {State:"Jammu & Kashmir"},
      {State:"Jharkhand"},
      {State:"Karnataka"},
      {State:"Kerala"},
      {State:"Lakshadweep "},
      {State:"Madhya Pradesh"},
      {State:"Maharashtra"},
      {State:"Manipur"},
      {State:"Meghalaya"},
      {State:"Mizoram"},
      {State:"Nagaland"},
      {State:"National Capital Territory of Delhi "},
      {State:"Odisha"},
      {State:"Puducherry "},
      {State:"Punjab"},
      {State:"Rajasthan"},
      {State:"Sikkim"},
      {State:"Tripura"},

      
      
    ];
  }
  

}
