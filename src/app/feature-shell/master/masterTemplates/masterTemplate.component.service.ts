import { Injectable } from "@angular/core"
import { FileInfo } from '../../../shared/models/master/FileInfo';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
@Injectable()
export class MasterTemplateService {
  FileList: FileInfo[];

  constructor() {
    this.FileList = [];
  }
  getuploadedFile(): Observable<FileInfo[]> {
    return of(this.FileList);
  }
  AddUpladedFile(AdObj: FileInfo): void {
    this.FileList.push(AdObj);
  }

}