import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { BasketService } from './basket.service';
import { NotifyService } from './notify.service';
import { PaymentService } from './payment.service';
import { ShippingService } from './shipping.service';
import { UserService } from './user.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ShopFacadeService {
  constructor(
    private userService: UserService,
    private basketService: BasketService,
    private paymentService: PaymentService,
    private shippingService: ShippingService,
    private notifyService: NotifyService,
  ) { }

  buyItems(basket: Item[], paymentInfo: any, shippingInfo: any, notificationInfo: any) {
    const totalPrice = this.getTotalBasketPrice(basket);
    const paymentResult = this.paymentService.processPayment(totalPrice, paymentInfo);
    const shippingResult = this.shippingService.processShipping(shippingInfo);
    const notificationResult = this.notifyService.processNotifications(notificationInfo);
    this.showResults(paymentResult, shippingResult, notificationResult);
  }

  showResults(paymentResult: { status: any; message: any; }, shippingResult: { status: any; message: any; }, notificationResult: { status: any; message: any; }) {
    if (paymentResult.status === true && shippingResult.status === true && notificationResult.status === true) {
      const loggedInUser = this.userService.getLoggedInUser();
      const swalText = `
        <div style="text-align:left">
          <p>
            <span style="font-weight:bold">Payment Result</span>: 
              <br/>
              ${paymentResult.message}
          </p>
          <p>
            <span style="font-weight:bold">Shipping Result</span>: 
              <br/>
              ${shippingResult.message}
          </p>
          <p>
            <span style="font-weight:bold">Notification Result</span>: 
              <br/>
              ${notificationResult.message}
          </p>
        </div>
      `
      Swal.fire({
        title: `${loggedInUser.username}'s Checkout Info`,
        html: swalText,
        icon: 'success',
      })
    } else {
      Swal.fire('Checkout Error', 'There was an error processing your checkout info', 'error');
    }
  }

  getTotalBasketPrice(basket: Item[]) {
    return basket.reduce((a, b) => +a + +b.price, 0)
  }

  getBasketItems() {
    return this.basketService.getBasketItems();
  }

  getLoggedInUser() {
    return this.userService.getLoggedInUser();
  }

  logUserOut() {
    this.userService.logOut();
  }

  setBasketItems(basket: Item[]) {
    this.basketService.setBasketItems(basket);
  }

}
