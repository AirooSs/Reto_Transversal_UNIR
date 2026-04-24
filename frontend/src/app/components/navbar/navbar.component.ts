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
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  isEventosOpen = false;
  isTiposOpen = false;
  isMenuOpen = false;
  tiposEvento: TipoEvento[] = [];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isEventosOpen = false;
    this.isTiposOpen = false;
  }

  // Cierra el menú al navegar
  cerrarMenu(): void {
    this.isMenuOpen = false;
    this.isEventosOpen = false;
    this.isTiposOpen = false;
  }

  constructor(
    private modalService: ModalService,
    public authService: AuthService,
    private router: Router,
    private tipoEventoService: TipoEventoService
  ) {}

  ngOnInit(): void {
    // Cargamos los tipos de evento para el desplegable del cliente
    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.tipoEventoService.getTipos().subscribe({
        next: (tipos) => this.tiposEvento = tipos,
        error: (err) => console.error('Error cargando tipos de evento', err)
      });
    }
  }

  toggleEventos(): void {
    this.isEventosOpen = !this.isEventosOpen;
    this.isTiposOpen = false; // cierra el otro dropdown
  }

  toggleTipos(): void {
    this.isTiposOpen = !this.isTiposOpen;
    this.isEventosOpen = false; // cierra el otro dropdown
  }

  filtrarPorTipo(tipoId: number): void {
    this.isTiposOpen = false;
    this.router.navigate(['/clientes/activos'], { queryParams: { tipo: tipoId } });
  }

  abrirLogin(): void {
    this.modalService.openLoginModal();
  }

  abrirRegistro(): void {
    this.modalService.openRegistroModal();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getNombre(): string {
    return this.authService.getUsuario()?.nombre ?? 'Usuario';
  }
}