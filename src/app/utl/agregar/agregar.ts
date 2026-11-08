import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlumnosUtl } from '../alumnos';
import { ProyectoapiService } from '../proyectoapi.service';
import { finalize } from 'rxjs';
 
@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-agregar',
 
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
 formGroup!: FormGroup;
 guardando = false;
 mensajeError = '';
 
regAlumno: AlumnosUtl = {
  matricula: 0,
  nombre: '',
  apaterno: '',
  amaterno: '',
  correo: ''
};
 
constructor(
  private fb: FormBuilder,
  public alumnosutl: ProyectoapiService,
  private router: Router
) {}
 
ngOnInit(): void {
  this.formGroup = this.initForm();
}
 
 
initForm(): FormGroup {
  return this.fb.group({
    matricula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    nombre: ['', Validators.required],
    apaterno: ['', Validators.required],
    amaterno: [''],
    correo: ['', [Validators.required, Validators.email]]
  });
}
 
onSubmit(): void {
  this.mensajeError = '';
  if (this.formGroup.invalid) {
    this.formGroup.markAllAsTouched();
    this.mensajeError = 'Revisa los campos obligatorios antes de registrar.';
    return;
  }
 
  const datos: AlumnosUtl = {
    ...this.formGroup.getRawValue(),
    matricula: Number(this.formGroup.getRawValue().matricula)
  };
 
  this.guardando = true;
  this.alumnosutl.agregarNuevoAlumno(datos).pipe(
    finalize(() => this.guardando = false)
  ).subscribe({
    next: (respuesta) => {
      if (!respuesta.exito) {
        this.mensajeError = respuesta.mensaje;
        return;
      }

      this.router.navigate(['/utl/alumnos']);
    },
    error: (error) => {
      console.error('Error al registrar alumno:', error);
 
      const mensaje =
        error.error?.mensaje ||
        error.error?.error ||
        error.message ||
        'Ocurrió un error al registrar el alumno';
 
      this.mensajeError = mensaje;
    }
  });
}
 
}
