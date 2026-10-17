import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { IRegistroCinepolis } from "../registro-cinepolis";

@Component({
  selector: "app-ver-registros",
  imports: [CommonModule, FormsModule],
  templateUrl: "./ver-registros.html",
  styleUrl: "./ver-registros.css",
})
export class VerRegistros implements OnInit {
  registros: IRegistroCinepolis[] = [];
  registroEditando: IRegistroCinepolis | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    this.registros = JSON.parse(
      localStorage.getItem("registrosCinepolis") ?? "[]"
    );
  }

  editar(registro: IRegistroCinepolis): void {
    this.registroEditando = { ...registro };
  }

  guardarEdicion(): void {
    if (!this.registroEditando) return;

    const indice = this.registros.findIndex(
      (registro) => registro.id === this.registroEditando!.id
    );
    if (indice !== -1) {
      this.registros[indice] = { ...this.registroEditando };
      this.guardarEnLocalStorage();
    }
    this.cancelarEdicion();
  }

  eliminar(id: string): void {
    this.registros = this.registros.filter((registro) => registro.id !== id);
    this.guardarEnLocalStorage();
  }

  cancelarEdicion(): void {
    this.registroEditando = null;
  }

  volver(): void {
    this.router.navigate(["/escuela/cinepolis"]);
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem("registrosCinepolis", JSON.stringify(this.registros));
  }
}
