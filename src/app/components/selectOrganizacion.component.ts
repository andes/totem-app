import { OrganizacionService } from './../services/organizacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({

  templateUrl: 'selectOrganizacion.html',
  styleUrls: ['selectOrganizacion.scss']
})
export class SelectOrganizacionComponent implements OnInit {
  public organizaciones = null;
  public organizacionElegida;
  constructor(
    private router: Router,
    public organizacionService: OrganizacionService
  ) { }

  ngOnInit() {
    this.organizacionService.get({ turnosMobile: true }).subscribe(resultado => {
      this.organizaciones = resultado;
      if (this.organizaciones.length === 1) {
        this.seleccionar(this.organizaciones[0]);
      }
    });
  }

  seleccionar(organizacion) {
    this.organizacionService.setOrganizacion(organizacion);
    this.router.navigate(['buscar']);
  }

}
