import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductItemCreate } from './product-item-create/product-item-create';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductList, title: 'Product Catalog' },
  // Route with a parameter for the product ID
//   { path: 'products/:id', component: ProductDetailComponent, title: 'Product Details' },
  { path: 'create-item', component: ProductItemCreate, title: 'Create Item' },
  // Optional: A 404 route
  { path: '**', redirectTo: '/products' }
];