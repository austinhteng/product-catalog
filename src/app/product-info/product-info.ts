import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'product-info',
  imports: [CurrencyPipe],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
})
export class ProductInfo {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);

  productId: number = 0;
  product: Product = {
  id: 0,
  productName: '',
  price: 0.00,
  description: '',
  categoryId: 0
};

  ngOnInit() {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(this.productId)!;
    console.log( `Loading item: ${this.product.productName}`);
    
  }
}
