// src/app/services/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del localStorage (donde lo guardes después del login)
    const token = localStorage.getItem('token');
    
    if (token) {
      // Clonar la petición y añadir el header Authorization
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    
    // Si no hay token, enviar la petición original
    return next.handle(req);
  }
}