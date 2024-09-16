import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SearchService } from '../../core/services/search.service';
import { BigCardComponent } from '../big-card/big-card.component';
import { CardsComponent } from '../cards/cards.component';
import { HeaderComponent } from '../header/header.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CardsComponent, BigCardComponent, SearchComponent, SearchResultComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  // changeDetection: ChangeDetectionStrategy.Default
})
export class MainComponent implements OnInit {

  app = inject(AppComponent);
  searchService = inject(SearchService);
  bigCard = inject(BigCardComponent);
  search = inject(SearchComponent);

  filteredPokemon: any[] = [];
  // filteredPokemon$ = this.searchService.filteredPokemon$;

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.searchService.filteredPokemon$.subscribe(filtered => {
      this.filteredPokemon = filtered;
      console.log('MainComponent - Filtered Pokemon:', this.filteredPokemon);
      this.cdr.detectChanges();
    });
  }

  closePokedex(): void {
    this.bigCard.bigCardOpen = false;
    document.body.style.overflow = 'auto';
    console.log('bigCardOpen: ', this.bigCard.bigCardOpen);
  }
}
