import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { BasketService } from 'src/app/services/basket.service';
import { ShopFacadeService } from 'src/app/services/shop-facade.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  basket:Item[] = [];

  paymentMethodForm = new FormGroup({
    paymentMethod: new FormControl(0, Validators.required),
    creditCard: new FormControl(null),
  });

  shippingForm = new FormGroup({
    fullName: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null),
  });

  notifyForm = new FormGroup({
    method: new FormControl(null),
    emailAddress: new FormControl(null),
    phoneNumber: new FormControl(null),
  });

  constructor(private router:Router,
    private shopFacadeService: ShopFacadeService) { }

  ngOnInit(): void {
    this.shopFacadeService.getBasketItems().subscribe((basketData) => {
      this.basket = basketData;
    });
  }

  getTotalBasketPrice() {
    return this.shopFacadeService.getTotalBasketPrice(this.basket);
  }

  submit() {
    const paymentMethodValue = this.paymentMethodForm.value;
    const shippingFormValue = this.shippingForm.value;
    const notifyFormValue = this.notifyForm.value;
    this.shopFacadeService.buyItems(this.basket, paymentMethodValue, shippingFormValue, notifyFormValue);
  }

  cancel() {
    this.shopFacadeService.setBasketItems([]);
    this.router.navigate(['/shop'])
  }
}
