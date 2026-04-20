// src/app/pages/registro/registro.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  @Output() close = new EventEmitter<void>();

  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMensaje: string = '';
  cargando: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  cerrarModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden';
      return;
    }

    if (this.password.length < 6) {
      this.errorMensaje = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    this.authService.registro(this.nombre, this.email, this.password).subscribe({
      next: () => {
        this.cargando = false;
        this.cerrarModal();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 409) {
          this.errorMensaje = 'Este email ya está registrado';
        } else {
          this.errorMensaje = 'Error al registrarse, inténtalo de nuevo';
        }
      }
    });
  }
}
