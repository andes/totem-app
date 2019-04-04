import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { ANDES_KEY } from '../../config.private';


@Injectable()
export class TurnosService {
    // URL to web api
    private turnosUrl = '/modules/turnos';

    constructor(private server: Server) { }

    save(turno: any, options: any = {}): Observable<any> {
        const pacienteHardcodeado = {
            'id': '586e6e8c27d3107fde139627',
            'documento': '45979360',
            'apellido': 'LAVA',
            'nombre': 'LOLA',
            'fechaNacimiento': '2004-06-17T00:00:00.000-03:00',
            'sexo': 'femenino',
            'telefono': '2991111111',
            'carpetaEfectores': [
                {
                    'organizacion': {
                        '_id': '57e9670e52df311059bc8964',
                        'nombre': 'HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON'
                    },
                    'nroCarpeta': 'PDR45979360'
                }
            ],
            'obraSocial': {
                'codigoPuco': 921001,
                'nombre': 'O.S.P. NEUQUEN',
                'financiador': 'O.S.P. NEUQUEN'
            }
        };
        // Datos del Turno
        let datosTurno = {
            idAgenda: turno.idAgenda,
            idTurno: turno.turno._id,
            idBloque: turno.idBloque,
            paciente: pacienteHardcodeado,
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

