import { Component } from '@angular/core';

@Component({
  selector: 'app-zodiaco',
  imports: [],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css',
})
export class Zodiaco {

  nombre: string = '';
  apellidoP: string = '';
  apellidoM: string = '';

  anio: number = 0;
  mes: number = 0;
  dia: number = 0;

  sexo: string = '';

  edad: number = 0;
  signo: string = '';
  animal: string = '';

  mostrarResultado: boolean = false;

  imprimir(
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    anio: string,
    mes: string,
    dia: string,
    sexo: string,
  ) {
    this.nombre = nombre;
    this.apellidoP = apellidoP;
    this.apellidoM = apellidoM;
    this.anio = Number(anio);
    this.mes = Number(mes);
    this.dia = Number(dia);
    this.sexo = sexo;

    let fechaActual = new Date();

    
    this.edad = fechaActual.getFullYear() - this.anio;

    if (
      fechaActual.getMonth() + 1 < this.mes ||
      (fechaActual.getMonth() + 1 == this.mes &&
        fechaActual.getDate() < this.dia)
    ) {
      this.edad--;
    }

  
    if (
      (this.mes == 3 && this.dia >= 21) ||
      (this.mes == 4 && this.dia <= 19)
    ) {
      this.signo = 'Aries';

    } else if (
      (this.mes == 4 && this.dia >= 20) ||
      (this.mes == 5 && this.dia <= 20)
    ) {
      this.signo = 'Tauro';

    } else if (
      (this.mes == 5 && this.dia >= 21) ||
      (this.mes == 6 && this.dia <= 20)
    ) {
      this.signo = 'Géminis';

    } else if (
      (this.mes == 6 && this.dia >= 21) ||
      (this.mes == 7 && this.dia <= 22)
    ) {
      this.signo = 'Cáncer';

    } else if (
      (this.mes == 7 && this.dia >= 23) ||
      (this.mes == 8 && this.dia <= 22)
    ) {
      this.signo = 'Leo';

    } else if (
      (this.mes == 8 && this.dia >= 23) ||
      (this.mes == 9 && this.dia <= 22)
    ) {
      this.signo = 'Virgo';

    } else if (
      (this.mes == 9 && this.dia >= 23) ||
      (this.mes == 10 && this.dia <= 22)
    ) {
      this.signo = 'Libra';

    } else if (
      (this.mes == 10 && this.dia >= 23) ||
      (this.mes == 11 && this.dia <= 21)
    ) {
      this.signo = 'Escorpio';

    } else if (
      (this.mes == 11 && this.dia >= 22) ||
      (this.mes == 12 && this.dia <= 21)
    ) {
      this.signo = 'Sagitario';

    } else if (
      (this.mes == 12 && this.dia >= 22) ||
      (this.mes == 1 && this.dia <= 19)
    ) {
      this.signo = 'Capricornio';

    } else if (
      (this.mes == 1 && this.dia >= 20) ||
      (this.mes == 2 && this.dia <= 18)
    ) {
      this.signo = 'Acuario';

    } else {
      this.signo = 'Piscis';
    }

    

    let animales = [
      'Rata',
      'Buey',
      'Tigre',
      'Conejo',
      'Dragón',
      'Serpiente',
      'Caballo',
      'Cabra',
      'Mono',
      'Gallo',
      'Perro',
      'Cerdo'
    ];

    this.animal = animales[(this.anio - 4) % 12];

  
    this.mostrarResultado = true;
  }
} 
