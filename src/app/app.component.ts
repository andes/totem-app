
import { finalize } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Component, HostListener } from '@angular/core';
import { Plex } from '@andes/plex';
import { Server } from '@andes/shared';
import { Auth } from '@andes/auth';
import { ANDES_KEY } from '../../config.private';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { OrganizacionService } from './services/organizacion.service';
import { ConfiguracionService } from './services/configuracion/configuracionPantalla.service';
import { AuthService } from './services/auth.service';

// import { RxSocket } from 'rx-socket.io-client';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [
    `app.component.scss`
  ]
})

export class AppComponent {
  private initStatusCheck() {
    if (environment.APIStatusCheck) {
      setTimeout(() => {
        this.server.get('/core/status', { params: null, showError: false, showLoader: false }).pipe(
          finalize(() => this.initStatusCheck()))
          .subscribe(
            (data) => this.plex.updateAppStatus(data),
            (err) => this.plex.updateAppStatus({ API: 'Error' })
          );
      }, 100000);
    } else {
      this.plex.updateAppStatus({ API: 'OK' });
    }



  }
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(public plex: Plex, public server: Server, public pantallaService: ConfiguracionService, private auth: Auth, private router: Router, public authService: AuthService, ) {
    // Configura server. Debería hacerse desde un provider (http://stackoverflow.com/questions/39033835/angularjs2-preload-server-configuration-before-the-application-starts)
    server.setBaseURL(environment.API);
    window.sessionStorage.setItem('jwt', ANDES_KEY);

    // Inicializa el chequeo de conectividad
    this.initStatusCheck();
    this.pantallaService.detalle(this.authService.id).subscribe((pantalla) => {
      console.log(pantalla);
      if (pantalla) {
        this.userInactive.subscribe(() => this.router.navigate(['/buscar'], { queryParams: { textoTurno: false } }));
      } else {
        this.authService.setToken(null);
        this.router.navigate(['/start']);
      }
    }, (e) => {
      if (e.status === 401) {
        this.authService.setToken(null);
        this.router.navigate(['/start']);
      }
    });
    this.setTimeout();
    this.userInactive.subscribe(() => this.router.navigate(['/inicio'], { queryParams: { textoTurno: false } }));
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 60000);

  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
