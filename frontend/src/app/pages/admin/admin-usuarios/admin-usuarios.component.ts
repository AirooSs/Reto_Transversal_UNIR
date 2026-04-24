import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService, UsuarioBackend } from '../../../services/usuario.service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: UsuarioBackend[] = [];
  usuariosFiltrados: UsuarioBackend[] = [];
  loading = true;
  filtroRol = 'todos';
  editandoId: number | null = null;
  rolEditando = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.aplicarFiltro();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.loading = false;
      }
    });
  }

  aplicarFiltro(): void {
    if (this.filtroRol === 'todos') {
      this.usuariosFiltrados = this.usuarios;
    } else {
      this.usuariosFiltrados = this.usuarios.filter(u => u.rol === this.filtroRol);
    }
  }

  onFiltroChange(): void {
    this.aplicarFiltro();
  }

  editarRol(usuario: UsuarioBackend): void {
    this.editandoId = usuario.id;
    this.rolEditando = usuario.rol;
  }

  guardarRol(usuario: UsuarioBackend): void {
    const actualizado = { ...usuario, rol: this.rolEditando };
    this.usuarioService.actualizarUsuario(actualizado).subscribe({
      next: () => {
        usuario.rol = this.rolEditando;
        this.editandoId = null;
        this.aplicarFiltro();
      },
      error: (err) => console.error('Error al actualizar rol:', err)
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
  }

  eliminarUsuario(id: number, nombre: string): void {
    if (!confirm(`¿Eliminar al usuario "${nombre}"?`)) return;
    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.aplicarFiltro();
      },
      error: (err) => console.error('Error al eliminar usuario:', err)
    });
  }
}