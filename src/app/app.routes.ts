import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductItemCreate } from './product-item-create/product-item-create';
import { PasswordGame } from './password-game/password-game';
import { StoreView } from './store-view/store-view';
import { LoginView } from './login-view/login-view';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: StoreView, title: 'Product Catalog', canActivate: [authGuard] },
  // Route with a parameter for the product ID
//   { path: 'products/:id', component: ProductDetailComponent, title: 'Product Details' },
  { path: 'create-item', component: ProductItemCreate, title: 'Create Item', canActivate: [authGuard] },
  { path: 'password-game', component: PasswordGame, title: 'Password Game', canActivate: [authGuard] },
  { path: 'login', component: LoginView, title: 'Login' },
  // Optional: A 404 route
  { path: '**', redirectTo: '/login' }
];