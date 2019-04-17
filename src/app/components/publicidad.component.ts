import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendasService } from '../services/agendas.services';
import { Plex } from '@andes/plex';
import { TurnosService } from '../services/turnos.service';
import { PacienteService } from '../services/paciente.service';
import { Location } from '@angular/common';



@Component({
    selector: 'publicidad-component',
    templateUrl: 'publicidad.html',
    styleUrls: ['publicidad.css']
})
export class PublicidadComponent implements OnInit {

    private prestacionSeleccionada;
    private agendas = [];
    private listadoTurnos = [];
    private paciente;
    public mensajeSuccess = true;
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

        this.route.queryParams.subscribe(params => {
            if (params.textoTurno === 'false') {
                this.mensajeSuccess = false;
            } else {
                this.mensajeSuccess = true;
                setTimeout(() => {
                    this.router.navigate(['buscar']);

                }, 4000);
            }
        });

    }




    salir() {
        this.router.navigate(['buscar']);

    }

}


