import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-shell/auth-shell.service';
import { SharedService } from '../shared/services/shared.service'
import { BranchService } from './master/branch/branch.service';
import { StorageService } from '../shared/services/storage.service';

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
  constructor(private authService: AuthService, private sharedService: SharedService, private _branchService: BranchService, private _sessionStorage: StorageService) {
    sharedService.changeEmitted$.subscribe(Zone.current.wrap(
      text => {
        this.totalUpcomingEvents = text;
        this.arrTodayEvents = text;
      }));
    sharedService.GetEventsGroup();
  }

  ngOnInit() {
    this._sessionStorage.setValue("branchData", null);//clear branchid when page refresh

    this.branchConfig = {
      displayKey: "branchName",
      defaultText: "All Branches",
      defaultTextAdd: true,
      showIcon: true,
      hideWhenOneItem: true
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
    
    this._sessionStorage.setValue("branchData", JSON.stringify($event));
    this.sharedService.setHeaderBranch($event);
  }

  showmastermenu() {
    $("#limastermenu").toggle();
  }

}

