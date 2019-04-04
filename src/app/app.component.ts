
import { finalize } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { Plex } from '@andes/plex';
import { Server } from '@andes/shared';
import { Auth } from '@andes/auth';
import { ANDES_KEY } from '../config.private';

// import { RxSocket } from 'rx-socket.io-client';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
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

  constructor(public plex: Plex, public server: Server, private auth: Auth) {
    // Configura server. Debería hacerse desde un provider (http://stackoverflow.com/questions/39033835/angularjs2-preload-server-configuration-before-the-application-starts)
    server.setBaseURL(environment.API);
    window.sessionStorage.setItem('jwt', ANDES_KEY);

    // Inicializa la vista
    this.plex.updateTitle('ANDES | Apps Neuquinas de Salud');

    // Inicializa el chequeo de conectividad
    this.initStatusCheck();
  }


}
