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

  @Input() filteredPokemon: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnInit() {
    this.searchService.search$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
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
      this.searchService.setFilteredPokemon(filtered);
      // this.cdr.detectChanges();
      console.log('Filtered Pokemon:', filtered);
    } else {
      this.searchService.setFilteredPokemon([]);
      // this.cdr.detectChanges();
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
