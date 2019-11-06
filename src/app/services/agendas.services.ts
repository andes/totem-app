import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

@Injectable()
export class AgendasService {
  // URL to web api
  private agendasUrl = '/modules/turnos/';

  constructor(private server: Server) { }

  getAgendas(params): Observable<any> {
    return this.server.get(this.agendasUrl + '/obtenerDisponibles', { params: params });
  }

  getPrestaciones(): Observable<any> {
    return this.server.get(this.agendasUrl + '/obtenerPrestaciones');
  }
}
