import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private adminLoggedIn: boolean = false;

  setLoggedIn(status: boolean): void {
    this.loggedIn = status;
  }

  setAdminLoggedIn(status: boolean): void {
    this.adminLoggedIn = status;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.adminLoggedIn;
  }
}
