import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sales.service';
import { CustomerService } from '../../../services/customer.service';
import { VehicleService } from '../../../services/vehicle.service';
import { Sale } from '../../../models/sales.model';
import { Customers } from '../../../models/customers.model';
import { Vehicle } from '../../../models/vehicles.model';
import { MatDialog } from '@angular/material/dialog';
import { SaleFormDialogComponent } from '../sale-form-dialog/sale-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {
  sales: Sale[] = [];
  customers: Customers[] = [];
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['customerId', 'vehicleId', 'FechaDeVenta', 'Precio', 'acciones'];

  constructor(
    private saleService: SaleService,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadVehicles();
    this.loadSales();
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

  loadSales(): void {
    this.saleService.getSales().subscribe({
      next: (sales) => this.sales = sales,
      error: (err) => {
        this.snackBar.open('Error al cargar ventas', 'Cerrar', { duration: 3000 });
        console.error('Error fetching sales', err);
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

  openAddSaleDialog(): void {
    const dialogRef = this.dialog.open(SaleFormDialogComponent, {
      width: '400px',
      data: { sale: null, customers: this.customers, vehicles: this.vehicles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.createSale(result).subscribe({
          next: () => {
            this.loadSales();
            this.snackBar.open('Venta creada exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Error al crear venta', 'Cerrar', { duration: 3000 });
            console.error('Error creating sale', err);
          }
        });
      }
    });
  }

  openEditSaleDialog(sale: Sale): void {
    const dialogRef = this.dialog.open(SaleFormDialogComponent, {
      width: '400px',
      data: { sale, customers: this.customers, vehicles: this.vehicles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleService.updateSale(sale.id!, result).subscribe({
          next: () => {
            this.loadSales();
            this.snackBar.open('Venta actualizada exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Error al actualizar venta', 'Cerrar', { duration: 3000 });
            console.error('Error updating sale', err);
          }
        });
      }
    });
  }

  deleteSale(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta venta?')) {
      this.saleService.deleteSale(id).subscribe({
        next: () => {
          this.loadSales();
          this.snackBar.open('Venta eliminada exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar venta', 'Cerrar', { duration: 3000 });
          console.error('Error deleting sale', err);
        }
      });
    }
  }
}