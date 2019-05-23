import { Component, OnInit, HostBinding } from '@angular/core';
import { PrestacionesService } from '../services/prestaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { PacienteService } from '../services/paciente.service';
import { TurnosService } from '../services/turnos.service';

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
    public loader = true;
    constructor(
        private prestacionesService: PrestacionesService,
        private router: Router,
        private agendasService: AgendasService,
        private pacienteService: PacienteService,
        private turnosService: TurnosService
    ) { }

    ngOnInit() {
        this.paciente = this.pacienteService.getPacienteValor();
        if (!this.paciente) {
            this.router.navigate(['buscar']);
        }
        this.prestacionesService.getPrestaciones().subscribe(resultado => {
            console.log('aca la prestaciones', resultado);
            // this.prestaciones = resultado;
            // console.log(this.prestaciones);
            this.turnosService.getHistorial({ pacienteId: this.paciente.id, turnosProximos: true }).subscribe(r => {
                console.log(r);
               let resumen =  r.filter(resMap => resMap.horaInicio >= new Date());
                console.log('consulta de resumen', resumen);
                this.loader = false;
               this.prestaciones =  resultado.filter(resp => resumen.findIndex(f => f.tipoPrestacion.conceptId === resp.conceptId) === -1);
               console.log('prestaciones filtradas', this.prestaciones);
            });
        });
    }

    selectPrestacion(prestacion) {
        this.router.navigate(['/turnos'], { queryParams: prestacion });
        this.agendasService.getAgendas({ prestacion: prestacion.conceptId }).subscribe(agendas => {
        });
    }

    salir() {
        this.router.navigate(['confirmar-telefono']);
    }

}

