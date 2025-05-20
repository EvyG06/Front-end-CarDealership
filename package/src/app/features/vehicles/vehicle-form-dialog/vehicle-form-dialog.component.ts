import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from '../../../models/vehicles.model';

@Component({
  selector: 'app-vehicle-form-dialog',
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrls: ['./vehicle-form-dialog.component.css']
})
export class VehicleFormDialogComponent {
  vehicle: Vehicle;

  constructor(
    public dialogRef: MatDialogRef<VehicleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle | null }
  ) {
    this.vehicle = this.data.vehicle ? { ...this.data.vehicle } : { id: 0, marca: '', modelo: '', anio: 0, caracteristicas: '', estado: '' };
  }

  save(): void {
    this.dialogRef.close(this.vehicle);
  }
}
