import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiGateway } from '../../shared/services/api-gateway';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {CalenderEvent} from './calender-event';
import {addCalenderEvent, getUsersCalenderEvent} from './calender.config';

@Injectable()
export class CalenderService{

    constructor(public apiGateWay: ApiGateway) { }

    addCalenderEvent(calenderEvent: CalenderEvent): Observable<CalenderEvent> {
        return this.apiGateWay.post<CalenderEvent>(addCalenderEvent, JSON.stringify(calenderEvent));
      }

      getUsersCalenderEvent(userId: Number): Observable<any> {
         return this.apiGateWay.postWithParam<any>(getUsersCalenderEvent, '?userId='+userId);
      }
}