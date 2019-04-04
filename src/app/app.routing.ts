/*
Siguiendo las guías de estilo de Angular (https://angular.io/styleguide) dejemos ordenados los imports
de la siguiente manera:

1) Módulos principales de Angular
2) Módulos globales
3) Servicios
4) Componentes
5) Otros
*/

// Angular
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Global
import { InicioComponent } from './components/inicio.component';
import { TurnosComponent } from './components/turnos.component';
import { ScanPacienteComponent } from './components/scan-paciente.component';
import { ConfirmarTelefonoComponent } from './components/confirmar-telefono.component';


// import { HomeComponent } from './modules/estadisticas/components/home.component';

const appRoutes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'turnos', component: TurnosComponent },
    { path: 'buscar', component: ScanPacienteComponent },
    { path: 'confirmar-telefono', component: ConfirmarTelefonoComponent },
    // dejar siempre al último porque no encuentra las url después de esta
    { path: '**', redirectTo: 'buscar' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
