import { Component, Input, inject } from '@angular/core';

import { ProductService } from '../services/product.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  @Input() productID!: number;
  @Input() productCount!: number;

  productService = inject(ProductService);
  storeService = inject(StoreService);
  productName: string = 'Unknown Product';

  removeItem(): void {
    this.storeService.removeSingleItem(this.productID);
  }

  ngOnInit(): void {
    this.productName = this.productService.getProductById(this.productID)?.name || 'Unknown Product';
  }
}
