// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventoCardComponent, Evento } from '../../components/evento-card/evento-card.component';
import { EventoService, EventoBackend } from '../../services/evento.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];
  eventoFijo: Evento | null = null;
  loading = true;

  constructor(
    private router: Router,
    private eventoService: EventoService
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (data: EventoBackend[]) => {
        // El evento destacado (id 1 = Rosalía)
        const destacado = data.find(e => e.id === 1);
        if (destacado) {
          this.eventoFijo = {
            id: destacado.id,
            nombre: destacado.titulo,
            titulo: destacado.titulo,
            artista: destacado.titulo,
            fecha: this.formatearFecha(destacado.fecha),
            imagen: this.getImagenUrl(destacado.imagenUrl),
            imagenUrl: destacado.imagenUrl,
            precio: destacado.precio,
            descripcion: destacado.descripcion
          };
        }
        
        // Transformar los datos del backend al formato Evento
        // Filtrar para que el evento destacado (id 1) NO aparezca en el grid
        this.eventos = data
          .filter(evento => evento.id !== 1)  // ← Excluir el evento destacado
          .map(evento => ({
            id: evento.id,
            nombre: evento.titulo,
            titulo: evento.titulo,
            artista: evento.titulo,
            fecha: this.formatearFecha(evento.fecha),
            imagen: this.getImagenUrl(evento.imagenUrl),
            imagenUrl: evento.imagenUrl,
            precio: evento.precio,
            descripcion: evento.descripcion
          }));
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar eventos:', err);
        this.loading = false;
      }
    });
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).toUpperCase();
  }

  getImagenUrl(url: string): string {
    if (url.startsWith('http')) {
      return url;
    }
    return `http://localhost:9008${url}`;
  }

  onEventoClick(evento: Evento) {
    this.router.navigate(['/evento-detalle', evento.id]);
  }

  onComprarClick(evento: Evento) {
    this.router.navigate(['/evento-detalle', evento.id]);
  }
}