import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../models/product';

@Component({
  selector: 'product-item',
  imports: [],  //Note: Do not need to import models.
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input() product!: Product;
  @Input() index?: number;
  // @Input() deleteFromParent?: (index: number) => void; // Note: Bad delegate way.
  @Output() deleteFromParentEvent = new EventEmitter<number>();  //Note: Good listener way. Curious more about difference.

  onBuy(): void {
  }
  onDelete(): void {
    if (this.deleteFromParentEvent != null && this.index != null) {
      this.deleteFromParentEvent.emit(this.index);
    }
  }
}
