import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from './components/main/main.component';

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

  main = inject(MainComponent);

  constructor() { }


  onScroll(): void {
    const scrollContainer = this.cardContainer.nativeElement;
    const morePokemon = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight;
    if (morePokemon) {
      this.main.loadMorePokemons();
    }
  }


  scrollToTop() {
    if (this.cardContainer) {
      this.cardContainer.nativeElement.scrollTop = 0;
    }
  }
}
