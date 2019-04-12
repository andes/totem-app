import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import Keyboard from 'simple-keyboard';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

@Component({
    selector: 'confirmar-telefono',
    templateUrl: 'confirmar-telefono.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../../../node_modules/simple-keyboard/build/css/index.css',
        'confirmar-telefono.css']
})
export class ConfirmarTelefonoComponent implements OnInit {
    public paciente;
    public autoFocus = 0;
    public indiceTelefono;
    public telefono = '';
    constructor(
        private pacienteService: PacienteService,
        private router: Router,
        private plex: Plex
    ) { }

    ngOnInit() {
        this.autoFocus++;
        this.paciente = this.pacienteService.getPacienteValor();
        if (!this.paciente) {
            this.router.navigate(['buscar']);
        }
        if (!this.paciente.contacto) {
            this.paciente.contacto = [];
        }
        if (this.paciente.contacto.length) {
            let index = this.paciente.contacto.findIndex(item => item.tipo === 'celular');
            if (index >= 0) {
                this.indiceTelefono = index;
                this.telefono = this.paciente.contacto[this.indiceTelefono].valor;
                // this.onChange( this.telefono);
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
        keyboard.setInput(this.telefono);

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
        if (this.telefono.length === 0) {
            this.plex.info('info', 'Debe ingresar su número de celular', 'Atención');
        } else {
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
                let cambios = {
                    'op': 'updateContactos',
                    'contacto': this.paciente.contacto
                };

                this.pacienteService.patch(this.paciente.id, cambios).subscribe(resultado => {
                    this.router.navigate(['prestaciones']);

                });

            } else {
                this.plex.info('info', 'Número de celular incorrecto', 'Atención');
            }
        }

    }

}
