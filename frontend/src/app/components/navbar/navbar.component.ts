// src/app/components/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { TipoEventoService } from '../../services/tipo-evento.service';
import { TipoEvento } from '../../services/evento.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isEventosOpen = false;
  isTiposOpen = false;
  isMenuOpen = false;
  tiposEvento: TipoEvento[] = [];

  constructor(
    private modalService: ModalService,
    public authService: AuthService,
    private router: Router,
    private tipoEventoService: TipoEventoService,
  ) {}

  ngOnInit(): void {
    this.cargarTiposEvento();
  }

  cargarTiposEvento(): void {
    if (!this.authService.isAdmin()) {
      this.tipoEventoService.getTipos().subscribe({
        next: (tipos) => (this.tiposEvento = tipos),
        error: (err) => console.error('Error cargando tipos de evento', err),
      });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isEventosOpen = false;
    this.isTiposOpen = false;
  }

  cerrarMenu(): void {
    this.isMenuOpen = false;
    this.isEventosOpen = false;
    this.isTiposOpen = false;
  }

  toggleEventos(): void {
    this.isEventosOpen = !this.isEventosOpen;
    this.isTiposOpen = false;
  }

  toggleTipos(): void {
    this.isTiposOpen = !this.isTiposOpen;
    this.isEventosOpen = false;

    if (this.isTiposOpen && this.tiposEvento.length === 0) {
      this.tipoEventoService.getTipos().subscribe({
        next: (tipos) => (this.tiposEvento = tipos),
        error: (err) => console.error('Error cargando tipos', err),
      });
    }
  }

  filtrarPorTipo(tipoId: number): void {
    this.isTiposOpen = false;
    this.cerrarMenu();
    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.router.navigate(['/clientes/tipo', tipoId]);
    } else {
      this.router.navigate(['/eventos/tipo', tipoId]);
    }
  }

  abrirLogin(): void {
    this.modalService.openLoginModal();
  }

  abrirRegistro(): void {
    this.modalService.openRegistroModal();
  }

  logout(): void {
    this.authService.logout();
    this.tiposEvento = [];
    this.router.navigate(['/']);
  }

  getNombre(): string {
    return this.authService.getUsuario()?.nombre ?? 'Usuario';
  }
}
