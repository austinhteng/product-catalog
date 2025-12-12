import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import { ItemIdPipe } from '../pipes/item-id/item-id-pipe';

import { Product } from '../models/product';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe, ItemIdPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input() product!: Product;
  @Input() index?: number;
  @Output() deleteFromParentEvent = new EventEmitter<number>();

  shoppingCartService = inject(StoreService); //Note: This logic should possibly be in productlist instead.

  onBuy(): void {
    this.shoppingCartService.addToCart(this.product.id);
  }
  onDelete(): void {
    if (this.deleteFromParentEvent != null && this.index != null) {
      this.deleteFromParentEvent.emit(this.index);
    }
    this.shoppingCartService.removeItem(this.product.id); //Note: This logic should possibly be in productlist instead.
  }
}
