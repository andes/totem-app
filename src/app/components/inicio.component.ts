import { Component, OnInit, HostBinding } from '@angular/core';
import { PrestacionesService } from '../services/prestaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { PacienteService } from '../services/paciente.service';

@Component({
    templateUrl: 'inicio.html'
})
export class SeleccionarPrestacionComponent implements OnInit {
    public prestaciones = [];
    public paciente;
    constructor(
        private prestacionesService: PrestacionesService,
        private router: Router,
        private agendasService: AgendasService,
        private pacienteService: PacienteService
    ) { }

    ngOnInit() {
        this.paciente = this.pacienteService.getPacienteValor();
        this.prestacionesService.getPrestaciones().subscribe(resultado => {
            this.prestaciones = resultado;
        });
    }

    selectPrestacion(prestacion) {
        this.router.navigate(['/turnos'], { queryParams: prestacion });
        console.log(prestacion);
        this.agendasService.getAgendas({ prestacion: prestacion.conceptId }).subscribe(agendas => {
        });
    }

}

