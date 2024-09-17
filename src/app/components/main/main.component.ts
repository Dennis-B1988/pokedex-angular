import { Component, inject, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SearchService } from '../../core/services/search.service';
import { BigCardComponent } from '../big-card/big-card.component';
import { CardsComponent } from '../cards/cards.component';
import { HeaderComponent } from '../header/header.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CardsComponent, BigCardComponent, SearchComponent, LoadingSpinnerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {

  app = inject(AppComponent);
  searchService = inject(SearchService);
  bigCard = inject(BigCardComponent);
  search = inject(SearchComponent);

  filteredPokemon: any[] = [];

  constructor() { }


  ngOnInit(): void {
    this.searchService.filteredPokemon$.subscribe(filtered => {
      this.filteredPokemon = filtered;
      console.log('MainComponent - Filtered Pokemon:', this.filteredPokemon);
    });
  }


  closePokedex(): void {
    this.bigCard.bigCardOpen = false;
    document.body.style.overflow = 'auto';
    console.log('bigCardOpen: ', this.bigCard.bigCardOpen);
  }
}
