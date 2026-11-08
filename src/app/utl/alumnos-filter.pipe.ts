import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumnosFilter',
})
export class AlumnosFilterPipe implements PipeTransform {
  transform(value: any[], filtro: string = ''): any[] {
    if (!Array.isArray(value)) return [];

    const texto = filtro.trim().toLocaleLowerCase();
    if (!texto) return value;

    return value.filter((alumno) => {
      const contenido = [
        alumno.matricula,
        alumno.nombre,
        alumno.apaterno,
        alumno.amaterno,
        alumno.correo,
      ]
        .map((campo) => String(campo ?? '').toLocaleLowerCase())
        .join(' ');

      return contenido.includes(texto);
    });
  }
}
