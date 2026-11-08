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
      {
        path: "cinepolis",
        loadComponent: () =>
          import("./escuela/cinepolis/cinepolis").then((m) => m.Cinepolis),
      },
      {
        path: "ver-registros",
        loadComponent: () =>
          import("./escuela/ver-registros/ver-registros").then((m) => m.VerRegistros),
      },
    ],
  },
  {
    path: "utl",
    children: [
      {
        path: "alumnos",
        loadComponent: () =>
          import("./utl/alumnos/alumnos").then((m) => m.default),
      },
      {
        path: "agregar",
        loadComponent: () =>
          import("./utl/agregar/agregar").then((m) => m.Agregar),
      },
      {
        path: "maestros",
        loadComponent: () => import("./utl/maestros/maestros").then((m) => m.MaestrosComponent),
      },
      {
        path: "agregar-maestro",
        loadComponent: () => import("./utl/agregar-maestro/agregar-maestro").then((m) => m.AgregarMaestroComponent),
      },
      {
        path: "editar/:matricula",
        loadComponent: () =>
          import("./utl/editar/editar").then((m) => m.Editar),
      },
      {
        path: "eliminar/:matricula",
        loadComponent: () =>
          import("./utl/eliminar/eliminar").then((m) => m.Eliminar),
      },
      {
        path: "eliminar-maestro/:id_maestro",
        loadComponent: () => import("./utl/eliminar/eliminar").then((m) => m.Eliminar),
      },
    ],
  },
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
