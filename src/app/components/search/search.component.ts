import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppComponent } from '../../app.component';
import { SearchService } from '../../core/services/search.service';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  app = inject(AppComponent);
  card = inject(CardsComponent);
  searchService = inject(SearchService);

  filteredPokemon: any[] = [];


  /**
   * Subscribes to the filteredPokemon$ and search$ observables.
   * This is called once, when the component is initialized.
   */
  ngOnInit() {
    this.subscribeFilter();
    this.subscribeToSearchTerms();
  }


  /**
   * Unsubscribes from all observables to prevent memory leaks
   * when the component is destroyed.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  /**
   * Subscribes to the filteredPokemon$ observable to get the
   * filtered list of Pokemon that match the current search term.
   */
  private subscribeFilter() {
    this.searchService.filteredPokemon$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((pokemonList) => {
      this.filteredPokemon = pokemonList;
    });
  }


  /**
   * Subscribe to the search$ observable to get the current search term.
   * Upon receiving a new search term, filter the list of Pokemon.
   */
  private subscribeToSearchTerms() {
    this.searchService.search$
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchTerm) => this.searchPokemon(searchTerm));
  }


  /**
   * Filters the list of Pokemon based on the provided search term.
   * Only Pokemon whose names contain the search term will be included.
   * If the search term is less than 3 characters, no Pokemon are returned.
   *
   * @param searchTerm - The search term used to filter Pokemon.
   */
  private searchPokemon(searchTerm: string) {
    if (searchTerm.length >= 3) {
      const filtered = this.app.pokemonSaved
        .filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 10);
      this.searchService.setFilteredPokemon(filtered);
    } else {
      this.searchService.setFilteredPokemon([]);
    }
  }


  /**
   * A function that returns the Pokemon's ID, used by the *ngFor directive
   * to keep track of the items in the list.
   * @param pokemon - A Pokemon object.
   * @returns The Pokemon's ID.
   */
  trackByPokemonId(pokemon: any): number {
    return pokemon.id;
  }


  /**
   * Formats a Pokemon's ID to be 3 digits.
   * @param id - The Pokemon's ID.
   * @returns The Pokemon's ID as a 3-digit string.
   */
  formatPokemonId(id: number): string {
    if (id < 10) return `000${id}`;
    if (id < 100) return `00${id}`;
    return id.toString();
  }


  /**
   * Returns the color associated with the given Pokémon type.
   * @param typeName - Name of the Pokémon type.
   * @returns The color associated with the given type.
   */
  getPokemonTypeColor(typeName: string): string {
    return this.app.getPokemonTypeColors(typeName);
  }
}
