import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { StorageService } from '../services/storage.service';
import { RobotService } from '../services/robot.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  elementos: any[] = [];
  isLoading = false;
  colors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF', '#33FFF2']; // Paleta de colores

  constructor(
    private bookService: BookService,
    private robotService: RobotService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getElements();
  }

  // Método para obtener los libros
  async getBooks(): Promise<any[]> {
    const response = await lastValueFrom(this.bookService.listBooks(10));
    return response.results || [];
  }

  // Método para obtener una imagen aleatoria de un robot
  async getRandomRobot(): Promise<string> {
    const response = await lastValueFrom(this.robotService.getRandomRobot());
    return URL.createObjectURL(response); // Convertir Blob a URL para usar como src en imágenes
  }

  // Unificar la respuesta en la lista de elementos
  async getElements() {
    this.isLoading = true;
    try {
      // Obtener libros
      const libros = await this.getBooks();

      // Crear elementos iniciales sin imágenes
      this.elementos = libros.map((libro: any) => ({
        title: libro.title,
        image: '',
      }));

      // Obtener imágenes de robots en paralelo
      const robotImages = await Promise.all(
        this.elementos.map(() => this.getRandomRobot())
      );

      // Asignar imágenes a los elementos
      this.elementos.forEach((elemento, index) => {
        elemento.image = robotImages[index];
      });

      console.log(this.elementos);
    } catch (error) {
      console.error('Error al obtener elementos:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Guardar en Firebase el elemento
  async saveElement(element: any) {
    try {
      const resultado = await this.storageService.addNote({
        title: element.title,
        text: element.image,
      });
      console.log('Elemento guardado:', resultado);
    } catch (error) {
      console.error('Error al guardar elemento:', error);
    }
  }
}
