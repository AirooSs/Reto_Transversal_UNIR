// src/app/pages/registro/registro.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  cerrarModal() {
    this.close.emit();
  }

  onSubmit() {
    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden';
      return;
    }
    
    if (this.password.length < 6) {
      this.errorMensaje = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.errorMensaje = '';
    console.log('Registro:', this.nombre, this.email, this.password);
    this.cerrarModal();
  }
}