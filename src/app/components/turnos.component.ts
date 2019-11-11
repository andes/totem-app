import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { Plex } from '@andes/plex';
import { TurnosService } from '../services/turnos.service';
import { PacienteService } from '../services/paciente.service';
@Component({
  templateUrl: 'turnos.html',
  styleUrls: ['turno.scss']
})
export class TurnosComponent implements OnInit {

  public heading = {
    principal: `Seleccione un día y horario`,
    secundario: `Horarios disponibles para la `
  };
  private paciente;
  public prestacionSeleccionada;
  public agendas = [];
  public tieneTurnos;
  public turnoAsignado;
  public listadoTurnos = [];
  public confirmarTurno = false;
  public turnoSeleccionado;
  public disabled = false;
  public diaString = '';
  private dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  scrolled = false;
  @ViewChild('inicioTurnos')
  inicioTurnosRef: ElementRef;
  @ViewChild('finTurnos')
  finTurnosRef: ElementRef;

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
        this.heading.secundario += ` <b>${this.prestacionSeleccionada.term}</b>`;
        this.turnosService.getProximos({ turnosProximos: true, pacienteId: this.paciente.id, conceptId: this.prestacionSeleccionada.conceptId, organizacion: true }).subscribe(turnos => {
          this.turnoAsignado = turnos[0];
          this.tieneTurnos = (turnos[0].length > 0);
          console.log(this.turnoAsignado);
          if (!this.tieneTurnos) {
            this.agendasService.getAgendas({ prestacion: this.prestacionSeleccionada.conceptId }).subscribe((agendas) => {
              this.agendas = agendas;
              this.listadoTurnos = this.parsearTurnos(agendas);
            }, (error) => {
              this.plex.info('danger', error, 'Error');
            });
          }
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

    this.heading = {
      principal: 'Confirmar Turno',
      secundario: '¡No olvides anotar los datos de tu Turno!'
    };

    if (!this.paciente) {
      this.plex.info('danger', 'Paciente no encontrado', 'Error');
    }

  }

  horaInicio(horaInicio) {
    return moment(horaInicio);
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

  scrollTop() {
    this.inicioTurnosRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.scrolled = false;
  }
  scrollDown() {
    this.finTurnosRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.scrolled = true;
  }
}


