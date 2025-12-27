import { CommonModule } from '@angular/common';
import { Component, Inject, signal, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductItem } from '../product-item/product-item';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'product-list',
  imports: [ProductItem, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  constructor(private productService: ProductService, private router: Router) {}  //Note: variables passed to constructor have weird scope.

  items = signal<Product[]>([]);

  ngOnChanges() : void {}

  ngOnInit() : void {
    this.refreshList();
  }

  deleteItemAtIndex(index: number): void {
    this.productService.deleteProductByIndex(index).subscribe(() => {
      //Refresh list after deletion.
      next: this.refreshList();
    });
    
  }

  routeToCreateItem(): void {
    this.router.navigate(['/create-item']);
  }

  refreshList(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.items.set(products);
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }
}
