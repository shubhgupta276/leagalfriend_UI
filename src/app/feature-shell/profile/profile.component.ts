import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { UserModel } from '../../shared/models/user/user.model';
declare var $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  arrEditProfileInfo: any;
  arrSaveProfileInfo:any;
  isEditMode:boolean=false;
  constructor() {
    this.arrEditProfileInfo =
      {
        UserName: 'Anup.Dubey1', Email: 'anup.dubey1@globallogic.com', FirstName: 'Anup', LastName: 'Dubey', Organisation: 'GlobalLogic',
        AddressLine1: 'Delhi', AddressLine2: 'Noida', PostalCode: '110091', Mobile: '9540084026'
      };
      this.arrSaveProfileInfo = {
        Save_UserName: 'Anup.Dubey1', Save_Email: 'anup.dubey1@globallogic.com', Save_FirstName: 'Anup', Save_LastName: 'Dubey', Save_Organisation: 'GlobalLogic',
        Save_AddressLine1: 'Delhi', Save_AddressLine2: 'Noida', Save_PostalCode: '110091', Save_Mobile: '9540084026'
      };
      debugger
  }

  ngOnInit() {
  }
  EditProfileData()
  {
    this.isEditMode=true;
  }
  CancelEditProfile()
  {
    this.arrSaveProfileInfo.Save_UserName = this.arrEditProfileInfo.UserName;
    this.arrSaveProfileInfo.Save_Email = this.arrEditProfileInfo.Email;
    this.arrSaveProfileInfo.Save_FirstName = this.arrEditProfileInfo.FirstName;
    this.arrSaveProfileInfo.Save_LastName = this.arrEditProfileInfo.LastName;
    this.arrSaveProfileInfo.Save_Organisation = this.arrEditProfileInfo.Organisation;
    this.arrSaveProfileInfo.Save_AddressLine1 = this.arrEditProfileInfo.AddressLine1;
    this.arrSaveProfileInfo.Save_AddressLine2 = this.arrEditProfileInfo.AddressLine2;
    this.arrSaveProfileInfo.Save_PostalCode = this.arrEditProfileInfo.PostalCode;
    this.arrSaveProfileInfo.Save_Mobile = this.arrEditProfileInfo.Mobile;
    this.isEditMode=false;
  }
  SaveProfileData(form:NgForm)
  {   
    this.arrEditProfileInfo.UserName = this.arrSaveProfileInfo.Save_UserName;
    this.arrEditProfileInfo.Email = this.arrSaveProfileInfo.Save_Email;
    this.arrEditProfileInfo.FirstName = this.arrSaveProfileInfo.Save_FirstName;
    this.arrEditProfileInfo.LastName = this.arrSaveProfileInfo.Save_LastName;
    this.arrEditProfileInfo.Organisation = this.arrSaveProfileInfo.Save_Organisation;
    this.arrEditProfileInfo.AddressLine1 = this.arrSaveProfileInfo.Save_AddressLine1;
    this.arrEditProfileInfo.AddressLine2 = this.arrSaveProfileInfo.Save_AddressLine2;
    this.arrEditProfileInfo.PostalCode = this.arrSaveProfileInfo.Save_PostalCode;
    this.arrEditProfileInfo.Mobile = this.arrSaveProfileInfo.Save_Mobile;
    this.isEditMode=false;
    
  $.toaster({ priority : 'success', title : 'Success', message : 'Profile updated successfully'});

  }
}
