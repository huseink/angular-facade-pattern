import { Injectable } from '@angular/core';
import { PaymentInfo } from '../models/paymentInfo';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  priceLimit = 40;

  constructor() { }

  checkPaymentMethodAvailability(paymentInfo: PaymentInfo) {
    if (paymentInfo.paymentMethod === '2' || paymentInfo.creditCard === null) {
      return false;
    } else {
      this.checkCreditCardInfo(paymentInfo.creditCard);
    }
    return true;
  }

  checkCreditCardInfo(creditCardNumber: string) {
    return { number: creditCardNumber, status: 'OK' };
  }

  processPayment(totalPrice: number, paymentInfo: PaymentInfo) {
    if (totalPrice < this.priceLimit) {
      return { status: false, message: 'Total price is under our limit' };
    }
    if (this.checkPaymentMethodAvailability(paymentInfo)) {
      return { status: true, message: `Payment with ${paymentInfo.paymentMethod === '0' ? 'Credit' : 'Paypal'} Card Number - "${paymentInfo.creditCard}" was sucessful!` };
    }
    return { status: false, message: 'Payment failed!' };
  }
}
