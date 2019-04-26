import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prestacion' })
export class PrestacionPipe implements PipeTransform {
    transform(value: any, args?: string[]): any {
        if (value) {
            let term = value.term.toLocaleLowerCase();
            let consulta = term.substring(0, 'consulta de'.length);
            let prestacion = term.substring('consulta de'.length);
            if (consulta === 'consulta de') {
                return `${consulta} <b class="seleccion">${prestacion}</b>`;
            } else {
                return `<b class="seleccion">${value.term}</b>`;
            }
        }
    }
}
