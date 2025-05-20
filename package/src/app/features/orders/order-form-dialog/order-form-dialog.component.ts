import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orders } from '../../../models/orders.model';
import { Customers } from '../../../models/customers.model';
import { Vehicle } from '../../../models/vehicles.model';

@Component({
  selector: 'app-order-form-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.scss']
})
export class OrderFormDialogComponent {
  order: Orders;
  customers: Customers[];
  vehicles: Vehicle[];

  constructor(
    public dialogRef: MatDialogRef<OrderFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Orders | null; customers: Customers[]; vehicles: Vehicle[] }
  ) {
    this.customers = this.data.customers;
    this.vehicles = this.data.vehicles;
    this.order = this.data.order ? { ...this.data.order } : { id: 0, supplierId: 0, vehicleId: 0, Cantidad: 0, FechaDeOrden: new Date(), Estado: '', CantidadRecibida: 0, validación: false, createdAt: new Date(), updatedAt: new Date() };
  }

  save(): void {
    this.dialogRef.close(this.order);
  }
}
