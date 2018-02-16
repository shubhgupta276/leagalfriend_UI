import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Wallet } from './wallet'
declare let $;
@Component({
    selector: "app-wallet",
    templateUrl: "./wallet.component.html",
    styleUrls: ["./wallet.component.html"]
})
export class WalletComponent implements OnInit {
    arListWalletData: Wallet[] = [];
    ngOnInit() {

        this.getWalletData();
        var $this = this;
        $($.document).ready(function () {
            $this.generateDataTable();
        });

    }

    generateDataTable() {
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
                    debugger
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
    getWalletData() {
        for (let i = 1; i <= 25; i++) {

            this.arListWalletData.push({
                date: new Date(2018, ((i > 11) ? 1 : i), i),
                creditAmount: (i % 2 == 0) ? 51.2 * i : 0,
                debitAmount: (i % 2 != 0) ? 10 * i : 0,
                description: (i % 2 == 0) ? "Credit in your account" : "Debit from your account",
                balance: 55
            });

        }
    }
}