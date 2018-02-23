import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  arrEditProfileInfo: any;
  arrSaveProfileInfo: any;
  isEditMode: boolean = false;
  emailValidationMessage: string = "Email address is required.";
  photoUrl: string = "assets/dist/img/user2-160x160.jpg";
  isShowUpload: boolean = false;
  isPhotoChange: boolean = false;
  prevPhotoUrl: string = "assets/dist/img/user2-160x160.jpg";
  upComingEvents:number;
  constructor(private fb: FormBuilder) {
    this.arrEditProfileInfo =
      {
        UserName: 'Anup.Dubey1', Email: 'anup.dubey1@globallogic.com', FirstName: 'Anup', LastName: 'Dubey', Organisation: 'GlobalLogic',
        AddressLine1: 'Delhi', AddressLine2: 'Noida', PostalCode: '110091', Mobile: '9540084026'
      };
    this.arrSaveProfileInfo = {
      Save_UserName: 'Anup.Dubey1', Save_Email: 'anup.dubey1@globallogic.com', Save_FirstName: 'Anup', Save_LastName: 'Dubey', Save_Organisation: 'GlobalLogic',
      Save_AddressLine1: 'Delhi', Save_AddressLine2: 'Noida', Save_PostalCode: '110091', Save_Mobile: '9540084026'
    };
    this.ProfileDetails();
  }
  ngOnInit() {
  }
  ProfileDetails() {
    this.profileForm = this.fb.group({
      // UserName: [null, Validators.required],
      // Email:[null,Validators.required],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Organisation: [null, Validators.required],
      AddressLine1: [null, Validators.required],
      AddressLine2: [null, Validators.required],
      PostalCode: [null, Validators.required],
      Mobile: [null, Validators.required],
    });
  }


  EditProfileData() {
    this.isEditMode = true;
  }
  CancelEditProfile() {
    this.arrSaveProfileInfo.Save_UserName = this.arrEditProfileInfo.UserName;
    this.arrSaveProfileInfo.Save_Email = this.arrEditProfileInfo.Email;
    this.arrSaveProfileInfo.Save_FirstName = this.arrEditProfileInfo.FirstName;
    this.arrSaveProfileInfo.Save_LastName = this.arrEditProfileInfo.LastName;
    this.arrSaveProfileInfo.Save_Organisation = this.arrEditProfileInfo.Organisation;
    this.arrSaveProfileInfo.Save_AddressLine1 = this.arrEditProfileInfo.AddressLine1;
    this.arrSaveProfileInfo.Save_AddressLine2 = this.arrEditProfileInfo.AddressLine2;
    this.arrSaveProfileInfo.Save_PostalCode = this.arrEditProfileInfo.PostalCode;
    this.arrSaveProfileInfo.Save_Mobile = this.arrEditProfileInfo.Mobile;
    // this.photoUrl = this.prevPhotoUrl;
    this.isEditMode = false;
  }
  SaveProfileData(form: NgForm) {
    this.arrEditProfileInfo.UserName = this.arrSaveProfileInfo.Save_UserName;
    this.arrEditProfileInfo.Email = this.arrSaveProfileInfo.Save_Email;
    this.arrEditProfileInfo.FirstName = this.arrSaveProfileInfo.Save_FirstName;
    this.arrEditProfileInfo.LastName = this.arrSaveProfileInfo.Save_LastName;
    this.arrEditProfileInfo.Organisation = this.arrSaveProfileInfo.Save_Organisation;
    this.arrEditProfileInfo.AddressLine1 = this.arrSaveProfileInfo.Save_AddressLine1;
    this.arrEditProfileInfo.AddressLine2 = this.arrSaveProfileInfo.Save_AddressLine2;
    this.arrEditProfileInfo.PostalCode = this.arrSaveProfileInfo.Save_PostalCode;
    this.arrEditProfileInfo.Mobile = this.arrSaveProfileInfo.Save_Mobile;
    this.isEditMode = false;
    // this.prevPhotoUrl = this.photoUrl;

    $.toaster({ priority: 'success', title: 'Success', message: 'Profile updated successfully' });

  }
  ShowProfileUpload() {
    this.isShowUpload = true;
  }
  HideProfileUpload() {
    this.isShowUpload = false;
  }
  SaveProfileUpload() {
    this.isShowUpload = false;
    this.isPhotoChange=false;
    this.prevPhotoUrl = this.photoUrl;
    $.toaster({ priority: 'success', title: 'Success', message: 'Profile updated successfully' });
  }
  CancelProfileUpload() {
    this.isPhotoChange=false;
    this.photoUrl = this.prevPhotoUrl;
  }
  readPhotoUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.photoUrl = event.target.result;
        this.isShowUpload = false;
        this.isPhotoChange = true;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
