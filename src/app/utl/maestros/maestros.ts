import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaestroUtl } from '../maestros';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './maestros.html',
})
export class MaestrosComponent implements OnInit {
  maestros: MaestroUtl[] = [];
  filtro = '';
  cargando = true;
  error = '';

  constructor(private api: ProyectoapiService) {}

  ngOnInit(): void {
    this.api.getMaestros().subscribe({
      next: (maestros) => { this.maestros = maestros; this.cargando = false; },
      error: (error) => {
        console.error('Error al consultar maestros:', error);
        this.error = 'No fue posible cargar los maestros desde IntroFlask.';
        this.cargando = false;
      },
    });
  }

  get maestrosFiltrados(): MaestroUtl[] {
    const texto = this.filtro.trim().toLowerCase();
    if (!texto) return this.maestros;
    return this.maestros.filter((maestro) =>
      [maestro.id_maestro, maestro.nombre, maestro.apaterno, maestro.amaterno, maestro.correo]
        .join(' ').toLowerCase().includes(texto)
    );
  }
}
