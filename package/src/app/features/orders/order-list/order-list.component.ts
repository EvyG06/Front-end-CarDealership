import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/orders.service';
import { CustomerService } from '../../../services/customer.service';
import { VehicleService } from '../../../services/vehicle.service';
import { Orders } from '../../../models/orders.model';
import { Customers } from '../../../models/customers.model';
import { Vehicle } from '../../../models/vehicles.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormDialogComponent } from '../order-form-dialog/order-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Orders[] = [];
  customers: Customers[] = [];
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['supplierId', 'vehicleId', 'FechaDeOrden', 'Estado', 'acciones'];

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadVehicles();
    this.loadOrders();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => this.customers = customers,
      error: (err) => console.error('Error fetching customers', err)
    });
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: (err) => console.error('Error fetching vehicles', err)
    });
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => {
        this.snackBar.open('Error al cargar órdenes', 'Cerrar', { duration: 3000 });
        console.error('Error fetching orders', err);
      }
    });
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? customer.nombre : 'Desconocido';
  }

  getVehicleName(vehicleId: number): string {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.marca} ${vehicle.modelo}` : 'Desconocido';
  }

  openAddOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderFormDialogComponent, {
      width: '400px',
      data: { order: null, customers: this.customers, vehicles: this.vehicles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.createOrder(result).subscribe({
          next: () => {
            this.loadOrders();
            this.snackBar.open('Orden creada exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Error al crear orden', 'Cerrar', { duration: 3000 });
            console.error('Error creating order', err);
          }
        });
      }
    });
  }

  openEditOrderDialog(order: Orders): void {
    const dialogRef = this.dialog.open(OrderFormDialogComponent, {
      width: '400px',
      data: { order, customers: this.customers, vehicles: this.vehicles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateOrder(order.id!, result).subscribe({
          next: () => {
            this.loadOrders();
            this.snackBar.open('Orden actualizada exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Error al actualizar orden', 'Cerrar', { duration: 3000 });
            console.error('Error updating order', err);
          }
        });
      }
    });
  }

  deleteOrder(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta orden?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          this.loadOrders();
          this.snackBar.open('Orden eliminada exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar orden', 'Cerrar', { duration: 3000 });
          console.error('Error deleting order', err);
        }
      });
    }
  }
}