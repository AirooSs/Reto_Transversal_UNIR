// src/app/services/evento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventoBackend {
  id: number;
  titulo: string;
  artista: string;
  localidad: string;
  descripcion: string;
  fecha: string;
  duracion: number;
  precio: number;
  aforoMaximo: number;
  plazasDisponibles: number;
  imagenUrl: string;
  destacado: boolean;
  estado: string;
  tipoEvento: {
    id: number;
    nombre: string;
    descripcion: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:9008/eventos/';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<EventoBackend[]> {
    return this.http.get<EventoBackend[]>(this.apiUrl);
  }

  getEventoById(id: string): Observable<EventoBackend> {
    return this.http.get<EventoBackend>(`${this.apiUrl}${id}`);
  }
}