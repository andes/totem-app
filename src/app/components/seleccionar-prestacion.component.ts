import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { PacienteService } from '../services/paciente.service';

@Component({
  templateUrl: 'seleccionar-prestacion.html',
  styleUrls: [
    `seleccionar-prestacion.scss`
  ]


})
export class SeleccionarPrestacionComponent implements OnInit {
  public prestaciones = [];
  public paciente;
  public heading = {
    principal: `Seleccione una Prestación`,
    secundario: `Seleccione alguna de las prestaciones con turnos disponibles`
  };
  constructor(
    private router: Router,
    private agendasService: AgendasService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit() {
    this.paciente = this.pacienteService.getPacienteValor();
    if (!this.paciente) {
      this.router.navigate(['buscar']);
    }
    this.agendasService.getPrestaciones().subscribe(resultado => {
      this.prestaciones = resultado;
    });
  }

  selectPrestacion(prestacion) {
    this.router.navigate(['/turnos'], { queryParams: prestacion });
  }

  salir() {
    this.router.navigate(['confirmar-telefono']);
  }

}

