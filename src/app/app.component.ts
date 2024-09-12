import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokedex-angular';

  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  constructor() { }


  scrollToTop() {
    if (this.cardContainer) {
      this.cardContainer.nativeElement.scrollTop = 0;
    }
  }
}
