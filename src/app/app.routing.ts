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
import { TurnosComponent } from './components/turnos.component';
import { ScanPacienteComponent } from './components/scan-paciente.component';
import { ConfirmarTelefonoComponent } from './components/confirmar-telefono.component';
import { SeleccionarPrestacionComponent } from './components/seleccionar-prestacion.component';
import { PublicidadComponent } from './components/publicidad.component';
import { ErrorComponent } from './components/error.component';
import { StartComponent } from './components/start/start.component';


// import { HomeComponent } from './modules/estadisticas/components/home.component';

const appRoutes: Routes = [
  { path: 'prestaciones', component: SeleccionarPrestacionComponent },
  { path: 'turnos', component: TurnosComponent },
  { path: 'buscar', component: ScanPacienteComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'confirmar-telefono', component: ConfirmarTelefonoComponent },
  { path: 'publicidad', component: PublicidadComponent },

  { path: 'start', component: StartComponent },
  // dejar siempre al último porque no encuentra las url después de esta
  { path: '**', redirectTo: 'buscar' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
