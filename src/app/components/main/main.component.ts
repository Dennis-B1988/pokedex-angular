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


  /**
   * Subscribes to the filteredPokemon$ observable to get the
   * filtered list of Pokemon that match the current search term.
   * This is called once, when the component is initialized.
   */
  ngOnInit(): void {
    this.searchService.filteredPokemon$.subscribe(filtered => {
      this.filteredPokemon = filtered;
    });
  }


  /**
   * Closes the big card and re-enables scrolling on the document body.
   */
  closePokedex(): void {
    this.bigCard.bigCardOpen = false;
    document.body.style.overflow = 'auto';
  }
}
