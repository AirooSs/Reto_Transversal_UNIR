import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EventoService, EventoBackend } from '../../../services/evento.service';
import { TipoEventoService } from '../../../services/tipo-evento.service';
import { TipoEvento } from '../../../services/evento.service';

@Component({
  selector: 'app-admin-evento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-evento-form.component.html',
  styleUrl: './admin-evento-form.component.css'
})
export class AdminEventoFormComponent implements OnInit {
  esEdicion = false;
  loading = false;
  error = '';
  tiposEvento: TipoEvento[] = [];

  evento: Partial<EventoBackend> = {
    titulo: '',
    artista: '',
    localidad: '',
    descripcion: '',
    fecha: '',
    duracion: 0,
    precio: 0,
    aforoMaximo: 0,
    plazasDisponibles: 0,
    imagenUrl: '',
    destacado: false,
    estado: 'ACTIVO',
    tipoEvento: undefined
  };

  tipoEventoId: number | null = null;

  constructor(
    private eventoService: EventoService,
    private tipoEventoService: TipoEventoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarTipos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.eventoService.getEventoById(id).subscribe({
        next: (data) => {
          this.evento = {
            ...data,
            // Formatear fecha para input datetime-local
            fecha: data.fecha ? data.fecha.substring(0, 16) : ''
          };
          this.tipoEventoId = data.tipoEvento?.id ?? null;
        },
        error: (err) => console.error('Error al cargar evento:', err)
      });
    }
  }

  cargarTipos(): void {
    this.tipoEventoService.getTipos().subscribe({
      next: (tipos) => this.tiposEvento = tipos,
      error: (err) => console.error('Error al cargar tipos:', err)
    });
  }

  onTipoChange(): void {
    const tipo = this.tiposEvento.find(t => t.id === Number(this.tipoEventoId));
    if (tipo) this.evento.tipoEvento = tipo;
  }

  onAforoChange(): void {
    if (!this.esEdicion) {
      this.evento.plazasDisponibles = this.evento.aforoMaximo;
    }
  }

  guardar(): void {
    if (!this.evento.titulo || !this.evento.artista || !this.evento.fecha) {
      this.error = 'Por favor rellena todos los campos obligatorios';
      return;
    }

    if (!this.tipoEventoId) {
      this.error = 'Selecciona un tipo de evento';
      return;
    }

    this.error = '';
    this.loading = true;

    const tipo = this.tiposEvento.find(t => t.id === Number(this.tipoEventoId));
    const eventoAGuardar: any = {
      ...this.evento,
      tipoEvento: tipo
    };

    if (this.esEdicion) {
      this.eventoService.actualizarEvento(eventoAGuardar).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/eventos/activos']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al actualizar el evento';
          console.error(err);
        }
      });
    } else {
      eventoAGuardar.estado = 'ACTIVO';
      this.eventoService.crearEvento(eventoAGuardar).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/eventos/activos']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al crear el evento';
          console.error(err);
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/admin/eventos/activos']);
  }
}
