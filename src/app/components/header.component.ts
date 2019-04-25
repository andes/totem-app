import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { Plex } from '@andes/plex';
import { TurnosService } from '../services/turnos.service';
import { PacienteService } from '../services/paciente.service';
import { Location } from '@angular/common';


@Component({
    selector: 'header-component',
    templateUrl: 'header.html',
    styleUrls: ['header.scss']
})
export class HeaderComponent implements OnInit {
    @Input() heading: any = {
        principal: '',
        secundario: '',
    };
    public prestacionSeleccionada;
    public agendas = [];
    public listadoTurnos = [];
    public paciente;
    public fecha = moment().format('LLL') + ' hs';
    documento: any;
    constructor(
        private agendasService: AgendasService,
        private turnosService: TurnosService,
        private route: ActivatedRoute,
        private plex: Plex,
        private location: Location,
        private pacienteService: PacienteService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.paciente = this.pacienteService.getPacienteValor();
        this.documento = this.paciente.documento.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');;
    }


    volver() {
        this.location.back();
    }

}


