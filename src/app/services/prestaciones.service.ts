import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

@Injectable()
export class PrestacionesService {
    // URL to web api
    private prestacionesUrl = '/modules/turnos/prestacionesDisponibles';

    constructor(private server: Server) { }

    getPrestaciones(): Observable<any> {
        return this.server.get(this.prestacionesUrl);
    }
}
