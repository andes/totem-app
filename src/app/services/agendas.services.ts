import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

@Injectable()
export class AgendasService {
    // URL to web api
    private agendasUrl = '/modules/turnos/agendasDisponibles';
    private agendasUrlImprimir = '/modules/turnos/pruebaImprimir';

    constructor(private server: Server) { }

    getAgendas(params): Observable<any> {
        return this.server.get(this.agendasUrl, { params: params });
    }

    getImpresion(params): Observable<any> {
        return this.server.get(this.agendasUrlImprimir, { params: params });
    }
}
