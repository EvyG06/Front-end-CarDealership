import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { OrdersService } from '../../services/orders.service';
import { CustomerService } from '../../services/customer.service';
import { VehicleService } from '../../services/vehicle.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSelectModule]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  customers: any[] = [];
  vehicles: any[] = [];
  newOrder = { 
    customerId: 0, 
    vehicleId: 0, 
    date: '2025-05-20', 
    orderStatus: '', 
    orderNotes: '' 
  };
  displayedColumns: string[] = ['customerName', 'vehicleModel', 'date', 'orderStatus', 'orderNotes', 'actions'];

  constructor(
    private ordersService: OrdersService,
    private customerService: CustomerService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      orders: this.ordersService.getOrders(),
      customers: this.customerService.getCustomers(),
      vehicles: this.vehicleService.getVehicles()
    }).subscribe({
      next: ({ orders, customers, vehicles }) => {
        this.customers = customers;
        this.vehicles = vehicles;
        this.orders = orders.map(order => ({
          ...order,
          customerName: customers.find(c => c.id === order.customerId)?.nombre || 'Desconocido',
          vehicleModel: vehicles.find(v => v.id === order.vehicleId)?.model || 'Desconocido'
        }));
      },
      error: (err) => console.error('Error al cargar datos:', err)
    });
  }

  addOrder() {
    const orderToAdd = {
      ...this.newOrder,
      date: new Date(this.newOrder.date)
    };
    this.ordersService.createOrder(orderToAdd).subscribe({
      next: () => {
        this.loadData();
        this.newOrder = { 
          customerId: 0, 
          vehicleId: 0, 
          date: '2025-05-20', 
          orderStatus: '', 
          orderNotes: '' 
        };
      },
      error: (err) => console.error('Error al agregar pedido:', err)
    });
  }

  deleteOrder(id: number) {
    this.ordersService.deleteOrder(id).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error('Error al eliminar pedido:', err)
    });
  }
}