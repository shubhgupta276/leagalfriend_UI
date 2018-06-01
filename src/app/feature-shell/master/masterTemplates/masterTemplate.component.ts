import { Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileInfo } from '../../../shared/models/master/FileInfo';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { masterTemplateConfig } from './masterTemplate.config';
import { DataTableModule } from '../../../shared/components/data-table/data-table.module';
import { MasterTemplateService } from './masterTemplate.component.service';
declare var $;
declare var myExtObject;
declare var System: any;

@Component({
  selector: 'app-maseterTemplate',
  templateUrl: './masterTemplate.component.html',
  styleUrls: ['./masterTemplate.component.css'],

})

export class MasterTemplatesComponent implements OnInit {

  tableInputData = [];
  columns = masterTemplateConfig;
  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  rowSelect = true;
  hoverTableRow = true;
  table: any;
  fileIdSelected: string;
  form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;
  arr: FileInfo[];
  constructor(private fb: FormBuilder, private masterTemplateService: MasterTemplateService) {
    this.createForm();
    // $($.document).ready(function () {
    //   //$('#previewFile').on('show.bs.modal', function (e) {
    //   //  myExtObject.loadCKEDITOR();
    //   //});
    // });
  }
  ngOnInit() {
    this.GetAllCustomer();
    this.getUploadedFileInfo();
    this.reset();
  }

  getUploadedFileInfo(): void {
    this.masterTemplateService.getuploadedFile()
      .subscribe(x => this.arr = x);

  }

  GetAllCustomer() {

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
        })
      };
    }
  }

  onSubmit() {
    if (!!this.form.value.avatar) {
      const formModel = this.form.value;

      // this.http.post('apiUrl', formModel)

      const decodedString = atob(formModel.avatar.value);
      const FileInfoObje = new FileInfo();
      FileInfoObje.FileName = formModel.avatar.filename;
      FileInfoObje.Id = this.guid();
      FileInfoObje.IsChecked = false;
      FileInfoObje.Lastupdated = formModel.avatar.Lastupdated;
      FileInfoObje.LastUpdatedBy = 'priyanka';
      FileInfoObje.Value = decodedString;
      FileInfoObje.FileType = formModel.avatar.filetype;
      if (!!FileInfoObje) {
        this.masterTemplateService.AddUpladedFile(FileInfoObje);
      }
      this.getUploadedFileInfo();

      $('#addMasterTemplate').modal('hide');
      // FileInfoObje = null;
      this.reset();
    }
  }

  reset() {
    this.createForm();
    this.fileInput.nativeElement.value = '';

  }
  setDataToPreview(FileId) {
    $('#previewFile').modal('show');
    this.fileIdSelected = FileId;
    const docValue = '';
    const objFileInfo = this.arr.find(x => x.Id === FileId);
    System.import('@iarna/rtf-to-html')
      .then(xJS => {
        xJS.fromString(objFileInfo.Value, (err, html) => {
          const error = err;
          // docValue = html;
          const bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(docValue)[1];
          myExtObject.setEditorValue(bodyHtml);
          const getDAta = true;
        });
      });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }



  getCkeditorValue() {

    const newget = System.import('html-to-rtf');
    const ckEditorValue = myExtObject.getEditorValue();
    const rtfContent = '';
    System.import('html-to-rtf')
      .then(xJS => {
        // rtfContent = xJS.convertHtmlToRtf(ckEditorValue);
        const objFileInfo = this.arr.find(x => x.Id === this.fileIdSelected);
        objFileInfo.Value = rtfContent;
      });
    // $('#previewFile').modal('hide');
  }

}

@NgModule(
  {
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [
      MasterTemplatesComponent,
    ],
    providers: [MasterTemplateService]
  }
)

export class MasterTemplateModule { }

