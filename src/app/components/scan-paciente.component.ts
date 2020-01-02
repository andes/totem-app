import { Component, OnInit } from '@angular/core';
import { DocumentoEscaneados } from './documento-scaneado.const';
import { PacienteService } from '../services/paciente.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfiguracionService } from '../services/configuracion/configuracionPantalla.service';

@Component({
  selector: 'scan-paciente',
  templateUrl: 'scan-paciente.html',
  styleUrls: [`scan-paciente.scss`]
})
export class ScanPacienteComponent implements OnInit {
  public scan: string;
  public autoFocus = 0;
  private timeoutHandle;
  constructor(
    public auth: AuthService,
    private pacienteService: PacienteService,
    private router: Router,
    private pantallaService: ConfiguracionService
  ) { }

  ngOnInit() {
    this.pantallaService.detalle(this.auth.id).subscribe((pantalla) => {
      console.log(pantalla);
      if (pantalla) {
        this.pacienteService.clearPaciente();
        this.autoFocus++;
      } else {
        this.auth.setToken(null);
        this.router.navigate(['/start']);
      }
    }, (e) => {
      if (e.status === 401) {
        this.auth.setToken(null);
        this.router.navigate(['/start']);
      }
    });
  }

  focus() {
    this.autoFocus++;
  }

  onScan() {
    if (this.scan) {
      this.timeoutHandle = window.setTimeout(() => {

        this.timeoutHandle = null;
        let formatoDocumento;
        let re = /\"/gi;
        let re2 = /\-/gi;

        this.scan = this.scan.toString().replace(re, '@');
        this.scan = this.scan.replace(re2, '/');
        for (let key in DocumentoEscaneados) {
          if (DocumentoEscaneados[key].regEx.test(this.scan)) {
            formatoDocumento = DocumentoEscaneados[key];
          }
        }
        if (!formatoDocumento) {
          this.scan = '';
          return;
        }

        console.log(this.scan);
        let pacienteEscaneado = this.parseData(formatoDocumento);
        this.buscarPaciente(pacienteEscaneado);
      }, 300);
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


