// src/app/services/tipo-evento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEvento } from './evento.service'; // <-- cambiado

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
  private apiUrl = 'http://localhost:9008/tipoevento';

  constructor(private http: HttpClient) {}

  getTipos(): Observable<TipoEvento[]> {
    return this.http.get<TipoEvento[]>(`${this.apiUrl}/`);
  }

  getTipoById(id: number): Observable<TipoEvento> {
    return this.http.get<TipoEvento>(`${this.apiUrl}/${id}`);
  }

  crearTipo(tipo: Partial<TipoEvento>): Observable<TipoEvento> {
    return this.http.post<TipoEvento>(`${this.apiUrl}/`, tipo);
  }

  actualizarTipo(tipo: TipoEvento): Observable<TipoEvento> {
    return this.http.put<TipoEvento>(`${this.apiUrl}/`, tipo);
  }

  eliminarTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}