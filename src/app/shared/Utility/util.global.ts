import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class UtilGlobals {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}

// import { Injectable } from '@angular/core';
// import { noUndefined } from '@angular/compiler/src/util';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';

// @Injectable()
// export class UtilGlobals {
//     arrTodayCalendarEvents: UpcomingEvents[];
//     arrCalendarEvents: any = [];
//     totalUpcoming:number=5;
//     private emitChangeSource = new Subject<any>();
//     changeEmitted$ = this.emitChangeSource.asObservable();
//     constructor() {
//         this.arrTodayCalendarEvents = [
//             { date: this.dateFormat(new Date(2018, 1, 13)), cssClass: 'bg-red', totalUpcomingEvents: 0 },
//             { date: this.dateFormat(new Date(2018, 1, 13)), cssClass: 'bg-red', totalUpcomingEvents: 0 },
//             { date: new Date(2018, 1, 1), cssClass: 'bg-red', totalUpcomingEvents: 0 },
//             { date: this.dateFormat(new Date(2018, 1, 13)), cssClass: 'bg-blue', totalUpcomingEvents: 0 }
//         ];
//         this.GetEventsGroup();
//     }
    
//     // Service message commands
//     emitChange(change: any) {   
//         alert(change)   
//         this.emitChangeSource.next(change);
//     }
//     GetEventsGroup(): any {
//         //alert(this.totalUpcoming)
//         var $this = this;
//         var todayDate = new Date(new Date().setHours(0, 0, 0, 0));
//         this.arrTodayCalendarEvents = this.arrTodayCalendarEvents.filter(function (arr) {
//             return arr.date.toString() == todayDate.toString();
//         });

//         var source = Observable.from(this.arrTodayCalendarEvents).groupBy(x => x.cssClass)
//             .mergeMap(list$ => {
//                 const count$ = list$.count();
//                 return count$.map(count => ({ cssClass: list$.key, totalUpcomingEvents: count }));
//             });
//         var subscription = source.subscribe(
//             function (obs) {
//                 $this.arrCalendarEvents.push({ cssClass: obs.cssClass, totalEventCount: obs.totalUpcomingEvents })
//             })
//         console.log($this.arrCalendarEvents);
//     }
//     dateFormat(date) {
//         var d = new Date(date);
//         d.setHours(0, 0, 0, 0);
//         return d;
//     }

// }
// export interface UpcomingEvents {

//     date: Date;
//     cssClass: string;
//     totalUpcomingEvents: number;

// }