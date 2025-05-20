import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customers } from '../../../models/customers.model';

@Component({
  selector: 'app-customer-form-dialog',
  templateUrl: './customer-form-dialog.component.html',
  styleUrls: ['./customer-form-dialog.component.scss']
})
export class CustomerFormDialogComponent {
  customer: Customers;

  constructor(
    public dialogRef: MatDialogRef<CustomerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customers | null }
  ) {
    this.customer = this.data.customer ? { ...this.data.customer } : { id: 0, nombre: '', correo: '', dirección: '', teléfono: '', Preferencias: '', Seguimiento: '', ÚltimoSeguimiento: new Date() };
  }

  save(): void {
    this.dialogRef.close(this.customer);
  }
}
