import { Component, OnInit, HostBinding } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    templateUrl: 'inicio.html',
    // styleUrls: ['inicio.scss']
})
export class InicioComponent implements OnInit {
    @HostBinding('class.plex-layout') layout = true;

    constructor( public appComponent: AppComponent) { }

    ngOnInit() {
        debugger;
    }

}
