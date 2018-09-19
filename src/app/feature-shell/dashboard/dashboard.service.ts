import { StorageService } from './../../shared/services/storage.service';
import { ApiGateway } from './../../shared/services/api-gateway';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) { }


  getDashboardTiles(): Observable<any> {
    const apiUrl = '?userId=' + this._storageService.getUserId();
    return this.apiGateWay.get('dash/total'+apiUrl);
  }

}
