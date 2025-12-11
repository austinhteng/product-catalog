import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import { ItemIdPipe } from '../pipes/item-id/item-id-pipe';

import { Product } from '../models/product';

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

  onBuy(): void {
  }
  onDelete(): void {
    if (this.deleteFromParentEvent != null && this.index != null) {
      this.deleteFromParentEvent.emit(this.index);
    }
  }
}
