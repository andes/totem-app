import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { Plex } from '@andes/plex';
import { TurnosService } from '../services/turnos.service';
import { PacienteService } from '../services/paciente.service';
import * as moment from 'moment';


@Component({
    templateUrl: 'turnos.html',
    styleUrls: ['turno.css']
})
export class TurnosComponent implements OnInit {

    public prestacionSeleccionada;
    private agendas = [];
    private listadoTurnos = [];
    private paciente;
    public confirmarTurno = false;
    public turnoSeleccionado;
    public disabled = false;
    public diaString = '';
    private dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

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
            let turnos = agenda.bloques.turnos.filter(turno => turno.estado === 'disponible' && turno.horaInicio >= new Date());
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
        let numDia = turno.turno.horaInicio.getDay();
        let diferenciaDias = moment(turno.turno.horaInicio).diff(moment().startOf('day'), 'days');
        this.diaString = (diferenciaDias === 0) ? 'Hoy' : (diferenciaDias === 1) ? 'Mañana' : this.dias[numDia];
        this.turnoSeleccionado = turno;
        if (!this.paciente) {
            this.plex.info('danger', 'Paciente no encontrado', 'Error');
        }

    }

    guardar() {
        this.disabled = true;
        this.turnosService.save(this.turnoSeleccionado, this.paciente, { showError: false }).subscribe((resultado) => {
            this.router.navigate(['/publicidad'], { queryParams: { textoTurno: true } });
        }, (error) => {
            this.router.navigate(['buscar']);
        });
    }

    salir() {
        this.disabled = true;
        this.router.navigate(['buscar']);
    }

    corregir() {
        this.turnoSeleccionado = null;
    }
}


