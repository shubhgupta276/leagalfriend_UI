import { Component, OnInit } from "@angular/core";
declare let $;
@Component({
  selector: "app-institution",
  templateUrl: "./institution.component.html",
  styleUrls: ["./institution.component.css"]
})
export class InstitutionComponent implements OnInit {
  arr: [any];
  constructor() {}

  ngOnInit() {
    this.GetAllInstitute();
    $($.document).ready(function () {

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

    });
  }
  GetAllInstitute() {
    this.arr = [
      { InstituteName: "AXIS BANK LTD." },
      { InstituteName: "CORPORATION BANK LTD" },
      { InstituteName: "DCB BANK LTD." },
      { InstituteName: "HDFC BANK Ltd." },
      { InstituteName: "ICICI BANK LTD." },
      { InstituteName: "INDIA INFOLINE FINANCE LIMITED" },
      { InstituteName: "INTEC CAPITAL LIMITED" },
      { InstituteName: "KOTAK MAHINDRA BANK LTD." },
      { InstituteName: "MAGMA HOUSING FINANCE LIMITED" },
      { InstituteName: "MODERN CAPITAL LIMITED" },
      { InstituteName: "RBL BANK LTD." },
      { InstituteName: "RBS BANK" },
      { InstituteName: "TVS FINANCE LIMITED" },
      { InstituteName: "VIJAYA BANK" }
    ];
  }

  showEditModal(){
    $('#editInstitutionMasterModal').modal('show');
    }
}
