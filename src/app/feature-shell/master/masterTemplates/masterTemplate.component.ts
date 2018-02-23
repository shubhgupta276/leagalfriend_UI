import { Component, OnInit, ElementRef, ViewChild,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileInfo } from '../../../shared/models/master/FileInfo';
import {MasterTemplateComponentService} from "../masterTemplates/masterTemplate.component.service";

declare var $;
declare var myExtObject;
declare var System :any;

@Component({
    selector : 'app-maseterTemplate',
    templateUrl : './masterTemplate.component.html',
    styleUrls : ['./masterTemplate.component.css']
})
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [
    MasterTemplatesComponent
  ]
}
  
)
export class MasterTemplatesComponent implements OnInit
{
   fileIdSelected :string;
    form: FormGroup;
    
constructor(private fb: FormBuilder,private masterTemplateService : MasterTemplateComponentService) {
  this.createForm();
  $($.document).ready(function() {
  //$('#previewFile').on('show.bs.modal', function (e) {
  //  myExtObject.loadCKEDITOR();
   //});
  });
}
ngOnInit(){
  this.GetAllCustomer();
  this.getUploadedFileInfo();
  this.reset();
}

getUploadedFileInfo(): void {
  this.masterTemplateService.getuploadedFile()
      .subscribe(x => this.arr = x);
}
arr : FileInfo[];
GetAllCustomer() {
  
  $($.document).ready(function() {
    var arLengthMenu = [[10, 15, 25, -1], [10, 15, 25, "All"]];
    var selectedPageLength = 15;
    const $table = $("#example1").DataTable({
      lengthMenu: arLengthMenu,
      pageLength: selectedPageLength,
      oLanguage: {
        sLengthMenu: "Show _MENU_ rows",
        sSearch: "",
        sSearchPlaceholder: "Search..."
      },
      initComplete: function() {
        var tableid = "example1";
        var $rowSearching = $("#" + tableid + "_wrapper");
        $rowSearching.find(".row:eq(0)").hide();

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
        // $("#ddlLengthMenu").val(selectedPageLength);

        $("#ddlLengthMenu").on("change", function() {
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
            .columns(0)
            .search("")
            .draw();
        } else if ($table.columns(0).search() !== this.value) {
          $table
            .columns(0)
            .search(this.value)
            .draw();
        } else {
        }
      });
      // status filter
      $("#ddlStatusFilter").on("change", function() {
        const status = $(this).val();
        if (status === "All") {
          $table
            .columns(2)
            .search("")
            .draw();
        } else if ($table.columns(2).search() !== this.value) {
          $table
            .columns(2)
            .search(this.value)
            .draw();
        } else {
        }
      });
    });
  });
}

@ViewChild('fileInput') fileInput: ElementRef;


createForm() {
  this.form = this.fb.group({
    name: ['', Validators.required],
    avatar: null
  });
}

onFileChange(event) {
  let reader = new FileReader();
  if(event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.get('avatar').setValue({
        filename: file.name,
        filetype: file.type,
        Lastupdated : file.lastModifiedDate,
        value: reader.result.split(',')[1]
      })
    };
  }
}

onSubmit() {
  if(!!this.form.value.avatar){
  const formModel = this.form.value;
  
  // this.http.post('apiUrl', formModel)
 
    var decodedString = atob(formModel.avatar.value);
    var FileInfoObje = new FileInfo();
    FileInfoObje.FileName = formModel.avatar.filename;
    FileInfoObje.Id = this.guid();
    FileInfoObje.IsChecked = false;
    FileInfoObje.Lastupdated = formModel.avatar.Lastupdated;
    FileInfoObje.LastUpdatedBy = "priyanka";
    FileInfoObje.Value = decodedString;
    FileInfoObje.FileType = formModel.avatar.filetype;
    if(!!FileInfoObje){
    this.masterTemplateService.AddUpladedFile(FileInfoObje);
    }
    this.getUploadedFileInfo();
    FileInfoObje = null;
    this.reset();
    $('#addMasterTemplate').modal('hide');
    
  }
}

reset() {
  this.createForm();
  this.fileInput.nativeElement.value = "";
  
}

//set data to editor from the grid for previewing and editing into the editor
setDataToPreview(FileId)
{
  this.fileIdSelected = FileId;
  var docValue = '';
    var objFileInfo = this.arr.find(x=>x.Id == FileId);
    System.import('@iarna/rtf-to-html')
    .then(xJS => {
        xJS.fromString(objFileInfo.Value, (err, html) => {
          var error = err;
           docValue = html;
            var bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(docValue)[1];
           myExtObject.setEditorValue(bodyHtml);
          var getDAta = true;
            })
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

 

getCkeditorValue(){
 
 var newget =  System.import('html-to-rtf');
 var ckEditorValue =myExtObject.getEditorValue();
 var rtfContent ="";
 System.import('html-to-rtf')
    .then(xJS => {
         rtfContent = xJS.convertHtmlToRtf(ckEditorValue);
         var objFileInfo = this.arr.find(x=>x.Id == this.fileIdSelected);
          objFileInfo.Value = rtfContent;
    });
 
  

  
}

}