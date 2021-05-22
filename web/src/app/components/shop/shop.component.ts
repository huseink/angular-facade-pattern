import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { User } from 'src/app/models/user';
import { ShopFacadeService } from 'src/app/services/shop-facade.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  activeUser: User;
  items = [
    new Item('Bag', 50, 20),
    new Item('Jacket', 150, 10),
    new Item('Boots', 90, 20),
    new Item('Perfume', 60, 30),
    new Item('T-Shirt', 40, 30),
    new Item('Watch', 150, 10),
  ]

  basket: Item[] = []
  constructor(private shopFacadeService: ShopFacadeService, private router: Router,) { }

  ngOnInit(): void {
    this.activeUser = this.shopFacadeService.getLoggedInUser();
  }

  addToBasket(item: Item) {
    this.basket.push(item);
  }

  removeFromBasket(item: Item) {
    this.basket = this.basket.filter((i) => i.name !== item.name);
  }

  getTotalBasketPrice() {
    return this.shopFacadeService.getTotalBasketPrice(this.basket);
  }

  logOut() {
    this.shopFacadeService.logUserOut();
    this.router.navigate(['/sign-in']);
  }

  checkOut() {
    this.shopFacadeService.setBasketItems(this.basket);
    this.router.navigate(['/checkout']);
  }
}
