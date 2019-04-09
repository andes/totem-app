import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import Keyboard from 'simple-keyboard';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

@Component({
    selector: 'confirmar-telefono',
    templateUrl: 'confirmar-telefono.html',
    styleUrls: ['confirmar-telefono.css']
})
export class ConfirmarTelefonoComponent implements OnInit {
    public paciente;
    public autoFocus = 0;
    public indiceTelefono;
    public telefono: string;
    constructor(
        private pacienteService: PacienteService,
        private router: Router,
        private plex: Plex
    ) { }

    ngOnInit() {
        this.autoFocus++;
        this.paciente = this.pacienteService.getPacienteValor();
        if (!this.paciente.contacto) {
            this.paciente.contacto = [];
        }
        if (this.paciente.contacto.length) {
            let index = this.paciente.contacto.findIndex(item => item.tipo === 'celular');
            if (index >= 0) {
                this.indiceTelefono = index;
                this.telefono = this.paciente.contacto[this.indiceTelefono].valor;
            }
        }
        let keyboard = new Keyboard({
            onChange: input => this.onChange(input),
            onKeyPress: button => this.onKeyPress(button),
            layout: {
                default: ['1 2 3', '4 5 6', '7 8 9', ' 0 ', '{bksp}'],
                shift: ['! / #', '$ % ^', '& * (', '{shift} ) +', '{bksp}']
            },
            theme: 'hg-theme-default hg-layout-numeric numeric-theme ',
            buttonTheme: [
                {
                    class: 'hg-red',
                    buttons: '1 2 3 4 5 6'
                }
            ],
            display: {
                '{bksp}': 'Borrar'
            }
        });

    }

    onChange(input) {
        this.telefono = input;
    }

    onKeyPress(button) {
    }

    salir() {
        this.router.navigate(['buscar']);
    }

    confirmar() {
        if (this.telefono.length === 10) {
            if (this.indiceTelefono) {
                this.paciente.contacto[this.indiceTelefono].valor = this.telefono;
            }
            this.paciente.contacto.push({
                'activo': true,
                'tipo': 'celular',
                'valor': this.telefono,
                'ranking': 0,
                'ultimaActualizacion': new Date()
            });
            this.router.navigate(['inicio']);
        } else {
            this.plex.info('info', 'Número de celular incorrecto', 'Atención');
        }
    }

}

