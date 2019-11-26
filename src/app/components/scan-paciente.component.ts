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
  } private timeoutHandle: number;

  focus() {
    this.autoFocus++;
  }

  onScan(searchText: string) {
    if (this.timeoutHandle) {
      window.clearTimeout(this.timeoutHandle);
    }

    this.timeoutHandle = window.setTimeout(() => {

      this.timeoutHandle = null;
      let formatoDocumento;
      let re = /\"/gi;
      let re2 = /\-/gi;

      searchText = searchText.toString().replace(re, '@');
      searchText = searchText.replace(re2, '/');
      for (let key in DocumentoEscaneados) {
        if (DocumentoEscaneados[key].regEx.test(searchText)) {
          formatoDocumento = DocumentoEscaneados[key];
        }
      }
      if (!formatoDocumento) {
        searchText = '';
        return;
      }

      console.log(searchText);
      let pacienteEscaneado = this.parseData(formatoDocumento, searchText);
      this.buscarPaciente(pacienteEscaneado);
    }, 300);
  }

  private parseData(formatoDocumento: any, scanDocumento: string) {
    let scanParseado = scanDocumento.match(formatoDocumento.regEx);
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
      scan: scanDocumento,
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
          this.router.navigate(['error']);
        }
      },
      () => {

      });
  }
}
