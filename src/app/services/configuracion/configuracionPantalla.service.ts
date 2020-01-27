import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfiguracionService {

    private activationURL = environment.API + '/modules/turnero/pantalla';
    constructor(private http: HttpClient, private auth: AuthService) { }

    activate(params: any) {
        return this.http.post(`${this.activationURL}/activate`, params);
    }

    detalle(id): any {
        return this.http.get(`${this.activationURL}/${id}`, {
            headers: {
                Authorization: `JWT ${this.auth.token}`
            }
        });
    }
}
