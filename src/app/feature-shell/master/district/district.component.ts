import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

declare let $;
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  arr: any[];
  constructor() { }

  ngOnInit() {
   
    this.GetAllDistrict();
    $($.document).ready(function(){
      $('#example1').DataTable();
    }
  );
    
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    });
  }

  GetAllDistrict()
  {
    debugger;
     this.arr=[
       {District:"Bijnor"},
       {District:"Moradabad"},
       {District:"Gaziabaad"},
       {District:"Adilabad"},
       {District:"Agra"},
       {District:"Ahmed Nagar"},
       {District:"Ahmedabad"},
       {District:"Aizawl"},
       {District:"Ajmer"},
       {District:"Akola"},
       {District:"Alappuzha"},
       {District:"Aligarh"},
       {District:"Alirajpur"},
       {District:"Allahabad"},
       {District:"Almora"},
       {District:"Alwar"},
       {District:"Ambala"},
       {District:"Amravati"},
       {District:"Amreli"},
       {District:"Amritsar"},
      ];
  }
  }


