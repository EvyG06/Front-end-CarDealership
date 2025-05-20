import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());

  constructor(private http: HttpClient) {}

  // Login
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  // Registro
  register(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
  }

  // Obtener usuario actual
  get currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // Obtener token
  getToken(): string | null {
    const user = this.getUserFromStorage();
    return user?.token || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}