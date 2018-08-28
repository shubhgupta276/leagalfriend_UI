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
                    // let counter = 0;
                    // const c = billingArray.length;
                    // while (counter < 4) {
                    //     for (let i = 0; i < c; i++) {
                    //         billingArray.push(billingArray[i]);
                    //     }
                    //     counter++;
                    // }
                    const newArray = [];
                    newArray[0] = billingArray; // .splice(0, 20);
                    // newArray[1] = billingArray.splice(21, 40);
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
        const $this = this;
        setTimeout(() => {
            let pdf;
            pdf = new jsPDF('p', 'pt', 'a4');
            $('.page2').hide();
            const $downloadEl = document.getElementById('pdfdownload');
            pdf.addHTML($downloadEl, function () {
                pdf.addPage();
                [].forEach.call(document.querySelectorAll('.page1,.invoice-address,.invoice'), function (el) {
                    el.style.display = 'none';
                });
                let counter = 0;
                $('.page2:eq(' + (counter++) + ')').show();
                const totalPage2 = document.getElementsByClassName('page2').length;
                let addPageCount = 0;
                pdf.addHTML($downloadEl, function () {
                    if (addPageCount !== (totalPage2 - 1)) {
                        pdf.addPage();
                    }
                    $('.line-items,.page2').hide();
                    $('.page2:eq(' + (counter++) + ')').show();
                    pdf.addHTML($downloadEl, function () {
                        pdf.save($this.downloadData.data.invoiceNumber + '.pdf');
                    });
                    addPageCount++;
                });
            });
        }, 200);
    }
    // generateInvoice123() {

    //     const pdf = new jsPDF('p', 'pt', 'a4');
    //     const options = {
    //         format: 'PNG',
    //     };

    //     pdf.addHTML(document.getElementById('firstPage'), 15, 20, options, function () {
    //         pdf.addPage();
    //     });
    //     const totalPage2 = document.getElementsByClassName('page2').length;
    //     let addCount = 0;
    //     while (addCount < totalPage2) {
    //         debugger
    //         pdf.addHTML($('.page2:eq(' + (addCount++) + ')'), 15, 20, options, function () {
    //             pdf.addPage();
    //         });
    //     }

    //     // pdf.addHTML(secondPartPage, 15, 20, options, function () { });
    //     const $this = this;
    //     setTimeout(function () {
    //         pdf.save($this.downloadData.data.invoiceNumber + '.pdf');
    //     }, 100);
    // }
    // generateInvoice11() {
    //     const $this = this;
    //     setTimeout(() => {
    //         let pdf;
    //         pdf = new jsPDF('p', 'pt', 'a4');
    //         $('.page2').hide();
    //         const $downloadEl = document.getElementById('pdfdownload');
    //         pdf.addHTML($downloadEl, function () {
    //             pdf.addPage();
    //             [].forEach.call(document.querySelectorAll('.page1,.invoice-address,.invoice'), function (el) {
    //                 el.style.display = 'none';
    //             });
    //             // const totalPage2 = document.getElementsByClassName('page2').length;
    //             let counter = 0;
    //             $('.page2:eq(' + (counter++) + ')').show();
    //             pdf.addHTML($downloadEl, function () {
    //                 pdf.addPage();
    //                 $('.line-items,.page2').hide();
    //                 $('.page2:eq(' + (counter++) + ')').show();
    //                 pdf.addHTML($downloadEl, function () {
    //                     pdf.save($this.downloadData.data.invoiceNumber + '.pdf');
    //                 });
    //             });
    //         });
    //     }, 200);
    // }

    generateInvoice1() {
        const $this = this;
        setTimeout(() => {
            let pdf;
            pdf = new jsPDF('p', 'pt', 'a4');
            $('.page2').hide();
            const $downloadEl = document.getElementById('pdfdownload');
            pdf.addHTML($downloadEl, function () {
                [].forEach.call(document.querySelectorAll('.page1,.invoice-address,.invoice'), function (el) {
                    el.style.display = 'none';
                });
                const totalPage2 = document.getElementsByClassName('page2').length;
                let counter = 0;
                let printCount = 0;
                while (counter < totalPage2) {
                    // pdf.addPage();
                    // $('.page2').hide();
                    // $('.page2:eq(' + (0) + ')').show();
                    pdf.addHTML($downloadEl, function () {
                        pdf.addPage();
                        $('.page2').hide();
                        if (printCount !== 0) {
                            $('.line-items').hide();
                        }
                        $('.page2:eq(' + (0) + ')').show();
                        // tslint:disable-next-line:no-debugger
                        debugger;
                        if (printCount === counter - 1) {
                            pdf.save($this.downloadData.data.invoiceNumber + '.pdf');
                            return;
                        }
                        printCount++;
                    });
                    counter++;
                }
            });
        }, 200);
    }
}
