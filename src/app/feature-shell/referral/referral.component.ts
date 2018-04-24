import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter } from "rxjs/operators/filter";
import { debug } from "util";
import { matchValidator } from "../../shared/Utility/util-custom.validation";
import { ReferrelUsers, Refrrel } from "../../shared/models/referrel/referrel";
import { ReferralService } from "./referral.service";
import { StorageService } from "../../shared/services/storage.service";
declare var $;
@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css'],
  providers: [ReferralService]
})
export class ReferralComponent implements OnInit {
  referFriendForm: FormGroup;
  arReferals: any = [];
  showReferFriend: boolean = false;
  constructor(private fb: FormBuilder, private _referralService: ReferralService, private _storageService: StorageService) {
    this.createForm();
  }

  ngOnInit() {
    this.GetAllReferrels();
  }

  createForm() {
    this.referFriendForm = this.fb.group({
      referFriend: this.fb.array([
        this.addReferFriendForm()
      ])
    })
  }

  addReferFriendForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      emailId: [null, Validators.email],
      mobileNo: [null, Validators.required],
      message: [null, Validators.required]
    })
  }

  submitReferFriend(data) {
    if (this.referFriendForm.valid) {
      data.forEach(item => {
        const reqData = {
          email: item.emailId,
          name: item.name,
          referrerId: this._storageService.getUserId()
        };

        this._referralService.referFriend(reqData).subscribe(
          (result) => {
            
            this.showReferFriend = false;
            this.createForm();
            this.bindDatatable();
          },
          err => {
            console.log(err);
          });

      });
    }
  }

  addReferFriendRow() {
    if (this.referFriendForm.valid) {
      const control = <FormArray>this.referFriendForm.controls['referFriend']
      control.push(this.addReferFriendForm())
    }
  }

  removeReferFriendRow(index) {
    const control = <FormArray>this.referFriendForm.controls['referFriend'];
    control.removeAt(index);
  }

  toggleReferFriend() {
    this.showReferFriend = !this.showReferFriend;
  }

  GetAllReferrels() {

    this._referralService.getReferrals().subscribe(
      (result) => {

        if (result != null && result.length > 0) {
          result.forEach(item => {
            this.arReferals.push(item);
          });
          
          setTimeout(() => {
            this.bindDatatable();
          }, 100);
        }
        else
          console.log(result);
      },
      err => {
        console.log(err);
      })
    //referreltable
  }

  bindDatatable() {

    var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
    var selectedPageLength = 15;

    var $table = $("#example1").DataTable({
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      lengthMenu: arLengthMenu,
      pageLength: selectedPageLength,
      oLanguage: {
        sLengthMenu: "Show _MENU_ rows",
        sSearch: "",
        sSearchPlaceholder: "Search..."
      },
      initComplete: function () {
        var tableid = "example1";
        var $rowSearching = $("#" + tableid + "_wrapper");
        $rowSearching.find(".row:eq(0)").hide();

        for (var i = 0; i < arLengthMenu[0].length; i++) {
          $("#ddlLengthMenu").append("<option value=" + arLengthMenu[0][i] + ">" + arLengthMenu[1][i] + "</option>");
        }
        $("#ddlLengthMenu").val(selectedPageLength);

        $("#ddlLengthMenu").on("change", function () {
          $rowSearching.find(".row:eq(0)").find("select").val($(this).val()).change();
        });
      }
    });

    $table.columns().every(function () {
      $('#txtSearch').on('keyup change', function () {
        if ($table.search() !== this.value) {
          $table.search(this.value).draw();
        }
      });
    });

  }

}
