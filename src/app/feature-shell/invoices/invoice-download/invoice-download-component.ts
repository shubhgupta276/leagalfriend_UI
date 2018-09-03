import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jsPDF from 'jspdf';
import { InvoicesService } from '../invoices.service';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
import { StorageService } from '../../../shared/services/storage.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import * as html2canvas from 'html2canvas';
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
    totalQuantity: number;
    pageCounter: number;
    recursiveCounter: number;
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
                    // // start test
                    // let counter = 0;
                    // const c = billingArray.length;
                    // while (counter < 1) {
                    //     for (let i = 0; i < 14; i++) {
                    //         billingArray.push(Object.assign({}, billingArray[i]));
                    //     }
                    //     counter++;
                    // }
                    // let lineNumber = 1;
                    // for (let i = 0; i < 15; i++) {
                    //     billingArray[i].billingDesc = lineNumber + ' ' + billingArray[i].billingDesc;
                    //     lineNumber++;
                    // }
                    // // end test
                    this.totalQuantity = billingArray.length;
                    const newArray = [];
                    let index = 0;
                    const sliceNumber = 24;
                    while (billingArray.length > 0) {
                        newArray[index++] = billingArray.splice(0, sliceNumber);
                    }
                    this.downloadData = {
                        data: invoice,
                        list: newArray
                    };
                    setTimeout(() => {
                        this.generateInvoice();
                    }, 100);
                }
            },
            err => console.log(err)
        );
    }

    generateInvoice() {
        setTimeout(() => {
            let pdf;
            pdf = new jsPDF('p', 'pt', 'a4');
            const $downloadEl = document.getElementById('pdfdownload');
            this.pageCounter = document.getElementsByClassName('page2').length;
            this.recursiveCounter = 0;
            [].forEach.call(document.querySelectorAll('.page2'), function (el) {
                el.style.display = 'none';
            });
            this.recursivePage(pdf, $downloadEl);
        }, 200);
    }

    recursivePage(pdf, $selector) {
        const $this = this;
        if ($this.recursiveCounter > 0) {
            document.getElementsByClassName('page2')[$this.recursiveCounter - 1].setAttribute('style', 'display:block');
        }
        pdf.addHTML($selector, function () {
            if ($this.recursiveCounter === 0) {
                document.getElementById('firstPage').style.display = 'none';
            }
            [].forEach.call(document.querySelectorAll('.page2'), function (el) {
                el.style.display = 'none';
            });
            if (++$this.recursiveCounter <= $this.pageCounter) {
                pdf.addPage();
                $this.recursivePage(pdf, $selector);
            } else {
                pdf.save($this.downloadData.data.invoiceNumber + '.pdf');
                document.getElementById('pdfdownload').style.display = 'none';
                setTimeout(() => {
                     window.close();
                }, 200);
            }
        });
    }
}

