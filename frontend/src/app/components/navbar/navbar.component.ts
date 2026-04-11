// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isEventosOpen = false;
  isLoggedIn = false; // Cambiar a true cuando el usuario inicie sesión

  toggleEventos() {
    this.isEventosOpen = !this.isEventosOpen;
  }

  // Métodos para acciones del menú usuario
  login() {
    // Lógica de inicio de sesión
  }

  register() {
    // Lógica de registro
  }

  logout() {
    // Lógica de cierre de sesión
  }
}