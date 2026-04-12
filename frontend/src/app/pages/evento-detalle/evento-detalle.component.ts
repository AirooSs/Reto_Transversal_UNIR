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
          this.artistaActual = data;
          this.artistaActual.nombre = data.titulo || data.nombre;
          
          // Si el backend devuelve el artista pero sin conciertos, 
          // le asignamos los suyos específicos.
          if (!this.artistaActual.conciertos || this.artistaActual.conciertos.length === 0) {
            this.artistaActual.conciertos = this.obtenerConciertosPorId(id);
          }
        },
        error: (err) => {
          console.warn("Backend no disponible, usando datos locales para ID:", id);
          
          const nombres: any = {
            '1': 'ROSALÍA',
            '2': 'MARO',
            '3': 'TAME IMPALA',
            '4': 'PLK',
            '5': 'BAD GYAL',
            '6': 'CAROLINE',
            '7': 'O´FLYNN'
          };

          this.artistaActual = {
            id: id,
            nombre: nombres[id] || 'Artista ' + id,
            imagen: `assets/evento${id}.png`, 
            conciertos: this.obtenerConciertosPorId(id)
          };
        }
      });
    }
  }

  // función para diversificar las giras según el ID del artista
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

    // Si el ID no está en la lista, devolvemos una fecha genérica por defecto
    return baseDeConciertos[id] || [
      { dia: '10', mes: 'OCT 2026', estadio: 'Estadio Olímpico', ciudad: 'SEVILLA', soldOut: false }
    ];
  }
}