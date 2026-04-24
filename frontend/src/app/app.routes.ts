import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EventoDetalleComponent } from './pages/evento-detalle/evento-detalle.component';
import { authGuard, adminGuard } from './guards/auth.guard';
import { ArtistasComponent } from './pages/artistas/artistas.component';

export const routes: Routes = [
    // Rutas públicas
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'evento-detalle/:id', component: EventoDetalleComponent },
    { path: 'artistas', component: ArtistasComponent },

    // Rutas protegidas ROLE_CLIENTE y ROLE_ADMON
    {
        path: 'mis-reservas',
        loadComponent: () => import('./components/reservas/reservas.component').then(m => m.ReservasComponent),
        canActivate: [authGuard]
    },

    // Rutas protegidas ROLE_ADMON
    {
        path: 'admin/eventos/activos',
        loadComponent: () => import('./pages/admin/admin-eventos/admin-eventos.component').then(m => m.AdminEventosComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'admin/eventos/destacados',
        loadComponent: () => import('./pages/admin/admin-eventos/admin-eventos.component').then(m => m.AdminEventosComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'admin/eventos/cancelados',
        loadComponent: () => import('./pages/admin/admin-eventos/admin-eventos.component').then(m => m.AdminEventosComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'admin/eventos/terminados',
        loadComponent: () => import('./pages/admin/admin-eventos/admin-eventos.component').then(m => m.AdminEventosComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'admin/eventos/alta',
        loadComponent: () => import('./pages/admin/admin-evento-form/admin-evento-form.component').then(m => m.AdminEventoFormComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'admin/eventos/editar/:id',
        loadComponent: () => import('./pages/admin/admin-evento-form/admin-evento-form.component').then(m => m.AdminEventoFormComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'admin/usuarios',
        loadComponent: () => import('./pages/admin/admin-usuarios/admin-usuarios.component').then(m => m.AdminUsuariosComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'admin/tipos-evento',
        loadComponent: () => import('./pages/admin/admin-tipos/admin-tipos.component').then(m => m.AdminTiposComponent),
        canActivate: [adminGuard]
    },

    { path: '**', redirectTo: '' }
];