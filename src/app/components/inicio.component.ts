import { Component, OnInit, HostBinding } from '@angular/core';
import { PrestacionesService } from '../services/prestaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    templateUrl: 'inicio.html'
})
export class InicioComponent implements OnInit {
    public prestaciones = [];
    constructor(
        private prestacionesService: PrestacionesService,
        private router: Router,

    ) { }

    ngOnInit() {
        this.prestacionesService.getPrestaciones().subscribe(resultado => {
            this.prestaciones = resultado;
        });
    }

    selectPrestacion(prestacion) {
        this.router.navigate(['/turnos'], { queryParams: prestacion });
    }

}

