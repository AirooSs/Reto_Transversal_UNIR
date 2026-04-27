import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventoBackend } from '../../services/evento.service';

@Component({
  selector: 'app-evento-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento-card.component.html',
  styleUrl: './evento-card.component.css'
})
export class EventoCardComponent {
  @Input() evento!: EventoBackend;
  @Output() cardClick = new EventEmitter<EventoBackend>();

  onCardClick() {
    this.cardClick.emit(this.evento);
  }
}