import {  Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileInfo } from '../../../shared/models/master/FileInfo';
import { DocumentTemplateModel } from '../../../shared/models/master/document-template.model';
import { MasterService } from '../master.service';
import { saveAs } from 'file-saver/FileSaver.js';
import { masterTemplateConfig } from './masterTemplate.config';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { ActionColumnModel } from '../../../shared/models/data-table/action-column.model';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
declare var $;
declare var myExtObject;
declare var System: any;

@Component({
  selector: 'app-master-template',
  templateUrl: './masterTemplate.component.html',
  styleUrls: ['./masterTemplate.component.css'],
  providers: [MasterService]
})
export class MasterTemplatesComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput: ElementRef;
  arr = [];
  table: any;
  fileIdSelected: number;
  form: FormGroup;
  tableInputData = [];
  columns = masterTemplateConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = false;
  hoverTableRow = true;
  actionColumnConfig: ActionColumnModel;
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.reset();
    this.setActionConfig();
    this.getDocuments();
  }

  getDocuments() {
    this.tableInputData = [];
    this.masterService.getDocumentTemplatesList().subscribe(
      result => {
        if (result && result.length > 0) {
          this.arr = result;
          result.forEach(element => {
            const tableRow = {
              'fileName': element.description,
              'lastUpdated': element.updatedDate,
              'lastUpdatedBy': element.firstName,
              'id': element.id
            };
            this.tableInputData.push(tableRow);
          });
          this.dataTableComponent.ngOnInit();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  onRowClick(event) {
    console.log(event);
  }
  onRowDoubleClick(event) {
    this.setDataToPreview(event.id);
  }

  onRowSelect(event) {
    console.log(event);
  }
  onActionBtnClick(event) {
    if (event.eventType==='delete' && event.data) {
        this.deleteTemplate(event.data.id);
    }
  }
  setActionConfig() {
    this.actionColumnConfig = new ActionColumnModel();
    this.actionColumnConfig.displayName = 'Action';
    this.actionColumnConfig.showDelete = true;
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          Lastupdated: file.lastModifiedDate,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  onSubmit() {
    if (!!this.form.value.avatar) {
      const documentTemplateModel = new DocumentTemplateModel();
      const formModel = this.form.value;
      documentTemplateModel.createdDate = formModel.avatar.Lastupdated;
      documentTemplateModel.description = formModel.avatar.filename.split('.')[0];
      documentTemplateModel.document = formModel.avatar.value;
      documentTemplateModel.id = 12345;
      // tslint:disable-next-line:radix
      documentTemplateModel.updatedBy = parseInt(
        localStorage.getItem('client_id')
      );
      documentTemplateModel.updatedDate = formModel.avatar.Lastupdated;
      // tslint:disable-next-line:radix
      documentTemplateModel.userId = parseInt(
        localStorage.getItem('client_id')
      );
      this.masterService.addDocumentTemplate(documentTemplateModel).subscribe(
        result => {
          this.getDocuments();
          if (result && result.httpcode && result.httpcode === 500) {
            $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
          } else {
            $.toaster({ priority: 'success', title: 'Success', message: 'Template added successfully' });
          }
        },
        err => {
          $.toaster({ priority: 'error', title: 'Error', message: 'Error occurred' });
          console.log(err);
        }
      );
      $('#addMasterTemplate').modal('hide');
      this.reset();
    }
  }

  base64ToBlob(b64Data, contentType, sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  reset() {
    this.createForm();
    this.fileInput.nativeElement.value = '';
  }

  // set data to editor from the grid for previewing and editing into the editor
  setDataToPreview(FileId) {
    $('#previewFile').modal('show');
    this.fileIdSelected = FileId;
    let docValue = '';
    const objFileInfo = this.arr.find(x => x.id === FileId);
    System.import('@iarna/rtf-to-html').then(xJS => {
      xJS.fromString(atob(objFileInfo.document), (err, html) => {
        const error = err;
        docValue = html;
        const bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(docValue)[1];
        myExtObject.setEditorValue(bodyHtml);
        const getDAta = true;
      });
    });
  }

  getCkeditorValue() {
    const newget = System.import('html-to-rtf');
    const ckEditorValue = myExtObject.getEditorValue();
    let rtfContent = '';
    System.import('html-to-rtf').then(xJS => {
      rtfContent = xJS.convertHtmlToRtf(ckEditorValue);
      const objFileInfo = this.arr.find(x => x.id === this.fileIdSelected);
      objFileInfo.document = btoa(rtfContent);
    });
    $('#previewFile').modal('hide');
  }

  deleteTemplate(templateId){
      this.masterService.deleteDocumentTemplate(templateId).subscribe(
        result => {
          this.getDocuments();
          if (result && result.httpcode && result.httpcode === 500) {
            $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
          } else {
            $.toaster({ priority: 'success', title: 'Success', message: 'Template deleted successfully' });
          }
        },
        err => {
          console.log(err.error);
          $.toaster({ priority: 'error', title: 'Error', message: 'Error occurred' });
        }
      );
  }
}

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
  declarations: [MasterTemplatesComponent]
})
export class MasterTemplatesModule {}
