import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../admin/notification/notification-service';
declare var $;
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    providers: [NotificationService]
})
export class NotificationComponent implements OnInit {
    arNotifications: any[];
    constructor(private _notificationService: NotificationService) {

    }
    ngOnInit() {
        this.getAllNotifications();
    }
    getAllNotifications() {
        this.arNotifications = [];
        this._notificationService.getUserNotifications().subscribe(
            (result) => {
                if (result && result.length > 0) {
                    this.arNotifications = result;
                }
            },
            err => console.log(err));
    }
}
