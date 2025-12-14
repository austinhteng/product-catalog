import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;

  setLoggedIn(status: boolean): void {
    this.loggedIn = status;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
