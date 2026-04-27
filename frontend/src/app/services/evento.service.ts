// src/app/services/evento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export interface TipoEvento {
  id: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:9008/eventos/';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<EventoBackend[]> {
    return this.http.get<EventoBackend[]>(this.apiUrl);
  }

  getEventoById(id: string): Observable<EventoBackend> {
    return this.http.get<EventoBackend>(`${this.apiUrl}${id}`);
  }

  getEventosActivos(): Observable<EventoBackend[]> {
    return this.getEventos().pipe(
      map(eventos => eventos.filter(e => e.estado === 'ACTIVO'))
    );
  }

  getEventosDestacados(): Observable<EventoBackend[]> {
    return this.getEventos().pipe(
      map(eventos => eventos.filter(e => e.destacado === true))
    );
  }

  getEventosCancelados(): Observable<EventoBackend[]> {
    return this.getEventos().pipe(
      map(eventos => eventos.filter(e => e.estado === 'CANCELADO'))
    );
  }

  getEventosFinalizados(): Observable<EventoBackend[]> {
    return this.getEventos().pipe(
      map(eventos => eventos.filter(e => e.estado === 'FINALIZADO'))
    );
  }

  getEventosPorTipo(tipoId: number): Observable<EventoBackend[]> {
    return this.getEventos().pipe(
      map(eventos => eventos.filter(e => e.tipoEvento?.id === tipoId))
    );
  }

  crearEvento(evento: Partial<EventoBackend>): Observable<EventoBackend> {
    return this.http.post<EventoBackend>(this.apiUrl, evento);
  }

  actualizarEvento(evento: EventoBackend): Observable<EventoBackend> {
    return this.http.put<EventoBackend>(this.apiUrl, evento);
  }

  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  cancelarEvento(evento: EventoBackend): Observable<EventoBackend> {
    return this.actualizarEvento({ ...evento, estado: 'CANCELADO' });
  }
}