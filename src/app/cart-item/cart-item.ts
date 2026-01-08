import { Component, Input, inject } from '@angular/core';

import { ProductService } from '../services/product.service';
import { StoreService } from '../services/store.service';
import { ToastrService } from 'ngx-toastr';

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
  toastr = inject(ToastrService);

  productName: string = 'Unknown Product';

  removeItem(): void {
    this.storeService.removeSingleItem(this.productID);
    this.toastr.info(`${this.productName} removed from cart.`, 'Item Removed');
  }

  ngOnInit(): void {
    this.productName = this.productService.getProductById(this.productID)?.productName || 'Unknown Product';
  }
}
