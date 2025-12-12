import { Component, inject, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartItem } from '../cart-item/cart-item';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'cart-view',
  imports: [CommonModule, CartItem],
  templateUrl: './cart-view.html',
  styleUrls: ['./cart-view.css'],
})
export class CartView {
  storeService = inject(StoreService);

  items: [number, number][] = [];
  totalCost = this.storeService.getTotalCost();

  constructor() {
    effect(() => {
      const cart = this.storeService.getCartItems()();  //Note: This could probably be computed signal instead.
      this.items = Array.from(cart.entries());
      console.log('Cart receives update.');
    });
  }
}
