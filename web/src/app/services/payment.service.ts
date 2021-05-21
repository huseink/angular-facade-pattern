import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  priceLimit = 40;

  constructor() { }

  setPaymentMethod(payment: any) {
    localStorage.setItem('payment', JSON.stringify(payment));
  }

  getPaymentMethod() {
    return JSON.parse(localStorage.getItem('payment') || '{}');
  }

  checkPaymentMethodAvailability(paymentInfo: any) {
    if (paymentInfo.paymentMethod === 2 || paymentInfo.creditCard === null) {
      return false;
    } else {
      this.checkCreditCardInfo(paymentInfo.creditCard);
    }
    return true;
  }

  checkCreditCardInfo(creditCardNumber: string) {
    return { number: creditCardNumber, status: 'OK' };
  }

  processPayment(totalPrice: number, paymentInfo: any) {
    if (totalPrice < this.priceLimit) {
      return { status: false, message: 'Total price is under our limit' };
    }
    if (this.checkPaymentMethodAvailability(paymentInfo)) {
      return { status: true, message: 'Payment was sucessful!' };
    }
    return { status: false, message: 'Payment failed!' };
  }
}
