// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioBackend {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:9008/usuario';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UsuarioBackend[]> {
    return this.http.get<UsuarioBackend[]>(`${this.apiUrl}/`);
  }

  getUsuarioById(id: number): Observable<UsuarioBackend> {
    return this.http.get<UsuarioBackend>(`${this.apiUrl}/${id}`);
  }

  getUsuariosPorRol(rol: string): Observable<UsuarioBackend[]> {
    return this.http.get<UsuarioBackend[]>(`${this.apiUrl}/rol/${rol}`);
  }

  actualizarUsuario(usuario: UsuarioBackend): Observable<UsuarioBackend> {
    return this.http.put<UsuarioBackend>(`${this.apiUrl}/`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}