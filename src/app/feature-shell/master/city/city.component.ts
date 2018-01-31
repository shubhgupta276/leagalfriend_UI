import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  arCityData:any[]=[];
  constructor() { }

  ngOnInit() {
   this.getCityData();
    $($.document ).ready(function() {
      $('#example1').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false
      });
    });
  }
  
  getCityData(){
        this.arCityData.push(
          {BankCity:"24_PARGANAS_NORTH"},
          {BankCity:"AADIPUR"},
          {BankCity:"AARA"},
          {BankCity:"AASIND"},
          {BankCity:"AASPURE"},
          {BankCity:"ABDASA"},
          {BankCity:"ABOHAR"},
          {BankCity:"ABU_ROAD"},
          {BankCity:"ACHALPUR_CITY"},
          {BankCity:"ACHAMPET"},
          {BankCity:"ADDANKI"},
        );
  }

}
