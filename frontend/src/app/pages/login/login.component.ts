// src/app/pages/login/login.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();

  email: string = '';
  password: string = '';
  errorMensaje: string = '';
  cargando: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  cerrarModal() {
    this.close.emit();
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMensaje = 'Por favor rellena todos los campos';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.cargando = false;
        this.cerrarModal();
        if (res.rol === 'ROLE_ADMON') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.cargando = false;
        this.errorMensaje = 'Email o contraseña incorrectos';
      }
    });
  }

  recuperarPassword() {
    console.log('Recuperar contraseña para:', this.email);
  }
}