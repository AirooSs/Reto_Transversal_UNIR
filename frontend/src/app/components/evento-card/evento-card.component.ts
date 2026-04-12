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
  descripcion?: string;
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

  onCardClick() {
    this.cardClick.emit(this.evento);
  }
}