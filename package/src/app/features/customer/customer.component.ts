import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customer.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule]
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  newCustomer = { 
    nombre: '', 
    correo: '', 
    direccion: '', 
    telefono: '', 
    Preferencias: '', 
    Seguimiento: '', 
    UltimoSeguimiento: '2025-05-20'
  };
  displayedColumns: string[] = ['nombre', 'correo', 'direccion', 'telefono', 'Preferencias', 'Seguimiento', 'UltimoSeguimiento', 'actions'];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

  addCustomer() {
    const customerToAdd = {
      ...this.newCustomer,
      UltimoSeguimiento: new Date(this.newCustomer.UltimoSeguimiento)
    };
    this.customerService.createCustomer(customerToAdd).subscribe({
      next: () => {
        this.loadCustomers();
        this.newCustomer = { 
          nombre: '', 
          correo: '', 
          direccion: '', 
          telefono: '', 
          Preferencias: '', 
          Seguimiento: '', 
          UltimoSeguimiento: '2025-05-20'
        };
      },
      error: (err: any) => console.error('Error al agregar cliente:', err)
    });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => this.loadCustomers(),
      error: (err: any) => console.error('Error al eliminar cliente:', err)
    });
  }
}