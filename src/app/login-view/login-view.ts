import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  imports: [],
  templateUrl: './login-view.html',
  styleUrl: './login-view.css',
})
export class LoginView {
  authService = inject(AuthService);
  router = inject(Router);

  login(): void {
    this.authService.LogIn(false).subscribe((response) => {
      console.log("Login response:", response);
      this.router.navigate(['/products']);
    });
  }

  adminLogin(): void {

    this.authService.LogIn(true).subscribe((response) => {
      console.log("Login response:", response);
      this.router.navigate(['/products']);
    });
  }
}
