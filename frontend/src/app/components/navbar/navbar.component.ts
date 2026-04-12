// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isEventosOpen = false;
  isLoggedIn = false;

  constructor(private modalService: ModalService) {}

  toggleEventos() {
    this.isEventosOpen = !this.isEventosOpen;
  }

  abrirLogin() {
    this.modalService.openLoginModal();
  }

  abrirRegistro() {
    this.modalService.openRegistroModal();  // ← Cambia a registro
  }

  logout() {
    this.isLoggedIn = false;
  }
}