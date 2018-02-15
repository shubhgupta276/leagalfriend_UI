import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SharedService {
    arrTodayCalendarEvents: UpcomingEvents[];
    arrCalendarEvents: any = [];
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    constructor() {
        this.arrTodayCalendarEvents = [
            { startdate: this.dateFormat(new Date()),endDate: this.dateFormat(new Date()), cssClass: '#00c0ef', totalUpcomingEvents: 0 },
            { startdate: this.dateFormat(new Date()),endDate: this.dateFormat(new Date()), cssClass: '#0073b7', totalUpcomingEvents: 0 },
            { startdate: new Date(2018, 1, 1),endDate: this.dateFormat(new Date(2018, 1, 14)), cssClass: '#dd4b39', totalUpcomingEvents: 0 },
            { startdate: this.dateFormat(new Date(2018, 1, 1)),endDate: this.dateFormat(new Date(2018, 1, 1)), cssClass: '#3c8dbc', totalUpcomingEvents: 0 }
        ];
        this.GetEventsGroup();
    }
    GetEventsGroup(): any {
        var $this = this;
        this.arrCalendarEvents=[];
        var todayDate = new Date(new Date().setHours(0, 0, 0, 0));
        this.arrTodayCalendarEvents = this.arrTodayCalendarEvents.filter(function (arr) {
            return (arr.startdate<= todayDate && arr.endDate >=todayDate);
        });

        var source = Observable.from(this.arrTodayCalendarEvents).groupBy(x => x.cssClass)
            .mergeMap(list$ => {
                const count$ = list$.count();
                return count$.map(count => ({ cssClass: list$.key, totalUpcomingEvents: count }));
            });
        var subscription = source.subscribe(
            function (obs) {
                $this.arrCalendarEvents.push({ cssClass: obs.cssClass, totalEventCount: obs.totalUpcomingEvents })
            })
        this.emitChange(this.arrCalendarEvents);
    }
    dateFormat(date) {
        var d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}
export interface UpcomingEvents {

    startdate: Date;
    endDate:Date;
    cssClass: string;
    totalUpcomingEvents: number;

}