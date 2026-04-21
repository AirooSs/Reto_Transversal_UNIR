import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EventoDetalleComponent } from './pages/evento-detalle/evento-detalle.component';
import { authGuard, adminGuard } from './guards/auth.guard';
import { ArtistasComponent } from './pages/artistas/artistas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'evento-detalle/:id', component: EventoDetalleComponent },
    { path: 'artistas', component: ArtistasComponent },
    

    // Rutas protegidas para ROLE_CLIENTE y ROLE_ADMON
    {
        path: 'mis-reservas',
        loadComponent: () => import('./components/reservas/reservas.component').then(m => m.ReservasComponent),
        canActivate: [authGuard]
    },

    // Rutas protegidas solo para ROLE_ADMON
    {
        path: 'admin',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [adminGuard]
    },

    { path: '**', redirectTo: '' }
];
