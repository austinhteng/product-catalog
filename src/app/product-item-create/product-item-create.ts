import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductItemCreatePreview } from '../product-item-create-preview/product-item-create-preview';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-item-create',
  imports: [FormsModule, ProductItemCreatePreview],
  templateUrl: './product-item-create.html',
  styleUrl: './product-item-create.css',
})
export class ProductItemCreate {
  constructor(private productService: ProductService, private router: Router) {}

  // productService: ProductService = Inject(ProductService);
  // router: Router = Inject(Router);

  idInput: number = 0;
  nameInput: string = '';
  priceInput: number = 0;

  saveNewItem(): void {
    console.log(`Saving new item: ID=${this.idInput}, Name=${this.nameInput}, Price=${this.priceInput}`);
    this.productService.addProduct({
      id: this.idInput,
      name: this.nameInput,
      price: this.priceInput
    });
    this.router.navigate(['/products']);
  }
}
