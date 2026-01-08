import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient)
  tokenSignal: WritableSignal<string | null> = signal(null);
  private readonly apiUrl = '/api/Auth';

  //TODO: Set these to local info
  private loggedIn: boolean = false;
  private adminLoggedIn: boolean = false;

  LogIn(isAdmin: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, isAdmin).pipe(
      tap((response) => {
        this.loggedIn = true;
        this.adminLoggedIn = isAdmin;
        localStorage.setItem('access_token', response.token);
        this.tokenSignal.set(localStorage.getItem('access_token'));
      })
    );
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
