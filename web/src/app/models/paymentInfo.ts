export class PaymentInfo {
    paymentMethod: string;
    creditCard: string;
    constructor(paymentMethod: string, creditCard: string) {
        this.paymentMethod = paymentMethod;
        this.creditCard = creditCard;
    }
}
