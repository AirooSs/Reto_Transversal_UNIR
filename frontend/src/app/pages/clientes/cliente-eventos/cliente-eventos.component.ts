import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EventoService, EventoBackend } from '../../../services/evento.service';
import { EventoCardComponent } from '../../../components/evento-card/evento-card.component';

@Component({
  selector: 'app-cliente-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, EventoCardComponent],
  templateUrl: './cliente-eventos.component.html',
  styleUrl: './cliente-eventos.component.css',
})
export class ClienteEventosComponent implements OnInit {
  eventos: EventoBackend[] = [];
  eventosFiltrados: EventoBackend[] = [];
  loading = true;
  tituloLista = '';

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.cargarEventos();
    });
  }

  cargarEventos(): void {
    this.loading = true;
    const url = this.router.url.split('?')[0];

    if (url.includes('activos')) {
      this.tituloLista = 'Eventos Activos';
      this.eventoService.getEventosActivos().subscribe(this.handleResponse());
    } else if (url.includes('destacados')) {
      this.tituloLista = 'Eventos Destacados';
      this.eventoService.getEventosDestacados().subscribe(this.handleResponse());
    } else if (url.includes('cancelados')) {
      this.tituloLista = 'Eventos Cancelados';
      this.eventoService.getEventosCancelados().subscribe(this.handleResponse());
    } else if (url.includes('terminados')) {
      this.tituloLista = 'Eventos Terminados';
      this.eventoService.getEventosFinalizados().subscribe(this.handleResponse());
    } else if (url.includes('tipo')) {
      const tipoId = Number(this.route.snapshot.paramMap.get('id'));
      this.tituloLista = 'Eventos por Tipo';
      this.eventoService.getEventosPorTipo(tipoId).subscribe(this.handleResponse());
    }
  }

  handleResponse() {
    return {
      next: (data: EventoBackend[]) => {
        this.eventos = data;
        this.eventosFiltrados = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar eventos:', err);
        this.loading = false;
      },
    };
  }

  onEventoClick(evento: EventoBackend): void {
    this.router.navigate(['/evento-detalle', evento.id]);
  }
}
