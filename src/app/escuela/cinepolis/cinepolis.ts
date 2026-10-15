import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { IRegistroCinepolis } from "../registro-cinepolis";

@Component({
  selector: "app-cinepolis",
  imports: [FormsModule],
  templateUrl: "./cinepolis.html",
  //styleUrl: "./cinepolis.css",
})
export class Cinepolis {
  nombre = "";
  compradores: number | null = null;
  boletos: number | null = null;
  tarjetaCineco = false;

  total: number | null = null;
  mensaje = "";

  constructor(private router: Router) {}

  procesar(): void {
    this.mensaje = "";
    this.total = null;

    if (!this.nombre.trim()) {
      this.mensaje = "Ingresa el nombre.";
      return;
    }

    if (!this.compradores || this.compradores < 1) {
      this.mensaje = "Ingresa una cantidad válida de compradores.";
      return;
    }

    if (!this.boletos || this.boletos < 1) {
      this.mensaje = "Ingresa una cantidad válida de boletos.";
      return;
    }

    const maximoBoletos = this.compradores * 7;

    if (this.boletos > maximoBoletos) {
      this.mensaje = `Máximo permitido: ${maximoBoletos} boleto(s).`;
      return;
    }

    const importe = this.boletos * 12;
    let descuento = 0;

    if (this.boletos > 5) {
      descuento = 0.15;
    } else if (this.boletos >= 3) {
      descuento = 0.1;
    }

    if (this.tarjetaCineco) {
      descuento += 0.1;
    }

    this.total = importe - importe * descuento;
    this.guardarRegistro();
  }

  private guardarRegistro(): void {
    const registros: IRegistroCinepolis[] = JSON.parse(localStorage.getItem("registrosCinepolis") ?? "[]");
    registros.push({ id: crypto.randomUUID(), nombre: this.nombre.trim(), compradores: this.compradores!, boletos: this.boletos!, tarjetaCineco: this.tarjetaCineco, total: this.total!, fecha: new Date().toLocaleString() });
    localStorage.setItem("registrosCinepolis", JSON.stringify(registros));
  }

  verRegistros(): void {
    this.router.navigate(["/escuela/ver-registros"]);
  }
}
