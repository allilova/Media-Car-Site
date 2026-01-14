import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private apiUrl = '/api/admin'; 

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.isAdmin && user.token) {
        this.isAdminSubject.next(true);
      }
    }
  }

  getToken(): string | null {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).token : null;
  }

  register(credentials: any) {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
            

          localStorage.setItem('user', JSON.stringify(response));
          
          if (response.isAdmin) {
            this.isAdminSubject.next(true);
          }
        }
      })
    );
  }

  logout() {
    this.isAdminSubject.next(false);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
