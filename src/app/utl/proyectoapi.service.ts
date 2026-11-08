import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnosUtl } from './alumnos';
import { MaestroUtl } from './maestros';
import { Observable, map, timeout } from 'rxjs';

interface RespuestaAlumnos {
  alumnos: AlumnosUtl[];
}

interface RespuestaAlumno {
  alumno: AlumnosUtl;
}

interface RespuestaMaestros {
  maestros: MaestroUtl[];
}

interface RespuestaMaestro {
  maestro: MaestroUtl;
}

export interface RespuestaOperacion {
  exito: boolean;
  mensaje: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {
  // Angular redirige /api a Flask mediante proxy.conf.json.
  private readonly apiUrl = '/api/alumnos';
 
  constructor(private http: HttpClient) { }
 
  public getAlumnos(): Observable<AlumnosUtl[]> {
    return this.http.get<RespuestaAlumnos>(this.apiUrl).pipe(
      timeout(10000),
      map((respuesta) => respuesta.alumnos ?? [])
    );
  }
 
  agregarNuevoAlumno(datos: AlumnosUtl): Observable<RespuestaOperacion> {
    return this.http.post<RespuestaOperacion>(this.apiUrl, datos).pipe(timeout(10000));
  }

  getMaestros(): Observable<MaestroUtl[]> {
    return this.http.get<RespuestaMaestros>('/api/maestros').pipe(
      timeout(10000),
      map((respuesta) => respuesta.maestros ?? [])
    );
  }

  agregarMaestro(datos: MaestroUtl): Observable<RespuestaOperacion> {
    return this.http.post<RespuestaOperacion>('/api/maestros', datos).pipe(timeout(10000));
  }

  getMaestro(idMaestro: string): Observable<RespuestaMaestro> {
    return this.http.get<RespuestaMaestro>(`/api/maestros/${idMaestro}`).pipe(timeout(10000));
  }

  eliminaMaestro(idMaestro: string): Observable<RespuestaOperacion> {
    return this.http.delete<RespuestaOperacion>(`/api/maestros/${idMaestro}`).pipe(timeout(10000));
  }
 
  public getAlumno(matricula: string): Observable<RespuestaAlumno> {
    return this.http.get<RespuestaAlumno>(`${this.apiUrl}/${matricula}`).pipe(timeout(10000));
  }
 
  modificarAlumno(matricula: string, datos: AlumnosUtl) {
    return this.http.put(`${this.apiUrl}/${matricula}`, datos);
  }
 
  public eliminaAlumno(matricula: string): Observable<unknown> {
    return this.http.delete<RespuestaOperacion>(`${this.apiUrl}/${matricula}`).pipe(timeout(10000));
  }
 
}
