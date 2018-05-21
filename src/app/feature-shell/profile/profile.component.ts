import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user/user.service';
import { UserModel } from '../../shared/models/user/user.model';
declare var $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  arrEditProfileInfo: any = [];
  arrSaveProfileInfo: any;
  isEditMode: boolean = false;
  emailValidationMessage: string = "Email address is required.";
  photoUrl: string = "assets/dist/img/user2-160x160.jpg";
  isShowUpload: boolean = false;
  isPhotoChange: boolean = false;
  prevPhotoUrl: string = "assets/dist/img/user2-160x160.jpg";
  upComingEvents: number;
  constructor(private fb: FormBuilder, private userService: UserService) {    
    this.BindProfileDetails();
  }
  ngOnInit() {
  }
  BindProfileDetails() {
    var $this = this;
    var client = '?userId=' + localStorage.getItem('client_id');
    this.userService.getUser(client)
      .map(res => res)
      .finally(() => {
        
        this.profileForm = this.fb.group({
          firstName: [$this.arrEditProfileInfo[0].firstName, Validators.required],
          lastName: [$this.arrEditProfileInfo[0].lastName, Validators.required],
          organization: [$this.arrEditProfileInfo[0].organization, Validators.required],
          addressLine1: [$this.arrEditProfileInfo[0].address == null ? null : $this.arrEditProfileInfo[0].address.address1, Validators.required],
          addressLine2: [$this.arrEditProfileInfo[0].address == null ? null : $this.arrEditProfileInfo[0].address.address2, Validators.required],
          postcode: [$this.arrEditProfileInfo[0].address == null ? null : $this.arrEditProfileInfo[0].address.zipCode, Validators.required],
          mobileNumber: [$this.arrEditProfileInfo[0].mobileNumber, Validators.required],
          userId: [$this.arrEditProfileInfo[0].id, Validators.nullValidator],
          roles: [$this.arrEditProfileInfo[0].roles, Validators.nullValidator],
          status: [$this.arrEditProfileInfo[0].status, Validators.nullValidator],
          email: [$this.arrEditProfileInfo[0].email, Validators.nullValidator],
          login: [$this.arrEditProfileInfo[0].login, Validators.nullValidator],
          password: [$this.arrEditProfileInfo[0].password, Validators.nullValidator],
        });
        
      })
      .subscribe(
        data => {
          data.name = data.firstName + " " + data.lastName;
          $this.arrEditProfileInfo[0] = data;

        },
        error => console.log(error)
      );


  }


  EditProfileData() {
    this.isEditMode = true;
  }
  CancelEditProfile() {
    this.isEditMode = false;
  }
  SaveProfileData(form: NgForm) {
    const finalData = this.GetUserEditData(form);
    this.userService.editUser(finalData).subscribe(
      result => {
        if (result.body.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: 'Profile updated successfully' });
          this.bindProfileDataAfterEdit(finalData);
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      });
    this.isEditMode = false;
    // this.prevPhotoUrl = this.photoUrl;
  }
  bindProfileDataAfterEdit(data) {
    this.arrEditProfileInfo[0].organization = data.organization;
    this.arrEditProfileInfo[0].address.address1 = data.address.address1;
    this.arrEditProfileInfo[0].address.address2 = data.address.address2;
    this.arrEditProfileInfo[0].address.zipCode = data.address.zipCode
    this.arrEditProfileInfo[0].mobileNumber = data.mobileNumber;
    this.arrEditProfileInfo[0].email = data.email;

  }
  GetUserEditData(data): UserModel {
    const userdata = new UserModel();
    userdata.id = data.userId;
    userdata.firstName = data.firstName;
    userdata.lastName = data.lastName;
    userdata.organization = data.organization;
    userdata.addressLine1 = data.addressLine1;
    userdata.addressLine2 = data.addressLine2;
    userdata.email = data.email;
    userdata.mobileNumber = data.mobileNumber;
    userdata.roles = data.roles;
    userdata.address =
      {
        address1: data.addressLine1,
        address2: data.addressLine2,
        city: '',
        state: '',
        zipCode: data.postcode
      }
      ;
    userdata.status = data.status;
    userdata.isClient = false;
    userdata.clientId = Number(localStorage.getItem('client_id'));
    userdata.login = data.login;
    userdata.password = data.password;
    return userdata;
  }
  ShowProfileUpload() {
    this.isShowUpload = true;
  }
  HideProfileUpload() {
    this.isShowUpload = false;
  }
  SaveProfileUpload() {
    this.isShowUpload = false;
    this.isPhotoChange = false;
    this.prevPhotoUrl = this.photoUrl;
    $.toaster({ priority: 'success', title: 'Success', message: 'Profile updated successfully' });
  }
  CancelProfileUpload() {
    this.isPhotoChange = false;
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
