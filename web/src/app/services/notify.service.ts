import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  notificationInfo: any = null;
  constructor() { }

  setNotificationInfo(notificationInfo: any) {
    this.notificationInfo = notificationInfo;
  }

  processNotifications(notificationInfo: any) {
    this.setNotificationInfo(notificationInfo);
    if (this.notificationInfo.emailAddress !== null) {
      return this.sendEmail(this.notificationInfo.emailAddress);
    } else if (this.notificationInfo.phoneNumber !== null) {
      return this.sendSMS(this.notificationInfo.phoneNumber);
    }
    return { status: false, message: `Notifications are not properly set!` };
  }

  sendEmail(emailAddress: string) {
    return { status: true, message: `Email sent to ${emailAddress} sucessfully` };
  }

  sendSMS(phoneNumber: string) {
    return { status: true, message: `SMS sent to ${phoneNumber} sucessfully` };
  }
}
