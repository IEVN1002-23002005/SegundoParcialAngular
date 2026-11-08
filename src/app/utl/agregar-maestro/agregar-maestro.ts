import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { MaestroUtl } from '../maestros';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-maestro.html',
})
export class AgregarMaestroComponent {
  guardando = false;
  mensajeError = '';
  formulario;

  constructor(private fb: FormBuilder, private api: ProyectoapiService, private router: Router) {
    this.formulario = this.fb.group({
      id_maestro: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', Validators.required], apaterno: ['', Validators.required],
      amaterno: [''], correo: ['', [Validators.required, Validators.email]],
    });
  }

  guardar(): void {
    this.mensajeError = '';
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError = 'Completa ID maestro, nombre, apellido paterno y correo válido.';
      return;
    }
    const maestro: MaestroUtl = { ...this.formulario.getRawValue(), id_maestro: Number(this.formulario.value.id_maestro) } as MaestroUtl;
    this.guardando = true;
    this.api.agregarMaestro(maestro).pipe(finalize(() => this.guardando = false)).subscribe({
      next: (respuesta) => respuesta.exito ? this.router.navigate(['/utl/maestros']) : this.mensajeError = respuesta.mensaje,
      error: (error) => this.mensajeError = error.error?.mensaje ?? 'No fue posible registrar el maestro.',
    });
  }
}
