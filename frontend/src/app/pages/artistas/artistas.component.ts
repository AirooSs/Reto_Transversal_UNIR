import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventoService, EventoBackend } from '../../services/evento.service';

interface ArtistaConEventos {
  nombre: string;
  imagen: string;
  eventos: {
    id: number;
    titulo: string;
    fecha: string;
    fechaFormateada: string;
  }[];
}

@Component({
  selector: 'app-artistas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artistas.component.html',
  styleUrl: './artistas.component.css'
})
export class ArtistasComponent implements OnInit {
  artistas: ArtistaConEventos[] = [];
  artistasOriginal: ArtistaConEventos[] = [];
  ordenAlfabetico: boolean = true;

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarArtistas();
  }

  cargarArtistas(): void {
    this.eventoService.getEventos().subscribe({
      next: (data: EventoBackend[]) => {
        // Agrupar eventos por artista
        const mapaArtistas = new Map<string, ArtistaConEventos>();
        
        data.forEach(evento => {
          const nombreArtista = evento.artista || evento.titulo;
          
          if (!mapaArtistas.has(nombreArtista)) {
            mapaArtistas.set(nombreArtista, {
              nombre: nombreArtista,
              imagen: `http://localhost:9008${evento.imagenUrl}`,
              eventos: []
            });
          }
          
          mapaArtistas.get(nombreArtista)!.eventos.push({
            id: evento.id,
            titulo: evento.titulo,
            fecha: evento.fecha,
            fechaFormateada: this.formatearFecha(evento.fecha)
          });
        });
        
        this.artistas = Array.from(mapaArtistas.values());
        this.artistasOriginal = [...this.artistas];
        this.ordenarPorNombre();
      },
      error: (err) => {
        console.error('Error al cargar artistas:', err);
      }
    });
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  }

  ordenarPorNombre(): void {
    this.ordenAlfabetico = true;
    this.artistas.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  ordenarPorFecha(): void {
    this.ordenAlfabetico = false;
    this.artistas = [...this.artistasOriginal];
    this.artistas.forEach(artista => {
      artista.eventos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    });
    // Ordenar artistas por la fecha de su próximo evento
    this.artistas.sort((a, b) => {
      const fechaA = a.eventos[0]?.fecha || '';
      const fechaB = b.eventos[0]?.fecha || '';
      return new Date(fechaA).getTime() - new Date(fechaB).getTime();
    });
  }

  irAEvento(id: number): void {
    this.router.navigate(['/evento-detalle', id]);
    window.scrollTo(0, 0);
  }

  getProximasFechas(eventos: any[]): string {
    return eventos.map(e => e.fechaFormateada).join(' • ');
  }
}