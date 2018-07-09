import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiGateway } from '../../shared/services/api-gateway';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CalenderEvent } from './calender-event';
import { addCalenderEvent, getUsersCalenderEvent } from './calender.config';
import { Calender } from '../../shared/models/auth/calender.model';
import { Recourse } from '../master/resource/Recourse';
import { StorageService } from '../../shared/services/storage.service';

@Injectable()
export class CalenderService {

    constructor(public apiGateWay: ApiGateway,
        private _storageService: StorageService) { }

    getEvent(startDate, endDate): Observable<any> {
        return this.apiGateWay.get<Recourse>(
            'events/eventList' + '?startDate=' + startDate + '&endDate=' + endDate + '&userId=' + this._storageService.getUserId(), null,
        );
    }

    saveEvent(customerData: Calender): Observable<Calender> {
        return this.apiGateWay.post<Calender>(
            '/events/addEvent',
            JSON.stringify(customerData)
        );
    }

    updateEvent(data: any): Observable<Calender> {
        return this.apiGateWay.put<Calender>(
            '/events/updateEvent',
            JSON.stringify(data)
        );
    }

    deleteEvent(eventId: any): Observable<any> {
        return this.apiGateWay.delete<any>(
            '/events/deleteEvent?eventId=' + eventId
        );
    }
}