import { Component, OnInit, HostBinding } from '@angular/core';
import { PrestacionesService } from '../services/prestaciones.service';
import { AgendasService } from '../services/agendas.services';

@Component({
    templateUrl: 'inicio.html',
    // styleUrls: ['inicio.scss']
})
export class InicioComponent implements OnInit {
    public prestaciones = [];
    constructor(
        private prestacionesService: PrestacionesService,
        private agendasService: AgendasService
    ) { }

    ngOnInit() {
        this.prestacionesService.getPrestaciones().subscribe(resultado => {
            console.log('Resultado:  ', resultado);
            this.prestaciones = resultado;
        });
    }

    selectPrestacion(prestacion) {
        console.log(prestacion);
        this.agendasService.getAgendas({ prestacion: prestacion.conceptId }).subscribe(agendas => {
            console.log("AGENDAS---->", agendas);
        })
    }

}
