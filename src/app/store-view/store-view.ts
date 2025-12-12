import { Component } from '@angular/core';

import { ProductList } from '../product-list/product-list';
import { CartView } from '../cart-view/cart-view';

@Component({
  selector: 'store-view',
  imports: [ProductList, CartView],
  templateUrl: './store-view.html',
  styleUrl: './store-view.css',
})
export class StoreView {

}
