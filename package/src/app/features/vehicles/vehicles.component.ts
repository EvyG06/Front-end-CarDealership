import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule]
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];
  newVehicle = { 
    brand: '', 
    model: '', 
    year: 0, 
    characteristics: '', 
    status: 0, 
    price: 0 
  };
  displayedColumns: string[] = ['brand', 'model', 'year', 'characteristics', 'status', 'price', 'actions'];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Error al cargar vehículos:', err)
    });
  }

  addVehicle() {
    this.vehicleService.createVehicle(this.newVehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.newVehicle = { 
          brand: '', 
          model: '', 
          year: 0, 
          characteristics: '', 
          status: 0, 
          price: 0 
        };
      },
      error: (err) => console.error('Error al agregar vehículo:', err)
    });
  }

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id).subscribe({
      next: () => this.loadVehicles(),
      error: (err) => console.error('Error al eliminar vehículo:', err)
    });
  }
}