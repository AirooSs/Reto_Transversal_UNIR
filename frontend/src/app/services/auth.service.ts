// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9008/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => this.guardarSesion(res))
    );
  }

  registro(nombre: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registro`, { nombre, email, password, rol: 'ROLE_CLIENTE' }).pipe(
      tap(res => this.guardarSesion(res))
    );
  }

  private guardarSesion(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('usuario', JSON.stringify(res));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): AuthResponse | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getRol(): string | null {
    return this.getUsuario()?.rol ?? null;
  }

  isAdmin(): boolean {
    return this.getRol() === 'ROLE_ADMON';
  }

  isCliente(): boolean {
    return this.getRol() === 'ROLE_CLIENTE';
  }
}
