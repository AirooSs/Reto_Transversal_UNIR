// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventoCardComponent, Evento } from '../../components/evento-card/evento-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];
  eventoFijo: Evento | null = null; // Evento fijo para la imagen izquierda

  constructor(private router: Router) {}

  ngOnInit() {
    // Datos de ejemplo mientras no hay backend
    this.eventos = [
      {
        id: 2,
        nombre: 'MARO',
        artista: 'artista',
        fecha: '22 MAYO 2026',
        imagen: '/assets/evento2.png'
      },
      {
        id: 3,
        nombre: 'TAME IMPALA',
        artista: 'artista',
        fecha: '5 JUNIO 2026',
        imagen: '/assets/evento3.png'
      },
      {
        id: 4,
        nombre: 'PLK',
        artista: 'artista',
        fecha: '12 JUNIO 2026',
        imagen: '/assets/evento4.png'
      },
      {
        id: 5,
        nombre: 'BAD GYAL',
        artista: 'artista',
        fecha: '20 JUNIO 2026',
        imagen: '/assets/evento5.png'
      },
      {
        id: 6,
        nombre: 'CAROLINE',
        artista: 'GUITARRA FLAMENCA',
        fecha: '28 JUNIO 2026',
        imagen: '/assets/evento6.png'
      },
      {
        id: 7,
        nombre: 'O´FLYNN',
        artista: 'artista',
        fecha: '5 JULIO 2026',
        imagen: '/assets/evento7.png'
      }
    ];

    // Evento fijo para la imagen izquierda (siempre evento1)
    this.eventoFijo = {
      id: 1,
      nombre: 'ROSALÍA',
      artista: 'ROSALÍA',
      fecha: '15 MAYO 2026',
      imagen: '/assets/evento1.png'
    };
  }

  // Navegar a evento-detalle al hacer click en la tarjeta
  onEventoClick(evento: Evento) {
    this.router.navigate(['/evento-detalle', evento.id]);
  }

  // Navegar a evento-detalle al hacer click en "Comprar entradas"
  onComprarClick(evento: Evento) {
    this.router.navigate(['/evento-detalle', evento.id]);
  }
}