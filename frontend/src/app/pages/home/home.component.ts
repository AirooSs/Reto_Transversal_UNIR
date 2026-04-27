// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventoCardComponent } from '../../components/evento-card/evento-card.component';
import { EventoService, EventoBackend } from '../../services/evento.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  eventos: EventoBackend[] = [];
  eventoDestacado: EventoBackend | null = null;
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
        // Primer evento destacado como hero
        this.eventoDestacado = data.find(e => e.destacado) ?? null;

        // El resto para el grid, excluyendo el destacado hero
        this.eventos = data.filter(e => e.id !== this.eventoDestacado?.id);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar eventos:', err);
        this.loading = false;
      }
    });
  }

  onEventoClick(evento: EventoBackend) {
    this.router.navigate(['/evento-detalle', evento.id]);
  }
}