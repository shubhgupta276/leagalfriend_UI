import { Injectable } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { EmailModel } from './create-notification/email.model';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable()
export class NotificationService {
    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getUserNotifications(): Observable<any> {
        return this.apiGateWay.get<any>(
            'notification?userId=' + this._storageService.getUserId()
        );
    }

    getNotificationType(): Observable<any> {
        return this.apiGateWay.get<any>(
            'notification/type'
        );
    }

    getEmails(userName: string): Observable<EmailModel[]> {
        return this.apiGateWay.get<EmailModel[]>(
            'notification/email?username=' + userName
        );
    }

    saveNotification(data: any): Observable<any> {
        return this.apiGateWay.post<any>(
            'notification', data
        );
    }
}
