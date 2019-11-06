import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PacienteService {
  private pacienteUrl = '/core/mpi/pacientes';  // URL to web api
  private pacienteCache = new BehaviorSubject<any>(null);
  constructor(private server: Server) { }

  /**
   * @param {PacienteSearch} params
   * @returns {Observable<IPacienteMatch[]>}
   * @memberof PacienteService
   */
  get(params: any): Observable<any[]> {
    return this.server.get(this.pacienteUrl, { params: params, showError: true });
  }

  setPaciente(paciente: any) {
    this.pacienteCache.next(paciente);
  }
  clearPaciente() {
    this.pacienteCache.next({});
  }

  getPacienteValor(): any {
    return this.pacienteCache.value;
  }


  save(paciente: any): Observable<any> {
    if (paciente.id) {
      return this.server.put(`${this.pacienteUrl}/${paciente.id}`, { 'paciente': paciente });
    } else {
      return this.server.post(this.pacienteUrl, { 'paciente': paciente });
    }
  }

  patch(id: String, cambios: any, options: any = {}): Observable<any> {
    return this.server.patch(`${this.pacienteUrl}/${id}`, cambios);
  }

  /**
   * Metodo getById. Trae un objeto paciente por su Id.
   * @param {String} id Busca por Id
   */
  getById(id: String): Observable<any> {
    return this.server.get(`${this.pacienteUrl}/${id}`, null);
  }
}
