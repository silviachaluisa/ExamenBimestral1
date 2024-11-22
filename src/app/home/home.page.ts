import { Component, OnInit } from '@angular/core';
import { RobotService } from '../services/robot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: any[] = [];

  constructor(private robotService: RobotService) {}

  ngOnInit() {
    this.robotService.getBooks().subscribe((data: any) => {
      // Agrega un robot a cada libro
      this.items = data.results.map((book: any) => ({
        title: book.title,
        robotImage: this.robotService.getRobotImage(book.title),
      }));
    });
  }
}