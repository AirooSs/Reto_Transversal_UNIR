// src/app/components/evento-card/evento-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Evento {
  id: number;
  nombre: string;
  artista: string;
  fecha: string;
  imagen: string;
  precio?: number;
  descripcion?: string;
  titulo?: string;      // Para compatibilidad
  imagenUrl?: string;   // Para compatibilidad
}

@Component({
  selector: 'app-evento-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento-card.component.html',
  styleUrl: './evento-card.component.css'
})
export class EventoCardComponent {
  @Input() evento!: Evento;
  @Output() cardClick = new EventEmitter<Evento>();

  getImagenUrl(url: string | undefined): string {
    if (!url) return '/assets/placeholder.png';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/assets')) return url;
    return `http://localhost:9008${url}`;
  }

  getNombre(): string {
    return this.evento.titulo || this.evento.nombre || 'Artista';
  }

  onCardClick() {
    this.cardClick.emit(this.evento);
  }
}