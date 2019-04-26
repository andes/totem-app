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
        'confirmar-telefono.scss']
})
export class ConfirmarTelefonoComponent implements OnInit {
    public heading = {
        principal: `Ingrese su número de teléfono`,
        secundario: `Ingresá el código de tu área sin el "0" y tu número sin el "15"`
    };

    public paciente;
    public autoFocus = 0;
    public indiceTelefono;
    public telefono = '';
    public caracteristica = '';
    public disableInput = true;
    public telefonoExistente = false;
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
            return;
        }
        if (this.paciente.id) {
            this.pacienteService.getById(this.paciente.id).subscribe(result => {
                this.paciente = result;
                this.loadConfirmar();

            });
        } else {
            this.disableInput = false;
            this.loadConfirmar();
        }
        this.loadKeyboard();
    }

    loadConfirmar() {
        if (!this.paciente.contacto) {
            this.paciente.contacto = [];
        }
        if (this.paciente.contacto.length) {
            let index = this.paciente.contacto.findIndex(item => item.tipo === 'celular');
            if (index >= 0) {
                this.indiceTelefono = index;
                this.telefono = this.paciente.contacto[this.indiceTelefono].valor;
                this.telefonoExistente = true;
            } else {
                this.disableInput = false;
            }
        }
    }

    loadKeyboard() {
        let keyboard = new Keyboard({
            onChange: input => this.onChange(input),
            onKeyPress: button => this.onKeyPress(button),
            layout: {
                default: ['{bksp}', '1 2 3', '4 5 6', '7 8 9', ' 0 '],
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

    corregir() {
        this.disableInput = false;
        this.telefonoExistente = false;
        this.telefono = '';
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
                if (this.indiceTelefono > -1) {
                    this.paciente.contacto[this.indiceTelefono].valor = this.telefono;
                } else {
                    this.paciente.contacto.push({
                        'activo': true,
                        'tipo': 'celular',
                        'valor': this.telefono,
                        'ranking': 0,
                        'ultimaActualizacion': new Date()
                    });
                }
                this.pacienteService.save(this.paciente).subscribe(resultado => {
                    this.router.navigate(['prestaciones']);
                });

            } else {
                this.plex.info('info', 'Número de celular incorrecto', 'Atención');
            }
        }

    }

    getTelefono() {
        if (this.telefono.length > 2 && this.telefono.substring(0, 2) === '11') {
            return this.telefono.substring(2, this.telefono.length);

        }
        if (this.telefono.length > 3) {
            return this.telefono.substring(3, this.telefono.length);
        }
        return null;
    }

    getCaracteristica() {
        if (this.telefono.length) {
            if (this.telefono.substring(0, 2) === '11') {
                return this.telefono.substring(0, 2);
            } else {
                return this.telefono.substring(0, 3);
            }
        }
    }

}

