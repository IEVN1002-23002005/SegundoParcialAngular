import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "formulario",
    children: [
      {
        path: "usuarios",
        loadComponent: () =>
          import("./formularios/usuario/usuario").then((c) => c.Usuario),
      },
      {
        path: "zodiaco",
        loadComponent: () =>
          import("./formularios/zodiaco/zodiaco").then((c) => c.Zodiaco),
      },
    ],
  },
  // --- BLOQUE CORREGIDO ---
  {
    path: "escuela",
    children: [
      {
        path: "lista-alumnos",
        loadComponent: () =>
          import("./escuela/lista-alumnos/lista-alumnos").then(
            (m) => m.ListaAlumnos
          ),
      },
    ],
  },
  // ------------------------
{
    path: "",
    redirectTo: "escuela/lista-alumnos",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "escuela/lista-alumnos",
  },
];