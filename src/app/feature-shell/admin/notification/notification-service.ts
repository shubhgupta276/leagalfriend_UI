import { Injectable } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';
import { ApiGateway } from '../../../shared/services/api-gateway';
import { EmailModel } from './create-notification/email.model';

@Injectable()
export class NotificationService {
    constructor(private apiGateWay: ApiGateway) {

    }

    getNotificationType(): Observable<any> {
        return this.apiGateWay.get<any>(
            'notification/type', null
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
