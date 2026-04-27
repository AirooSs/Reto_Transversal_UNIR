// src/app/services/reserva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReservaBackend {
  id: number;
  cantidad: number;
  fechaReserva: string;
  evento: {
    id: number;
    titulo: string;
    artista: string;
    fecha: string;
    precio: number;
    localidad: string;
    imagenUrl: string;
  };
}

export interface CrearReservaRequest {
  email: string;
  eventoId: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:9008/reserva';

  constructor(private http: HttpClient) {}

  getMisReservas(email: string): Observable<ReservaBackend[]> {
    return this.http.get<ReservaBackend[]>(`${this.apiUrl}/mis-reservas/${email}`);
  }

  crearReserva(request: CrearReservaRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, request);
  }

  cancelarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}