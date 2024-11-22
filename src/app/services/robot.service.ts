import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RobotService {
  constructor(private http: HttpClient) {}

  // Obtiene datos de libros
  getBooks(): Observable<any> {
    return this.http.get('https://gutendex.com/books?ids=1,2,3,4,5,6,7,8,9,10').pipe(
      tap(data => console.log('Libros: ', data))
    );
  }
  
  // Genera URL de imagen de robot
  getRobotImage(name: string): string {
    return `https://robohash.org/${name}`;
  }
}