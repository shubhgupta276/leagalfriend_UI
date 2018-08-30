import { ApiGateway } from '../../shared/services/api-gateway';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user/user';
import { Organization } from '../../shared/models/user/organization';
import {SystemTiles} from './systemtile.model';


@Injectable()
export class SystemdashboardService {

  url = '/usermanagement';
  constructor(private apiGateWay: ApiGateway) { }

  getTileInfo(): Observable<SystemTiles> {
     
    return this.apiGateWay.get("/dash/systemtiles");
  }
  
  getUsers(mode): Observable<User[]>{
    return this.apiGateWay.get(this.url+mode);
  }

  getOrgUsers(path): Observable<Organization[]>{
    return this.apiGateWay.get(path);
  }

  getCases(): Observable<Object[]>{
    return this.apiGateWay.get('/case/all');
  }
}
