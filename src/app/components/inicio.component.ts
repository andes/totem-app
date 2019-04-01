import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    templateUrl: 'inicio.html',
    // styleUrls: ['inicio.scss']
})
export class InicioComponent implements OnInit {

    constructor( public appComponent: AppComponent) { }

    ngOnInit(){
    }

}
