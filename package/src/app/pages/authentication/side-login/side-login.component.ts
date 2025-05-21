import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-login',
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SideLoginComponent {
  user = { email: '', password: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Todos los campos son obligatorios: email y contraseña.';
      return;
    }

    this.authService.authenticate(this.user.email, this.user.password).subscribe({
      next: (response) => {
        if (response.success || response.message === 'Login exitoso') {
          this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
          console.log('Login response:', response);
          setTimeout(() => this.router.navigate(['/Home'])); 
        } else {
          this.errorMessage = 'Error al iniciar sesión. ' + (response.error || 'Sin detalles');
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión. Detalle: ' + (err.message || 'Sin detalles');
        console.error('Login error:', err);
      },
    });
  }
}