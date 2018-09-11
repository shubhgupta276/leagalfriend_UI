import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification-service';
import { EmailModel } from './email.model';
import { StorageService } from '../../../../shared/services/storage.service';
declare let $;
@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css'],
  providers: [NotificationService]
})
export class CreateNotificationComponent implements OnInit {
  arNotificationType: any[] = [];
  arSelectedEmails: any[] = [];
  arFilterEmail: EmailModel[] = [];
  selectedNotificationType: any;
  emails: string;
  subject: string;
  description: string;
  searchEmail: string;
  constructor(private _notificationService: NotificationService, private _storageService: StorageService) { }

  ngOnInit() {
    this.setNotificationType();
  }

  setNotificationType() {
    this._notificationService.getNotificationType().subscribe(
      (result) => {
        if (result && result.length > 0) {
          this.arNotificationType = result;
          this.selectedNotificationType = this.arNotificationType[0];
        }
      },
      err => console.log(err)
    );
  }

  notificationTypeChagne() {
    if (!this.isOtherNotificationSelected()) {
      this.arSelectedEmails = [];
      this.resetEmailSearch();
    }
  }

  resetEmailSearch() {
    this.searchEmail = '';
    this.arFilterEmail = [];
  }

  selectEmail(email: any) {
    if (this.arSelectedEmails.findIndex(x => x.id === email.id) < 0) {
      this.arSelectedEmails.push(email);
    }
    this.resetEmailSearch();
  }

  removeEmail(email: any) {
    this.arSelectedEmails.splice(this.arSelectedEmails.findIndex(x => x.id === email.id), 1);
    this.searchEmail = '';
    this.arFilterEmail = [];
  }

  filterEmail() {
    this.arFilterEmail = [];
    if (this.searchEmail) {
      this._notificationService.getEmails(this.searchEmail).subscribe(
        (result) => {
          if (result && result.length > 0) {
            this.arFilterEmail = result;
          }
        },
        err => console.log(err)
      );
    }
  }

  isOtherNotificationSelected() {
    if (this.selectedNotificationType && this.selectedNotificationType.id === 3) {
      return true;
    }
    return false;
  }

  isValid(): boolean {
    if (this.selectedNotificationType && this.subject && this.description) {
      if (this.isOtherNotificationSelected() && this.arSelectedEmails && this.arSelectedEmails.length <= 0) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  saveNotification() {
    if (this.isValid()) {
      const arSendTo = [];

      for (const item of this.arSelectedEmails) {
        arSendTo.push(item.id);
      }
      const reqData = {
        description: this.description,
        notificationType: this.selectedNotificationType,
        sendTo: arSendTo,
        subject: this.subject,
        userId: this._storageService.getUserId()
      };
      this._notificationService.saveNotification(reqData).subscribe(
        (result) => {
          result = result.body;
          debugger
          if (result.httpCode === 200) {
            this.clearForm();
            $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
          } else {
            $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
          }
        },
        err => console.log(err));
    }
  }

  clearForm() {
    this.selectedNotificationType = this.arNotificationType[0];
    this.subject = '';
    this.description = '';
    this.arSelectedEmails = [];
    this.searchEmail = '';
  }
}
