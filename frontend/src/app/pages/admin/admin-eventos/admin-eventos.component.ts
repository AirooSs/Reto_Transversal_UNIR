import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EventoService, EventoBackend } from '../../../services/evento.service';

@Component({
  selector: 'app-admin-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-eventos.component.html',
  styleUrl: './admin-eventos.component.css'
})
export class AdminEventosComponent implements OnInit {
  eventos: EventoBackend[] = [];
  loading = true;
  filtroActual = '';
  tituloLista = '';

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Detectar qué filtro aplicar según la ruta actual
    const url = this.router.url;
    if (url.includes('activos')) {
      this.filtroActual = 'activos';
      this.tituloLista = 'Eventos Activos';
    } else if (url.includes('destacados')) {
      this.filtroActual = 'destacados';
      this.tituloLista = 'Eventos Destacados';
    } else if (url.includes('cancelados')) {
      this.filtroActual = 'cancelados';
      this.tituloLista = 'Eventos Cancelados';
    } else if (url.includes('terminados')) {
      this.filtroActual = 'terminados';
      this.tituloLista = 'Eventos Terminados';
    }
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.loading = true;
    let observable;

    switch (this.filtroActual) {
      case 'activos':
        observable = this.eventoService.getEventosActivos();
        break;
      case 'destacados':
        observable = this.eventoService.getEventosDestacados();
        break;
      case 'cancelados':
        observable = this.eventoService.getEventosCancelados();
        break;
      case 'terminados':
        observable = this.eventoService.getEventosFinalizados();
        break;
      default:
        observable = this.eventoService.getEventosActivos();
    }

    observable.subscribe({
      next: (data) => {
        this.eventos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar eventos:', err);
        this.loading = false;
      }
    });
  }

  editarEvento(id: number): void {
    this.router.navigate(['/admin/eventos/editar', id]);
  }

  cancelarEvento(evento: EventoBackend): void {
    if (!confirm(`¿Cancelar el evento "${evento.titulo}"?`)) return;
    this.eventoService.cancelarEvento(evento).subscribe({
      next: () => this.cargarEventos(),
      error: (err) => console.error('Error al cancelar evento:', err)
    });
  }

  eliminarEvento(id: number): void {
    if (!confirm('¿Eliminar este evento? Esta acción no se puede deshacer.')) return;
    this.eventoService.eliminarEvento(id).subscribe({
      next: () => this.cargarEventos(),
      error: (err) => console.error('Error al eliminar evento:', err)
    });
  }

  nuevoEvento(): void {
    this.router.navigate(['/admin/eventos/alta']);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/evento-detalle', id]);
  }
}
