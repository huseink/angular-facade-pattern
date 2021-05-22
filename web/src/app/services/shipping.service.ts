import { Injectable } from '@angular/core';
import { ShippingInfo } from '../models/shippingInfo';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  totalCouriers = 10;

  constructor() { }

  checkShipmentAvailability() {
    if (this.totalCouriers > 0) {
      this.totalCouriers = this.totalCouriers - 1;
      return true;
    }
    return false;
  }

  checkShippingInfo(country: string, city: string, address: string) {
    if (country.toLowerCase() === 'turkey' && city && address) {
      return this.checkShipmentAvailability();
    }
    return false;
  }

  processShipping(shippingInfo: ShippingInfo) {
    if (this.checkShippingInfo(shippingInfo.country, shippingInfo.city, shippingInfo.address)) {
      return { status: true, message: `Items are shipped to ${shippingInfo.fullName} / ${shippingInfo.city} - ${shippingInfo.country}` }
    }
    return { status: false, message: `Items could not be shiped` };
  }
}
