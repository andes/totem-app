import { Server, Cache } from '@andes/shared';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class OrganizacionService {
  private organizacionUrl = '/core/tm/organizaciones';  // URL to web api
  private organizacionCache = new BehaviorSubject<any>(null);
  constructor(public server: Server) { }

  /**
   * Metodo get. Trae el objeto organizacion.
   * @param {any} params Opciones de busqueda
   */
  get(params: any): Observable<any[]> {
    return this.server.get(this.organizacionUrl, { params: params, showError: true });
  }

  /**
   * Metodo getById. Trae el objeto organizacion por su Id.
   * @param {String} id Busca por Id
   */
  getById(id: String): Observable<any> {
    return this.server.get(this.organizacionUrl + '/' + id, null);
  }

  setOrganizacion(organizacion: any) {
    this.organizacionCache.next(organizacion);
  }
  clearOrganizacion() {
    this.organizacionCache.next({});
  }

  getOrganizacionValor(): any {
    return this.organizacionCache.value;
  }

}
