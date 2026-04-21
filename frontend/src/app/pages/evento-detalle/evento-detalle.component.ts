import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventoService, EventoBackend } from '../../services/evento.service';

@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento-detalle.component.html',
  styleUrl: './evento-detalle.component.css'
})
export class EventoDetalleComponent implements OnInit {
  artistaActual: any = null;
  proximosEventos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.eventoService.getEventoById(id).subscribe({
        next: (data: EventoBackend) => {
          const fechaObj = new Date(data.fecha);
          this.artistaActual = {
            id: data.id,
            nombre: data.titulo,
            artista: data.artista,
            localidad: data.localidad,
            imagen: `http://localhost:9008${data.imagenUrl}`,
            dia: fechaObj.getDate().toString(),
            mes: fechaObj.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase(),
            fecha: this.formatearFecha(data.fecha),
            descripcion: data.descripcion,
            duracion: data.duracion,
            precio: data.precio,
            plazasDisponibles: data.plazasDisponibles,
            aforoMaximo: data.aforoMaximo,
            genero: data.tipoEvento?.nombre,
            imagenUrl: data.imagenUrl
          };
          
          // Cargar próximos eventos del mismo artista
          this.cargarProximosEventos(data.artista, data.id);
        },
        error: (err) => {
          console.error('Error al cargar evento:', err);
        }
      });
    }
  }

  cargarProximosEventos(artista: string, eventoActualId: number): void {
    this.eventoService.getEventos().subscribe({
      next: (data: EventoBackend[]) => {
        // Filtrar eventos del mismo artista, excluyendo el actual y con fecha futura
        const ahora = new Date();
        this.proximosEventos = data
          .filter(e => e.artista === artista && e.id !== eventoActualId && new Date(e.fecha) > ahora)
          .map(e => ({
            id: e.id,
            dia: new Date(e.fecha).getDate().toString(),
            mes: new Date(e.fecha).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase(),
            estadio: e.localidad || 'Por confirmar',
            ciudad: e.localidad || 'Por confirmar',
            soldOut: e.plazasDisponibles === 0,
            pocasEntradas: e.plazasDisponibles > 0 && e.plazasDisponibles < (e.aforoMaximo * 0.1)
          }));
      },
      error: (err) => {
        console.error('Error al cargar próximos eventos:', err);
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

  irAEvento(id: number): void {
    this.router.navigate(['/evento-detalle', id]);
    window.scrollTo(0, 0);
  }
}