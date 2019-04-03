import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { Plex } from '@andes/plex';



@Component({
    templateUrl: 'turnos.html'
})
export class TurnosComponent implements OnInit {

    private prestacionSeleccionada;
    private agendas = [];
    private listadoTurnos = [];
    constructor(
        private agendasService: AgendasService,
        private route: ActivatedRoute,
        private plex: Plex) { }

    ngOnInit() {
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
                profesional: agenda.profesionales && agenda.profesionales.length > 0 ? agenda.profesionales[0] : null
            };
        });
        return agendasParseadas;
    }

    selectTurno(turno) {
    }
}


