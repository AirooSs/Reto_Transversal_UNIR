import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservaService, ReservaBackend } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  reservas: ReservaBackend[] = [];
  loading = true;
  error = '';
  cancelandoId: number | null = null;

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    this.loading = true;
    this.reservaService.getMisReservas(usuario.email).subscribe({
      next: (data) => {
        // Solo reservas con fecha futura
        const ahora = new Date();
        this.reservas = data.filter(r => new Date(r.evento.fecha) > ahora);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar reservas:', err);
        this.error = 'Error al cargar tus reservas';
        this.loading = false;
      }
    });
  }

  cancelarReserva(id: number): void {
    if (!confirm('¿Seguro que quieres cancelar esta reserva?')) return;

    this.cancelandoId = id;
    this.reservaService.cancelarReserva(id).subscribe({
      next: () => {
        this.reservas = this.reservas.filter(r => r.id !== id);
        this.cancelandoId = null;
      },
      error: (err) => {
        console.error('Error al cancelar reserva:', err);
        this.cancelandoId = null;
      }
    });
  }

  getImagenUrl(url: string): string {
    return `http://localhost:9008${url}`;
  }

  getPrecioTotal(reserva: ReservaBackend): number {
    return reserva.cantidad * reserva.evento.precio;
  }
}