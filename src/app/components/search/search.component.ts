import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppComponent } from '../../app.component';
import { SearchService } from '../../core/services/search.service';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  app = inject(AppComponent);
  card = inject(CardsComponent);
  searchService = inject(SearchService);

  filteredPokemon: any[] = [];

  private destroy$ = new Subject<void>();

  constructor() { }


  ngOnInit() {
    this.subscribeFilter();
    this.subscribeSearch();
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  subscribeFilter() {
    this.searchService.filteredPokemon$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((pokemonList) => {
      this.filteredPokemon = pokemonList;
    });
  }


  subscribeSearch() {
    this.searchService.search$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((searchTerm) => {
      this.searchPokemon(searchTerm);
    });
  }


  searchPokemon(searchTerm: string) {
    if (searchTerm.length >= 3) {
      const filtered = this.app.pokemonSaved
        .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 10);
      this.searchService.setFilteredPokemon(filtered);
      console.log(this.filteredPokemon);
    } else {
      this.searchService.setFilteredPokemon([]);
      console.log(this.filteredPokemon);
    }
  }


  trackByPokemonId(pokemon: any): number {
    return pokemon.id;
  }


  formatPokemonId(id: number): string {
    if (id < 10) return `000${id}`;
    if (id < 100) return `00${id}`;
    return id.toString();
  }
}
