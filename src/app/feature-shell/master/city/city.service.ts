import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { City } from './city'
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addCityUrl, updateCityUrl, getCitiesUrl } from '../master.config'

import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
import { StorageService } from '../../../shared/services/storage.service';
@Injectable()
export class CityService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getCities(): Observable<any> {
        return this.apiGateWay.get<City>(
            getCitiesUrl + "?email=" + this._storageService.getUserEmail()
        );
    }

    addCity(reqData: any): Observable<any> {

        return this.apiGateWay.post<City>(
            addCityUrl,
            JSON.stringify(reqData)
        );
    }

    updateCity(reqData: any): Observable<any> {
        return this.apiGateWay.post<City>(
            updateCityUrl,
            JSON.stringify(reqData)
        );
    }
}