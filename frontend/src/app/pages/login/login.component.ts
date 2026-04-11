// src/app/pages/login/login.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  cerrarModal() {
    this.close.emit();
  }

  onSubmit() {
    console.log('Login - Email:', this.email);
    console.log('Login - Password:', this.password);
    this.cerrarModal();
  }

  recuperarPassword() {
    console.log('Recuperar contraseña para:', this.email);
  }
}