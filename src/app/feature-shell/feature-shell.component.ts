import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-shell/auth-shell.service';
import { SharedService } from '../shared/services/shared.service'
import { BranchService } from './master/branch/branch.service';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from './user/user.service';
import { DatePipe } from '@angular/common';
declare var $;
declare let Zone: any;
@Component({
  selector: 'app-feature-shell',
  templateUrl: './feature-shell.component.html',
  styleUrls: ['./feature-shell.component.css'],
  providers: [SharedService, BranchService,UserService,DatePipe]
})
export class FeatureShellComponent implements OnInit {
  totalUpcomingEvents = 4;
  arrTodayEvents = [];
  arBranches = [];
  branchConfig: any;
  userDetails = {
    Name: "",
    profile: null
  }
  subscriptionEndDate={
    subscriptionEndDate:""
  }
  
  constructor(private authService: AuthService, private sharedService: SharedService,
    private _storageService: StorageService,
    private _branchService: BranchService,
    private userService: UserService,private datePipe: DatePipe) {
    sharedService.changeEmitted$.subscribe(Zone.current.wrap(
      text => {
        this.totalUpcomingEvents = text;
        this.arrTodayEvents = text;
      }));
    sharedService.GetEventsGroup();
  }

  ngOnInit() {
   
    var branchData = this._storageService.getBranchData();
    this.branchConfig = {
      displayKey: "branchName",
      showFirstSelected: true,
      showFirstSelectedValue: branchData,
      showFirstSelectedKey: "id",
      defaultTextAdd: false,
      showIcon: true,
      hideWhenOneItem: true
      
      
    }
    this.blinker();
   
    this.GetAllBranch();
    this.GetLoggedInUserDetails();
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
   blinker() {
    $('.blink_me').fadeOut(500);
    $('.blink_me').fadeIn(500);
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
    this._storageService.setBranchData($event);
    this.sharedService.setHeaderBranch($event);
  }

  showmastermenu() {
    $("#limastermenu").toggle();
  }
GetLoggedInUserDetails()
{
  
  var $this = this;
  var client = '?userId=' + localStorage.getItem('client_id');
  this.userService.getUser(client).subscribe(
      data => {   
      
         if(data.showSubscriptionFlash==true)
         {
           $("#flash").show();
         }
         else
         {
          $("#flash").hide();
         }
         debugger
        $this.userDetails.Name = data.firstName + " " + data.lastName;
        $this.subscriptionEndDate.subscriptionEndDate=this.datePipe.transform(data.subscriptionEndDate,"yyyy-MM-dd");
      },
      error => console.log(error)
    );
    
}
}

