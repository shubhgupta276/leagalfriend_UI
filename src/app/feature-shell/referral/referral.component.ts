import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { filter } from "rxjs/operators/filter";
import { debug } from "util";
import { matchValidator } from "../../shared/Utility/util-custom.validation";
import { ReferrelUsers, Refrrel } from "../../shared/models/referrel/referrel";
declare var $;
@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
})
export class ReferralComponent implements OnInit {
    referrelForm: FormGroup;
    arr: ReferrelUsers[];
   // usertype = "All";
    //filterby = "All";
   // selectedUser: Refrrel;
  constructor(private fb: FormBuilder) {
    this.addreferrelform();
  }
  addreferrelform() {
    this.referrelForm = this.fb.group({
        Name: [],
        Email: [null, Validators.required],
        mobileNumber:[]
    });
  }
  ngOnInit() {
      this.GetAllReferrels();
  }

  GetAllReferrels()
  {
      debugger
   this.arr=Refrrel;
   $($.document).ready(function() {
       debugger
    var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
    var selectedPageLength = 15;
    const $table = $("#referreltable").DataTable({
      columns: [
        { name: "Id", orderable: true },
        { name: "Name", orderable: true },
        { name: "Email", orderable: true },
        { name: "Phone", orderable: true },
        { name: "Status", orderable: false }
      ],
      lengthMenu: arLengthMenu,
      pageLength: selectedPageLength,
      oLanguage: {
        sLengthMenu: "Show _MENU_ rows",
        sSearch: "",
        sSearchPlaceholder: "Search..."
      },
      initComplete: function() {
        debugger
        var tableid = "referreltable";
        var $rowSearching = $("#" + tableid + "_wrapper");
        $rowSearching.find(".row:eq(0)").hide();
        debugger
        for (var i = 0; i < arLengthMenu[0].length; i++) {
          var selectText=(arLengthMenu[0][i]==selectedPageLength)?'selected':'';
          $("#ddlLengthMenu").append(
            "<option "+ selectText  +" value=" +
              arLengthMenu[0][i] +
              ">" +
              arLengthMenu[1][i] +
              "</option>"
          );
        }
        $("#ddlLengthMenu").val(selectedPageLength);

        $("#ddlLengthMenu").on("change", function() {
            debugger
          $rowSearching
            .find(".row:eq(0)")
            .find("select")
            .val($(this).val())
            .change();
        });
      }
    });

    $table.columns().every(function() {
      $("#txtSearch").on("keyup change", function() {
        if ($table.search() !== this.value) {
          $table.search(this.value).draw();
        }
      });
    });

    $table.columns().every(function() {
      // user filter
      $("#ddlUserFilter").on("change", function() {
        const status = $(this).val();
        if (status === "All") {
          $table
            .columns(4)
            .search("")
            .draw();
        } else if ($table.columns(4).search() !== this.value) {
          $table
            .columns(4)
            .search(this.value)
            .draw();
        } else {
        }
      });
      // status filter
      $("#ddlStatusFilter").on("change", function() {
          debugger
        const status = $(this).val();
        if (status === "All") {
          $table
            .columns(4)
            .search("")
            .draw();
        } else if ($table.columns(4).search() !== this.value) {
            debugger
          $table
            .columns(4)
            .search(this.value)
            .draw();
        } else {
        }
      });
    });
  });
  }
  adddynamic() {
   var empty = 0;
    $('input[type=text]').each(function(){
       if (this.value == "") {
           empty++;
       } 
    })
    if(empty<=1){
        const $template = $('#optionTemplate'),
            $clone = $template
                .clone()
                .removeClass('hide')
                .removeAttr('id')
                .insertBefore($template),
            $option = $clone.find('[name="option[]"]');

        // Add new field
        $('#referrelForm').formValidation('addField', $option);
    }
}
   
    sendreferrelmail(data: any) {
        debugger
    //     var  values = '';
    //     var $elements = [];
    //     $('input[type=text]').each(function(){
                
    //             //values += this.value;
    //             $elements.push(this.value);
    //         });
    
    //         alert($elements);
    //         //$('body').append(divValue);
      }
  
}
