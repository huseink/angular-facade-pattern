export class NotifyInfo {
    method: string;
    emailAddress: string;
    phoneNumber: string;
    constructor(method: string, emailAddress: string, phoneNumber: string) {
        this.method = method;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
    }
}
