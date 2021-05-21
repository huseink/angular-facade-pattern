import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  totalCouriers = 10;

  constructor() { }

  checkShipmentAvailability() {
    if(this.totalCouriers > 0) {
      this.totalCouriers = this.totalCouriers - 1;
      return true;
    } 
    return false;
  }

  checkShippingInfo(country:string, address: string) {
    if(country.toLowerCase() === 'turkey' && address) {
      return this.checkShipmentAvailability();
    } 
    return false;
  }
 
  processShipping(shippingInfo: any) {
    if(this.checkShippingInfo(shippingInfo.country, shippingInfo.address)) {
      return { status: true, message: `Items are shiped to ${shippingInfo.country} - ${shippingInfo.fullName}` }
    }
    return { status: false, message: `Items could not be shiped`};
  }
}
