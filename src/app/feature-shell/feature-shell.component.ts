import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-shell/auth-shell.service';
import { SharedService } from '../shared/services/shared.service'
import { BranchService } from './master/branch/branch.service';
import { StorageService } from '../shared/services/storage.service';
import { SelectModule } from 'ng2-select';
declare var $;
declare let Zone: any;
@Component({
  selector: 'app-feature-shell',
  templateUrl: './feature-shell.component.html',
  styleUrls: ['./feature-shell.component.css'],
  providers: [SharedService, BranchService]
})
export class FeatureShellComponent implements OnInit {
  totalUpcomingEvents = 4;
  arrTodayEvents = [];
  arBranches = [];
  branchConfig: any;

  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  constructor(private authService: AuthService, private sharedService: SharedService, private _branchService: BranchService, private _sessionStorage: StorageService) {
    sharedService.changeEmitted$.subscribe(Zone.current.wrap(
      text => {
        this.totalUpcomingEvents = text;
        this.arrTodayEvents = text;
      }));
    sharedService.GetEventsGroup();
  }

  ngOnInit() {

    this._sessionStorage.setValue("branchId", null);//clear branchid when page refresh

    this.branchConfig = {
      displayKey: "branchName",//if objects array passed which key to be displayed defaults to description,
      search: true //enables the search plugin to search in the list,
    }


    this.GetAllBranch();
    $(window.document).ready(function () {
      if ($("skin-black")[0]) {
      } else {
        $("body").addClass("skin-black");
      }
      if ($(".sidebar-mini")[0]) {
      } else {
        $("body").addClass("sidebar-mini");
      }
      if ($(".hold-transition")[0]) {
        $("body").removeClass("hold-transition");
      }
      if ($(".login-page")[0]) {
        $("body").removeClass("login-page");
      }
      if ($(".register-page")[0]) {
        $("body").removeClass("register-page");
      }
      if ($(".wrapper")[0]) {
      } else {
        $("#wrapper_id").addClass("wrapper");
      }
      if ($(".login-box")[0]) {
        $("#wrapper_id").removeClass("login-box");
      }
      if ($(".register-box")[0]) {
        $("#wrapper_id").removeClass("register-box");
      }
      $("#wrapper_id").css({ "height": "auto", "min-height": "100%" });
      $("body").css({ "height": "auto", "min-height": "100%" });
    });
  }

  signOutButton() {
    this.authService.signOut();
  }

  GetAllBranch() {

    this._branchService.getBranches().subscribe(
      result => {

        if (result != null)
          this.arBranches = result.branches;
        else
          console.log(result);
      },
      err => {
        console.log(err);
        this.arBranches = [];
      });
  }

  changeBranch($event) {
    this._sessionStorage.setValue("branchId", ($event) ? $event.id : $event);
    this.sharedService.setHeaderBranch(($event) ? $event.id : $event);
  }

  showmastermenu() {
    $("#limastermenu").toggle();
  }

}

