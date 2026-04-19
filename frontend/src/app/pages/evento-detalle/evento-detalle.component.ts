import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento-detalle.component.html',
  styleUrl: './evento-detalle.component.css'
})
export class EventoDetalleComponent implements OnInit {
  artistaActual: any = null;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.eventoService.getEventoById(id).subscribe({
        next: (data: any) => {
          const fechaObj = new Date(data.fecha);
          this.artistaActual = {
            id: data.id,
            nombre: data.titulo,
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
            conciertos: this.obtenerConciertosPorId(id)
          };
        },
        error: (err) => {
          console.error('Error al cargar evento:', err);
          // Fallback con datos mock
          const nombres: any = {
            '1': 'ROSALÍA',
            '2': 'MARO',
            '3': 'TAME IMPALA',
            '4': 'PLK',
            '5': 'BAD GYAL',
            '6': 'CAROLINE',
            '7': 'O´FLYNN'
          };
          const fechaObj = new Date();
          this.artistaActual = {
            id: id,
            nombre: nombres[id] || 'Artista ' + id,
            imagen: `assets/evento${id}.png`,
            dia: fechaObj.getDate().toString(),
            mes: fechaObj.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase(),
            fecha: this.formatearFecha(fechaObj.toISOString()),
            descripcion: 'Descripción no disponible',
            duracion: 90,
            precio: 30,
            plazasDisponibles: 100,
            aforoMaximo: 100,
            genero: 'Pop',
            conciertos: this.obtenerConciertosPorId(id)
          };
        }
      });
    }
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).toUpperCase();
  }

  obtenerConciertosPorId(id: string): any[] {
    const baseDeConciertos: any = {
      '1': [ // ROSALÍA
        { dia: '15', mes: 'JUL 2026', estadio: 'Palau Sant Jordi', ciudad: 'BARCELONA', soldOut: true },
        { dia: '08', mes: 'ABR 2026', estadio: 'FIBES', ciudad: 'SEVILLA, ESPAÑA', soldOut: false, pocasEntradas: true }
      ],
      '2': [ // MARO
        { dia: '05', mes: 'SEP 2026', estadio: 'Teatro Circo Price', ciudad: 'MADRID', soldOut: false }
      ],
      '5': [ // BAD GYAL
        { dia: '22', mes: 'AGO 2026', estadio: 'Recinto Ferial', ciudad: 'ALICANTE', soldOut: false },
        { dia: '29', mes: 'AGO 2026', estadio: 'Marenostrum', ciudad: 'FUENGIROLA', soldOut: true }
      ],
      '6': [ // CAROLINE
        { dia: '20', mes: 'JUN 2026', estadio: 'Recinto Ferial', ciudad: 'MADRID', soldOut: false }
      ]
    };

    return baseDeConciertos[id] || [
      { dia: '10', mes: 'OCT 2026', estadio: 'Estadio Olímpico', ciudad: 'SEVILLA', soldOut: false }
    ];
  }
}