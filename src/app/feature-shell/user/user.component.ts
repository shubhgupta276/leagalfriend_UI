// import { Component, OnInit } from '@angular/core';
// declare var $;
// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//     $('#example1').DataTable();
//     $('#example2').DataTable({
//       'paging'      : true,
//       'lengthChange': false,
//       'searching'   : false,
//       'ordering'    : true,
//       'info'        : true,
//       'autoWidth'   : false
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserRoles, UserStatus, KeyValue } from '../../shared/Utility/util-common';
import { matchValidator } from '../../shared/Utility/util-custom.validation';
declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  signupForm: FormGroup;

  Roles: KeyValue[] = UserRoles;
  Status: KeyValue[] = UserStatus;
  emailValidationMessage: string = "Email address is required.";

  createSignup() {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      organisation: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: [null, Validators.required],
      postalCode: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.compose([Validators.required, matchValidator("password")])],
      mobileNumber: [null, Validators.required],
      role: [1],
      status: [1]
    });
  }

  constructor(private fb: FormBuilder) {
    this.createSignup();
  }

  registerUser(data) {
    debugger;
    alert("Regiter user.");
  }

  ngOnInit() {
    $('#example1').DataTable();
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    });

    this.signupForm.get('email').valueChanges.subscribe(
      (e) => {
        if (e != "") {
          this.signupForm.get('email').setValidators([Validators.email]);
          this.emailValidationMessage = "Email format is not correct.";
        } else {
          this.signupForm.get('email').setValidators([Validators.required]);
          this.emailValidationMessage = "Email address is required.";
        }
      }
    )
  }

}

