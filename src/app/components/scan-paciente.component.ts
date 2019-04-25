import { Component, OnInit } from '@angular/core';
import { DocumentoEscaneados } from './documento-scaneado.const';
import { PacienteService } from '../services/paciente.service';
import { Router } from '@angular/router';

@Component({
    selector: 'scan-paciente',
    templateUrl: 'scan-paciente.html',
    styleUrls: [`scan-paciente.scss`]
})
export class ScanPacienteComponent implements OnInit {
    public scan: string;
    public autoFocus = 0;
    constructor(
        private pacienteService: PacienteService,
        private router: Router
    ) { }

    ngOnInit() {
        this.pacienteService.clearPaciente();
        this.autoFocus++;
    }

    onScan() {
        if (this.scan) {
            let formatoDocumento;
            for (let key in DocumentoEscaneados) {
                if (DocumentoEscaneados[key].regEx.test(this.scan)) {
                    formatoDocumento = DocumentoEscaneados[key];
                }
            }
            if (!formatoDocumento) {
                this.scan = '';
                return;
                // TODO: DOCUMENTO INVÁLIDO, rechazar entrada y blanquear input
            }
            let pacienteEscaneado = this.parseData(formatoDocumento);
            this.buscarPaciente(pacienteEscaneado);
        }
    }

    private parseData(formatoDocumento: any) {
        let scanParseado = this.scan.match(formatoDocumento.regEx);
        let sexo: string;
        if (formatoDocumento.grupoSexo) {
            sexo = (scanParseado[formatoDocumento.grupoSexo].toUpperCase() === 'F') ? 'femenino' : 'masculino';
        }
        let fechaNacimiento;
        if (formatoDocumento.grupoFechaNacimiento) {
            fechaNacimiento = moment(scanParseado[formatoDocumento.grupoFechaNacimiento], 'DD/MM/YYY');
        }
        return {
            sexo,
            fechaNacimiento,
            documento: scanParseado[formatoDocumento.grupoNumeroDocumento].replace(/\D/g, ''),
            apellido: scanParseado[formatoDocumento.grupoApellido],
            nombre: scanParseado[formatoDocumento.grupoNombre],
            scan: this.scan,
            estado: 'validado',
            genero: sexo
        };
    }

    private buscarPaciente(pacienteEscaneado) {
        let queryObject = pacienteEscaneado;
        queryObject.type = 'simplequery';
        this.pacienteService.get(pacienteEscaneado).subscribe(
            resultado => {
                if (resultado && resultado.length) {
                    this.pacienteService.setPaciente(resultado[0]);
                    this.router.navigate(['confirmar-telefono']);
                } else {
                    delete pacienteEscaneado.type;
                    this.pacienteService.setPaciente(pacienteEscaneado);
                    this.router.navigate(['confirmar-telefono']);
                }
            },
            () => {

            });
    }
}

