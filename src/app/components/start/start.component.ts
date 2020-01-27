import { Plex } from '@andes/plex';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion/configuracionPantalla.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrls: ['./start.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartComponent implements OnInit {
  public codigo = '';

  constructor(
    public configScreen: ConfiguracionService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  ingresar() {
    this.configScreen.activate({ codigo: this.codigo, tipo: 'totem' }).subscribe((body: any) => {
      this.auth.setToken(body.token);
      this.router.navigate(['/inicio']);
    });
  }

}
