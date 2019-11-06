import { AgendasService } from './../services/agendas.services';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'inicio',
  templateUrl: 'inicio.html'
})

export class InicioComponent implements OnInit {
  public prestaciones = [];
  public paciente;
  constructor(
    private agendaService: AgendasService,
    private router: Router,
    private agendasService: AgendasService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit() {
    this.paciente = this.pacienteService.getPacienteValor();
    this.agendaService.getPrestaciones().subscribe(resultado => {
      this.prestaciones = resultado;
    });
  }

  selectPrestacion(prestacion) {
    this.router.navigate(['/turnos'], { queryParams: prestacion });
    this.agendasService.getAgendas({ prestacion: prestacion.conceptId }).subscribe(agendas => {
    });
  }

}

