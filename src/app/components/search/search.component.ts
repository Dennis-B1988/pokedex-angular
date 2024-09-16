import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
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

  // @Input() filteredPokemon: any[] = [];
  filteredPokemon: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnInit() {
    // Subscribe to the filteredPokemon$ observable
    this.searchService.filteredPokemon$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((pokemonList) => {
      this.filteredPokemon = pokemonList;  // Update the local array
      this.cdr.detectChanges();  // Manually trigger change detection if necessary
    });

    // Optionally, subscribe to the search term observable to trigger filtering
    this.searchService.search$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((searchTerm) => {
      this.searchPokemon(searchTerm);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchPokemon(searchTerm: string) {
    if (searchTerm.length >= 3) {
      const filtered = this.app.pokemonSaved
        .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 10);
      this.searchService.setFilteredPokemon(filtered);  // Push to the service
      console.log(this.filteredPokemon);
    } else {
      this.searchService.setFilteredPokemon([]);  // Clear the filtered list
      console.log(this.filteredPokemon);
    }
  }

  trackByPokemonId(index: number, pokemon: any): number {
    return pokemon.id; // Or pokemon.id to track by ID
  }

  formatPokemonId(id: number): string {
    if (id < 10) return `000${id}`;
    if (id < 100) return `00${id}`;
    return id.toString();
  }


  // searchPokemon() {
  //   this.filteredPokemon = [];

  //   if (this.search.length >= 3) {
  //     let maximumDisplay = 0;
  //     this.app.pokemonSaved.forEach((pokemon) => {
  //       if (pokemon.name.toLowerCase().includes(this.search.toLowerCase())) {
  //         if (maximumDisplay < 10) {
  //           this.filteredPokemon.push(pokemon);
  //           maximumDisplay++;
  //           console.log(this.filteredPokemon);
  //         }
  //       }
  //     })
  //   }
  // }
}
