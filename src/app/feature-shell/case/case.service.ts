import { Injectable } from "@angular/core";
import { EditCase } from "../../shared/models/auth/editcase.model";
import { ApiGateway } from "../../shared/services/api-gateway";
import { StorageService } from "../../shared/services/storage.service";
import { Observable } from "rxjs/Observable";
@Injectable()

export class CaseService {
    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }
    addRemarkHistory(customerData: any): Observable<any> {
        return this.apiGateWay.post<any>(
            'case/file/upload', customerData
        );
    }

    getHistory(caseId: any): Observable<any> {
        return this.apiGateWay.get<any>(
            '/case/history?caseId=' + caseId
        );
    }

    getIndividualCase(type,clientId,startDate,endDate): Observable<any> {
        if(type == 'date'){
            return this.apiGateWay.get('/case/date'+clientId+'&startDate='+
            startDate+'&endDate='+endDate);
        }
        else if(type == 'week'){
          return this.apiGateWay.get('/case/week'+clientId);
        }
        else{
            return this.apiGateWay.get('/case/month'+clientId);
        }
    }

    getRecentUpdatedCases(clientId): any{
        return this.apiGateWay.get('/case/lastupdated'+clientId);
    }
}
