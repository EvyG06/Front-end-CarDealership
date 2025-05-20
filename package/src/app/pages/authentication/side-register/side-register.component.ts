import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/models/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})

export class SideRegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Inicia sesión.';
        this.router.navigate(['/authentication/side-login']);
      },
      error: () => this.errorMessage = 'Error al registrar usuario.'
    });
  }
}