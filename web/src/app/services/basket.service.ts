import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor() { }

  public setBasketItems(basket: Item[]) {
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  public getBasketItems() {
    return JSON.parse(localStorage.getItem('basket') || '{}');
  }
}
