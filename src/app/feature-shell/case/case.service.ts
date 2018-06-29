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
}
