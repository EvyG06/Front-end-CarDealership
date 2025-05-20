import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../../models/sales.model';
import { Customers } from '../../../models/customers.model';
import { Vehicle } from '../../../models/vehicles.model';

@Component({
  selector: 'app-sale-form-dialog',
  templateUrl: './sale-form-dialog.component.html',
  styleUrls: ['./sale-form-dialog.component.scss']
})
export class SaleFormDialogComponent {
  sale: Sale;
  customers: Customers[];
  vehicles: Vehicle[];

  constructor(
    public dialogRef: MatDialogRef<SaleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sale: Sale | null; customers: Customers[]; vehicles: Vehicle[] }
  ) {
    this.customers = this.data.customers;
    this.vehicles = this.data.vehicles;
    this.sale = this.data.sale ? { ...this.data.sale } : { id: 0, Customerid: 0, Vehicleid: 0, FechaDeVenta: new Date(), Precio: 0, MetodoDePago: '' };
  }

  save(): void {
    this.dialogRef.close(this.sale);
  }
}