import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { Plex } from '@andes/plex';
import { TurnosService } from '../services/turnos.service';
import { PacienteService } from '../services/paciente.service';



@Component({
    templateUrl: 'turnos.html'
})
export class TurnosComponent implements OnInit {

    private prestacionSeleccionada;
    private agendas = [];
    private listadoTurnos = [];
    private paciente;
    constructor(
        private agendasService: AgendasService,
        private turnosService: TurnosService,
        private route: ActivatedRoute,
        private plex: Plex,
        private pacienteService: PacienteService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.paciente = this.pacienteService.getPacienteValor();
        if (!this.paciente) {
            this.router.navigate(['buscar']);
        }
        this.route.queryParams.subscribe(params => {
            this.prestacionSeleccionada = params;
            if (this.prestacionSeleccionada && this.prestacionSeleccionada.conceptId) {
                this.agendasService.getAgendas({ prestacion: this.prestacionSeleccionada.conceptId }).subscribe((agendas) => {
                    this.agendas = agendas;
                    this.listadoTurnos = this.parsearTurnos(agendas);
                }, (error) => {
                    this.plex.info('danger', error, 'Error');

                });
            }
        });
    }

    parsearTurnos(agendas) {
        let agendasParseadas = agendas.map(agenda => {
            let turnos = agenda.bloques.turnos.filter(turno => turno.estado === 'disponible');
            return {
                idAgenda: agenda._id,
                idBloque: agenda.bloques._id,
                turno: turnos[0],
                profesional: agenda.profesionales && agenda.profesionales.length > 0 ? agenda.profesionales[0] : null,
                prestacion: this.prestacionSeleccionada
            };
        });
        return agendasParseadas;
    }

    selectTurno(turno) {
        if (!this.paciente) {
            this.plex.info('danger', 'Paciente no encontrado', 'Error');
        }
        this.turnosService.save(turno, this.paciente, { showError: false }).subscribe((resultado) => {
            this.plex.info('success', 'El turno se asignó correctamente');
            this.router.navigate(['buscar']);
        }, (error) => {
            this.plex.info('danger', 'Turno no asignado', 'Error');
            this.router.navigate(['buscar']);
        });
    }
}


