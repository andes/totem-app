import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PacienteService {
    private urlBusquedaDocumento = '/core/mpi/pacientes/buscarDocumento';  // URL to web api
    private pacienteUrl = '/core/mpi/pacientes';  // URL to web api
    private pacienteCache = new BehaviorSubject<any>(null);
    constructor(private server: Server) { }

    /**
     * @param {PacienteSearch} params
     * @returns {Observable<IPacienteMatch[]>}
     * @memberof PacienteService
     */
    getScanMatch(params: any): Observable<any[]> {
        return this.server.get(this.urlBusquedaDocumento, { params: params, showError: true }).map((value) => {
            // return value.map((i) => ({ paciente: i, id: i.id, match: 100 }));
            return value;

        });
    }

    setPaciente(paciente: any) {
        this.pacienteCache.next(paciente);
    }

    getPacienteValor(): any {
        return this.pacienteCache.value;
    }

    save(paciente: any): Observable<any> {
        if (paciente.id) {
            return this.server.put(`${this.pacienteUrl}/${paciente.id}`, paciente);
        } else {
            return this.server.post(this.pacienteUrl, paciente);
        }
    }


    patch(id: String, cambios: any, options: any = {}): Observable<any> {
        return this.server.patch(`${this.pacienteUrl}/${id}`, cambios);
    }

}
