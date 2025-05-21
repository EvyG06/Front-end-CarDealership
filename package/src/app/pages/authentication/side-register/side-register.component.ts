import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-register',
  templateUrl: './side-register.component.html',
  styleUrls: ['./side-register.component.scss'],
  standalone: true,
  imports: [
    RouterModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})

export class SideRegisterComponent {
  user = { name: '', email: '', password: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

register() {
    // Validar los campos
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.errorMessage = 'Todos los campos son obligatorios: nombre, email y contraseña.';
      return;
    }

    // Validar formato del email (básico)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido.';
      return;
    }

    // Validar longitud mínima de la contraseña
    if (this.user.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.authService.register(this.user.name, this.user.email, this.user.password).subscribe({
      next: (response) => {
        if (response.success || response.message === 'Usuario registrado exitosamente') {
          this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
          console.log('Registration response:', response);
          setTimeout(() => this.router.navigate(['/authentication/side-login']), 2000);
        } else {
          this.errorMessage = 'Error al registrarse. ' + (response.error || 'Sin detalles');
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        if (err.status === 400 && err.error.details) {
          this.errorMessage = 'Error al registrarse: ' + err.error.details.map((d: any) => d.message).join(', ');
        } else {
          this.errorMessage = 'Error al registrarse. Intenta de nuevo. Detalle: ' + (err.error?.error || err.message || 'Sin detalles');
        }
      },
    });
  }
}