import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { PlexModule } from '@andes/plex';
import { Plex } from '@andes/plex';
import { Server } from '@andes/shared';
import { routing, appRoutingProviders } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthModule } from '@andes/auth';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChartsModule } from 'ng2-charts';
import { PrestacionesService } from './services/prestaciones.service';
import { AgendasService } from './services/agendas.services';

import { TurnosComponent } from './components/turnos.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ProfesionalPipe } from './pipes/profesional.pipe';
import { TurnosService } from './services/turnos.service';
import { ScanPacienteComponent } from './components/scan-paciente.component';
import { PacienteService } from './services/paciente.service';
import { ConfirmarTelefonoComponent } from './components/confirmar-telefono.component';
import { SeleccionarPrestacionComponent } from './components/seleccionar-prestacion.component';
registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    PlexModule,
    AuthModule,
    ScrollingModule,
    ChartsModule,
    routing,
  ],
  declarations: [
    AppComponent,
    TurnosComponent,
    SeleccionarPrestacionComponent,
    ProfesionalPipe,
    ScanPacienteComponent,
    ConfirmarTelefonoComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-AR'
    },
    Plex,
    Server,
    appRoutingProviders,
    PrestacionesService,
    AgendasService,
    TurnosService,
    PacienteService
  ],
})
export class AppModule { }

