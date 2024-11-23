import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  // Base URL para RoboHash
  API = 'https://robohash.org/';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la imagen de un robot basado en una cadena única.
   * @param cadena Una cadena única para generar un robot (puede ser un nombre, ID, etc.)
   * @returns Un observable con la URL de la imagen del robot.
   */
  getRobot(cadena: string): Observable<Blob> {
    return this.http.get(`${this.API}${cadena}`, { responseType: 'blob' });
  }

  /**
   * Genera un robot aleatorio usando una cadena generada automáticamente.
   * @returns Un observable con la URL de la imagen del robot aleatorio.
   */
  getRandomRobot(): Observable<Blob> {
    const randomString = Math.random().toString(36).substring(2, 15);
    return this.getRobot(randomString);
  }
}
