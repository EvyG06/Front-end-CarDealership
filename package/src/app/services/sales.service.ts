import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sale } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = 'http://localhost:3000/sales';

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl, sale).pipe(
      catchError(this.handleError)
    );
  }

  updateSale(id: number, sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.baseUrl}/${id}`, sale).pipe(
      catchError(this.handleError)
    );
  }

  deleteSale(id: number): Observable<void> {
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
