import { Component, Input } from '@angular/core';

import { Product } from '../models/product';

@Component({
  selector: 'product-item-create-preview',
  imports: [],
  templateUrl: './product-item-create-preview.html',
  styleUrl: './product-item-create-preview.css',
})
export class ProductItemCreatePreview {
    @Input() product!: Product;
}
