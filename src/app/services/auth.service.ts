import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  public token = '';
  public id: String;

  constructor() {
    this.token = localStorage.getItem('token');
    this.setToken(this.token);
  }

  setToken(value) {
    localStorage.setItem('token', value);
    this.token = value;
    try {
      // Guarda el token para futura referencia
      window.sessionStorage.setItem('jwt', this.token);
      // Obtiene datos del usuario y permisos desde el token
      const payload = this.jwtHelper.decodeToken(this.token);
      this.id = payload.app.id;
    } catch (e) {

    }
  }

  getToken() {
    return this.token;
  }

}
