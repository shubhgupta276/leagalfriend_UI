import { Injectable } from '@angular/core'
import { retry } from 'rxjs/operator/retry';
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../../../shared/services/api-gateway';
import { addDistrictUrl, updateDistrictUrl, getDistrictsUrl } from '../master.config'
import { District } from './district'
import { ResourceLoader } from '@angular/compiler';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
@Injectable()
export class DistrictService {
    arCityData: District[];

    constructor(private apiGateWay: ApiGateway) {

    }

    getDistricts(reqData: any): Observable<any> {

        return this.apiGateWay.post<District>(
            getDistrictsUrl,
            JSON.stringify(reqData)
        );
    }

    addDistrict(reqData: any): Observable<any> {
        
        return this.apiGateWay.post<District>(
            addDistrictUrl,
            JSON.stringify(reqData)
        );
    }
    updateDistrict(reqData: any): Observable<any> {
        return this.apiGateWay.post<District>(
            updateDistrictUrl,
            JSON.stringify(reqData)
        );
    }

}