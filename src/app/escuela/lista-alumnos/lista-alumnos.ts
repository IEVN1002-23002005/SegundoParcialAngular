import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IAlumno } from "../alumnos";

@Component({ selector: "app-lista-alumnos", imports: [CommonModule, ReactiveFormsModule], styleUrl: "./lista-alumnos.css", templateUrl: "./lista-alumnos.html" })
export class ListaAlumnos implements OnInit {
  formulario = new FormGroup({
    matricula: new FormControl("", { nonNullable: true, validators: Validators.required }),
    nombre: new FormControl("", { nonNullable: true, validators: Validators.required }),
    correo: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
    materia: new FormControl("", { nonNullable: true, validators: Validators.required }),
  });
  alumnos: IAlumno[] = [];
  indiceEdicion = -1;
  ngOnInit(): void { this.cargarAlumnos(); }
  agregarAlumno(): void {
    if (this.formulario.invalid) { this.formulario.markAllAsTouched(); alert("Todos los campos son obligatorios y el correo debe ser válido"); return; }
    const alumno: IAlumno = this.formulario.getRawValue();
    if (this.indiceEdicion !== -1) this.alumnos[this.indiceEdicion] = alumno; else this.alumnos.push(alumno);
    localStorage.setItem("alumnos", JSON.stringify(this.alumnos)); this.limpiarCampos();
  }
  cargarAlumnos(): void { const datos = localStorage.getItem("alumnos"); if (datos) this.alumnos = JSON.parse(datos); }
  editarAlumnos(index: number): void { this.formulario.setValue(this.alumnos[index]); this.indiceEdicion = index; }
  eliminarAlumno(index: number): void { this.alumnos.splice(index, 1); localStorage.setItem("alumnos", JSON.stringify(this.alumnos)); }
  limpiarCampos(): void { this.formulario.reset(); this.indiceEdicion = -1; }
}
