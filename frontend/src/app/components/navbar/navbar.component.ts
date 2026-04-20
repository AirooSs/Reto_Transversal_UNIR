// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isEventosOpen = false;

  constructor(
    private modalService: ModalService,
    public authService: AuthService,
    private router: Router
  ) { }

  toggleEventos() {
    this.isEventosOpen = !this.isEventosOpen;
  }

  abrirLogin() {
    this.modalService.openLoginModal();
  }

  abrirRegistro() {
    this.modalService.openRegistroModal();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getNombre(): string {
    return this.authService.getUsuario()?.nombre ?? '';
  }
}