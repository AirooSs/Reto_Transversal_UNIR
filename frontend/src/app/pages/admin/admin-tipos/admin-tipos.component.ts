import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TipoEventoService } from '../../../services/tipo-evento.service';
import { TipoEvento } from '../../../services/evento.service';

@Component({
  selector: 'app-admin-tipos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-tipos.component.html',
  styleUrl: './admin-tipos.component.css'
})
export class AdminTiposComponent implements OnInit {
  tipos: TipoEvento[] = [];
  loading = true;
  error = '';
  mostrarFormulario = false;
  editandoId: number | null = null;

  nuevoTipo: Partial<TipoEvento> = { nombre: '', descripcion: '' };
  tipoEditando: TipoEvento | null = null;

  constructor(private tipoEventoService: TipoEventoService) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos(): void {
    this.loading = true;
    this.tipoEventoService.getTipos().subscribe({
      next: (data) => {
        this.tipos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar tipos:', err);
        this.loading = false;
      }
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.nuevoTipo = { nombre: '', descripcion: '' };
    this.error = '';
  }

  crearTipo(): void {
    if (!this.nuevoTipo.nombre) {
      this.error = 'El nombre es obligatorio';
      return;
    }
    this.error = '';
    this.tipoEventoService.crearTipo(this.nuevoTipo).subscribe({
      next: () => {
        this.mostrarFormulario = false;
        this.cargarTipos();
      },
      error: (err) => {
        this.error = 'Error al crear el tipo';
        console.error(err);
      }
    });
  }

  editarTipo(tipo: TipoEvento): void {
    this.editandoId = tipo.id;
    this.tipoEditando = { ...tipo };
  }

  guardarEdicion(): void {
    if (!this.tipoEditando?.nombre) {
      this.error = 'El nombre es obligatorio';
      return;
    }
    this.error = '';
    this.tipoEventoService.actualizarTipo(this.tipoEditando!).subscribe({
      next: () => {
        this.editandoId = null;
        this.tipoEditando = null;
        this.cargarTipos();
      },
      error: (err) => {
        this.error = 'Error al actualizar el tipo';
        console.error(err);
      }
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.tipoEditando = null;
    this.error = '';
  }

  eliminarTipo(id: number, nombre: string): void {
    if (!confirm(`¿Eliminar el tipo "${nombre}"?`)) return;
    this.tipoEventoService.eliminarTipo(id).subscribe({
      next: () => this.cargarTipos(),
      error: (err) => console.error('Error al eliminar tipo:', err)
    });
  }
}