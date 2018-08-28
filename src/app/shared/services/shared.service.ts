import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatePipe } from '@angular/common';
@Injectable()
export class SharedService {
    arrCalendarEvents: any = [];
    // Observable string sources
    private upcomingEventSource = new Subject<any>();
    private branchHeader = new Subject<any>();
    private newBranchAdd = new Subject<any>();
    // Observable string streams
    changeUpcomingEmitted = this.upcomingEventSource.asObservable();
    constructor(private _datePipe: DatePipe) {
    }

    dateFormat(date) {
        var d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    // Service message commands
    upcomingEventChange(data: any) {
        this.upcomingEventSource.next(data);
    }

    setHeaderBranch(message: string) {
        this.branchHeader.next({ text: message });
    }

    clearHeaderBranch() {
        this.branchHeader.next();
    }

    getHeaderBranch(): Observable<any> {
        return this.branchHeader.asObservable();
    }

    setNewAddedBranch(data: any) {
        this.newBranchAdd.next(data);
    }

    getNewAddedBranch(): Observable<any> {
        return this.newBranchAdd.asObservable();
    }

    convertDateToStr(date: Date): string {
        if (date == null || isNaN(new Date(date).getDate())) {
            return '';
        } else {
            return this._datePipe.transform(date, 'dd MMM yyyy');
        }
    }

    convertStrToDate(dateStr: string): Date {
        return new Date(dateStr);
    }

    reverseArray(arInput) {
        var arReverse = [];
        for (var i = arInput.length - 1; i >= 0; i--) {
            arReverse.push(arInput[i]);
        }
        return arReverse;
    }

    isViewOnly()
    {
        
        if(localStorage.userRole=='CLIENT')
        {
            return true;
        }
        else{
            return false;
        }
    }
}