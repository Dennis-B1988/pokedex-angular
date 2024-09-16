import { Component, inject, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CardsComponent } from '../cards/cards.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {

  // app = inject(AppComponent);
  // // search = inject(SearchComponent);
  // card = inject(CardsComponent)

  // @Input() filteredPokemon: any[] = [];



  // constructor() { }

  // trackByPokemonId(index: number, pokemon: any) {
  //   return pokemon.id;
  // }
}
