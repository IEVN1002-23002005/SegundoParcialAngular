import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../proyectoapi.service';

// 1. Agregamos la "s" aquí: AlumnosFilterPipe
import { AlumnosFilterPipe } from '../alumnos-filter.pipe'; 
import { AlumnosUtl } from '../alumnos';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  // 2. Agregamos la "s" aquí también
  imports: [FormsModule, RouterLink, AlumnosFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
})
export default class AlumnosComponent implements OnInit {
  listFilter: string = '';
  cargando = true;
  errorCarga = '';

  constructor(public alumnosUtl: ProyectoapiService) {}

  alumnosIric: AlumnosUtl[] = [];

  ngOnInit(): void {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnosIric = alumnos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('No se pudieron cargar los alumnos desde Flask:', error);
        this.alumnosIric = [];
        this.errorCarga = 'No fue posible obtener los alumnos de IntroFlask.';
        this.cargando = false;
      }
    });
  }
}
