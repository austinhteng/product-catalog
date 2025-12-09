import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(private productService: ProductService) {}  //Note: variables passed to constructor have weird scope.

  //Note: Do I link the 'model' and the 'view' here? I expect a "viewmodel" layer instead.
  //Note: I suppose the 'view' is the html and this .ts is the viewmodel.
  items: readonly Product[] = [];
  
  ngOnInit() : void {
    this.items = this.productService.getProducts();
  }

  deleteItemAtIndex(index: number): void {
    this.productService.deleteProductByIndex(index);  //Note: Would need some sort of await.
    this.items = this.productService.getProducts();
  }
}
