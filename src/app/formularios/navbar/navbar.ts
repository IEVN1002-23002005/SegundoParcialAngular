import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // Colores actualizados para fondo oscuro
  activo = 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0';
  inactivo = 'block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-white md:p-0';
}