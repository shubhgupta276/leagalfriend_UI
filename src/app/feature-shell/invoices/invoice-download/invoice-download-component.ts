import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jsPDF from 'jspdf';
import { InvoicesService } from '../invoices.service';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
import { StorageService } from '../../../shared/services/storage.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
@Component({
    selector: 'app-invoice',
    templateUrl: './invoice-download-component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./invoice-download-component.css'],

})
export class InvoiceDownloadComponent implements OnInit {
    downloadData: any;
    logoURL: any;
    id: any;
    isInstitutionalTab: boolean;
    constructor(private invoiceService: InvoicesService, private _activatedRoute: ActivatedRoute,
        private _storageService: StorageService, public sanitizer: DomSanitizer) {
    }
    ngOnInit() {
        try {
            this._activatedRoute.params.subscribe((params) => {
                // tslint:disable-next-line:radix
                this.id = parseInt(params.id);
                this.isInstitutionalTab = JSON.parse(params.institutional);
            });
        } catch (error) {

        }

        this.getDownloadTemplateDetail();
        this.getDownloadDetail();
    }

    getDownloadTemplateDetail() {
        this.invoiceService.getInvoiceTemplate().subscribe(
            result => {
                this.logoURL = this.sanitizer.bypassSecurityTrustUrl('data:image/png+xml;base64,' + result.invoiceHeader.logo);
            });
    }

    getDownloadDetail() {
        this.invoiceService.getInvoiceDetail(this.id, this.isInstitutionalTab).subscribe(
            (result) => {
                if (result) {
                    this._storageService.clearInvoiceData();
                    const invoice = result.invoice;
                    const billingArray = (this.isInstitutionalTab) ? result.institutionalBillings : result.individualBillings;
                    this.downloadData = {
                        data: invoice,
                        list: billingArray
                    };
                    this.generateInvoice();
                }
            },
            err => console.log(err)
        );
    }

    generateInvoice() {
        const $this = this;
        setTimeout(() => {
            let pdf;
            pdf = new jsPDF();
            pdf.addHTML(document.getElementById('pdfdownload'), function () {
                pdf.save($this.downloadData.data.invoiceNumber + '.pdf');
                setTimeout(() => {
                    window.close();
                }, 300);
                $this.downloadData = null;
            });
        }, 200);
    }
}
