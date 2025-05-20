import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customers } from '../models/customers.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  createCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(this.baseUrl, customer).pipe(
      catchError(this.handleError)
    );
  }

  updateCustomer(id: number, customer: Customers): Observable<Customers> {
    return this.http.put<Customers>(`${this.baseUrl}/${id}`, customer).pipe(
      catchError(this.handleError)
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
  
      errorMessage = `Error: ${error.error.message}`;
    } else {

      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
