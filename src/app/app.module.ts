import { AuthService } from './services/auth.service';
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
import { AgendasService } from './services/agendas.services';
import { TurnosComponent } from './components/turnos.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ProfesionalPipe } from './pipes/profesional.pipe';
import { TurnosService } from './services/turnos.service';
import { InicioComponent } from './components/inicio.component';
import { ScanPacienteComponent } from './components/scan-paciente.component';
import { PacienteService } from './services/paciente.service';
import { ConfirmarTelefonoComponent } from './components/confirmar-telefono.component';
import { SeleccionarPrestacionComponent } from './components/seleccionar-prestacion.component';
import { HeaderComponent } from './components/header.component';
import { PublicidadComponent } from './components/publicidad.component';
import { PrestacionPipe } from './pipes/prestacion.pipe';
import { ErrorComponent } from './components/error.component';
import { StartComponent } from './components/start/start.component';
import { ConfiguracionService } from './services/configuracion/configuracionPantalla.service';
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
    routing
  ],
  declarations: [
    AppComponent,
    TurnosComponent,
    InicioComponent,
    SeleccionarPrestacionComponent,
    HeaderComponent,
    PublicidadComponent,
    ProfesionalPipe,
    PrestacionPipe,
    ScanPacienteComponent,
    ConfirmarTelefonoComponent,
    ErrorComponent,
    StartComponent
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
    AgendasService,
    AuthService,
    ConfiguracionService,
    TurnosService,
    PacienteService
  ],
})
export class AppModule { }

