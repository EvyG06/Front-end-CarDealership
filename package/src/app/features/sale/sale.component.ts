
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { SalesService } from '../../services/sales.service';
import { OrdersService } from '../../services/orders.service';
import { CustomerService } from '../../services/customer.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class SalesComponent implements OnInit {
  sales: any[] = [];
  orders: any[] = [];
  customers: any[] = [];
  newSale = { 
    orderId: 0, 
    amount: 0, 
    date: '2025-05-20', 
    paymentMethod: '', 
    saleNotes: '' 
  };
  displayedColumns: string[] = ['orderId', 'customerName', 'amount', 'date', 'paymentMethod', 'saleNotes', 'actions'];

  constructor(
    private salesService: SalesService,
    private ordersService: OrdersService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      sales: this.salesService.getSales(),
      orders: this.ordersService.getOrders(),
      customers: this.customerService.getCustomers()
    }).subscribe({
      next: ({ sales, orders, customers }) => {
        this.orders = orders;
        this.customers = customers;
        this.sales = sales.map(sale => {
          const order = orders.find(o => o.id === sale.orderId);
          const customer = order ? customers.find(c => c.id === order.customerId) : null;
          return {
            ...sale,
            customerName: customer ? customer.nombre : 'Desconocido'
          };
        });
      },
      error: (err) => console.error('Error al cargar datos:', err)
    });
  }

  addSale() {
    const saleToAdd = {
      ...this.newSale,
      date: new Date(this.newSale.date)
    };
    this.salesService.createSale(saleToAdd).subscribe({
      next: () => {
        this.loadData();
        this.newSale = { 
          orderId: 0, 
          amount: 0, 
          date: '2025-05-20', 
          paymentMethod: '', 
          saleNotes: '' 
        };
      },
      error: (err) => console.error('Error al agregar venta:', err)
    });
  }

  deleteSale(id: number) {
    this.salesService.deleteSale(id).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error('Error al eliminar venta:', err)
    });
  }
}
