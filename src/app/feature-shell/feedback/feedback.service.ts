import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiGateway } from '../../shared/services/api-gateway';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class FeedBackService {

    constructor(public apiGateWay: ApiGateway) { }

    addNewFeedback(feedBack: any): Observable<any> {
        return this.apiGateWay.post<any>("/evaluation", JSON.stringify(feedBack));
    }

}
