import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

authenticate(email: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/login`;
    const body = { email, password };
    console.log('Sending login request to:', endpoint, 'with data:', body);
    return this.http.post(endpoint, body).pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        if (response.success) {
          this.token = response.token || response.message;
          localStorage.setItem('token', this.token || '');
          console.log('Login successful, token stored:', this.token);
        }
      }),
      catchError(this.handleError)
    );
  }
register(name: string, email: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/register`;
    const body = { name, email, password };
    console.log('Sending registration request to:', endpoint, 'with data:', body);
    return this.http.post(endpoint, body).pipe(
      tap((response: any) => {
        console.log('Registration response:', response);
        if (response.success) {
          this.token = response.token || response.message;
          localStorage.setItem('token', this.token || '');
          console.log('User registered successfully, token stored:', this.token);
        }
      }),
      catchError(this.handleError)
    );
  }


    private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
  


  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return this.token;
  }
}