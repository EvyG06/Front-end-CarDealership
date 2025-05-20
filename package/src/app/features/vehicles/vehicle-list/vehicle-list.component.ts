import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicles.model';
import { MatDialog } from '@angular/material/dialog';
import { VehicleFormDialogComponent } from '../vehicle-form-dialog/vehicle-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['marca', 'modelo', 'año', 'acciones'];

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: (err) => {
        this.snackBar.open('Error al cargar vehículos', 'Cerrar', { duration: 3000 });
        console.error('Error fetching vehicles', err);
      }
    });
  }

  openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '400px',
      data: { vehicle: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.createVehicle(result).subscribe({
          next: () => {
            this.loadVehicles();
            this.snackBar.open('Vehículo creado exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Error al crear vehículo', 'Cerrar', { duration: 3000 });
            console.error('Error creating vehicle', err);
          }
        });
      }
    });
  }

  openEditVehicleDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '400px',
      data: { vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.updateVehicle(vehicle.id!, result).subscribe({
          next: () => {
            this.loadVehicles();
            this.snackBar.open('Vehículo actualizado exitosamente', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Error al actualizar vehículo', 'Cerrar', { duration: 3000 });
            console.error('Error updating vehicle', err);
          }
        });
      }
    });
  }

  deleteVehicle(id: number): void {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => {
          this.loadVehicles();
          this.snackBar.open('Vehículo eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar vehículo', 'Cerrar', { duration: 3000 });
          console.error('Error deleting vehicle', err);
        }
      });
    }
  }
}