import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Orders } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  createOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(this.baseUrl, order).pipe(
      catchError(this.handleError)
    );
  }

  updateOrder(id: number, order: Orders): Observable<Orders> {
    return this.http.put<Orders>(`${this.baseUrl}/${id}`, order).pipe(
      catchError(this.handleError)
    );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}