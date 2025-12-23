import { Routes } from '@angular/router';
import { ProductItemCreate } from './product-item-create/product-item-create';
import { PasswordGame } from './password-game/password-game';
import { StoreView } from './store-view/store-view';
import { LoginView } from './login-view/login-view';
import { authGuard } from './guards/auth-guard';
import { ProductInfo } from './product-info/product-info';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: StoreView, title: 'Product Catalog', canActivate: [authGuard] },
  { path: 'product/:id', component: ProductInfo, title: 'Product Info' },
  { path: 'create-item', component: ProductItemCreate, title: 'Create Item', canActivate: [authGuard] },
  { path: 'password-game', component: PasswordGame, title: 'Password Game', canActivate: [authGuard] },
  { path: 'login', component: LoginView, title: 'Login' },
  // Optional: A 404 route
  { path: '**', redirectTo: '/login' }
];