import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { TitleCasePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ItemIdPipe } from '../pipes/item-id/item-id-pipe';
import { Product } from '../models/product';
import { StoreService } from '../services/store.service';
import { AuthService } from '../services/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'product-item',
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe, ItemIdPipe, CommonModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input() product!: Product;
  @Input() index!: number;
  @Output() deleteFromParentEvent = new EventEmitter<number>();

  shoppingCartService = inject(StoreService); //Note: This logic should possibly be in productlist instead.
  router = inject(Router);
  authService = inject(AuthService);
  toastr = inject(ToastrService);

  isAdmin: boolean = this.authService.isAdmin();

  onBuy(): void {
    this.shoppingCartService.addToCart(this.product.id);
    this.toastr.success(`${this.product.productName} added to cart!`, 'Success');
  }
  onDelete(): void {
    if (this.deleteFromParentEvent != null && this.index != null) {
      this.deleteFromParentEvent.emit(this.index);
    }
    this.shoppingCartService.removeItem(this.product.id); //Note: This logic should possibly be in productlist instead.
  }
  onInfo(): void {
    this.router.navigate(['/product', this.product.id]);
  }
}
