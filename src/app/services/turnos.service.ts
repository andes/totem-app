import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { ANDES_KEY } from '../../config.private';


@Injectable()
export class TurnosService {
    // URL to web api
    private turnosUrl = '/modules/turnos';

    constructor(private server: Server) { }

    save(turno: any, paciente:any, options: any = {}): Observable<any> {
       
        // Datos del Turno
        let datosTurno = {
            idAgenda: turno.idAgenda,
            idTurno: turno.turno._id,
            idBloque: turno.idBloque,
            paciente,
            tipoPrestacion: turno.prestacion,
            tipoTurno: 'programado',
            emitidoPor: 'totem',
            nota: 'Turno pedido desde totem',
            motivoConsulta: ''
        };

        if (turno.idAgenda) {
            return this.server.patch(this.turnosUrl + '/turno/' + turno.turno._id + '/bloque/' + turno.idBloque + '/agenda/' + turno.idAgenda, datosTurno, options);
        }
    }

}

