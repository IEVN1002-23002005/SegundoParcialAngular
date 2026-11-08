import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { AlumnosUtl } from '../alumnos';
import { MaestroUtl } from '../maestros';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-eliminar',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {
  registro: Partial<AlumnosUtl & MaestroUtl> = {};
  identificador = '';
  esMaestro = false;
  cargando = true;
  eliminando = false;
  mensajeError = '';

  constructor(private route: ActivatedRoute, private api: ProyectoapiService, private router: Router) {}

  ngOnInit(): void {
    this.esMaestro = this.route.snapshot.routeConfig?.path?.startsWith('eliminar-maestro') ?? false;
    this.identificador = this.route.snapshot.paramMap.get(this.esMaestro ? 'id_maestro' : 'matricula') ?? '';
    const consulta: Observable<{ maestro?: MaestroUtl; alumno?: AlumnosUtl }> = this.esMaestro
      ? this.api.getMaestro(this.identificador) as Observable<{ maestro?: MaestroUtl; alumno?: AlumnosUtl }>
      : this.api.getAlumno(this.identificador) as Observable<{ maestro?: MaestroUtl; alumno?: AlumnosUtl }>;
    consulta.subscribe({
      next: (respuesta) => {
        this.registro = this.esMaestro ? respuesta.maestro : respuesta.alumno;
        this.cargando = false;
      },
      error: (error) => {
        this.mensajeError = error.error?.mensaje ?? 'No fue posible consultar el registro.';
        this.cargando = false;
      },
    });
  }

  eliminar(): void {
    if (!window.confirm(`¿Deseas eliminar este ${this.esMaestro ? 'maestro' : 'alumno'}?`)) return;
    this.eliminando = true;
    const peticion = this.esMaestro ? this.api.eliminaMaestro(this.identificador) : this.api.eliminaAlumno(this.identificador);
    peticion.pipe(finalize(() => this.eliminando = false)).subscribe({
      next: () => this.router.navigate([this.esMaestro ? '/utl/maestros' : '/utl/alumnos']),
      error: (error) => this.mensajeError = error.error?.mensaje ?? 'No fue posible eliminar el registro.',
    });
  }
}
